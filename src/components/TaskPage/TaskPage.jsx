import React from 'react';
import PropTypes from 'prop-types';
import ReactDom from 'react-dom';
import { Button } from 'reactstrap';
import AvForm from 'availity-reactstrap-validation/lib/AvForm';
import AvField from 'availity-reactstrap-validation/lib/AvField';
import dateToStringForInput from '../../helpers/dateToStringForInput';
import styles from './TaskPage.module.scss';
import MemberList from './MemberList';
import firebaseApi from '../../api/firebaseApi';
import generateID from '../../helpers/generateID';
import { titleMaxLength140, textMaxLength1000 } from '../../constants';

class TaskPage extends React.Component {
  constructor() {
    super();
    this.state = {
      members: null,
      taskName: '',
      description: '',
      startDate: dateToStringForInput(new Date()),
      deadlineDate: '',
      usersWithTaskFromDB: null,
      usersWithTaskLocal: null,
      userTasks: [],
    };
    this.root = document.createElement('div');
    document.body.appendChild(this.root);
  }

  componentDidMount() {
    const { taskId } = this.props;

    if (taskId && taskId !== 'newTask') {
      this.setState({ taskId });
      firebaseApi
        .getTask(taskId)
        .then((task) => {
          const { name, description, startDate, deadlineDate } = task.data();
          this.setState({
            taskName: name,
            description,
            startDate: dateToStringForInput(startDate.toDate()),
            deadlineDate: dateToStringForInput(deadlineDate.toDate()),
          });
        })
        .catch((error) => {
          console.error(`Error receiving data: ${error}`);
        });
    } else {
      this.setState({ taskId: generateID() });
    }

    firebaseApi
      .getNames()
      .then((members) => this.setState({ members }))
      .catch((error) => {
        console.error(`Error receiving data: ${error}`);
      });

    firebaseApi
      .getUsersWithTask(taskId)
      .then((usersWithTaskFromDB) => this.setState({ usersWithTaskFromDB, usersWithTaskLocal: usersWithTaskFromDB }));
  }

  componentWillUnmount() {
    document.body.removeChild(this.root);
  }

  onChange = (e) => {
    const { id, value } = e.currentTarget;
    this.setState({ [id]: value });
  };

  createTask = (event, errors) => {
    if (!errors.length) {
      const {
        taskName,
        description,
        startDate,
        deadlineDate,
        userTasks,
        taskId,
        usersWithTaskFromDB,
        usersWithTaskLocal,
      } = this.state;
      const preparedstartDate = new Date(startDate);
      const preparedDeadlineDate = new Date(deadlineDate);
      const taskInfo = {
        taskId,
        name: taskName.trim(),
        description: description.trim(),
        startDate: preparedstartDate,
        deadlineDate: preparedDeadlineDate,
      };
      firebaseApi.removeTaskFromUsers(usersWithTaskFromDB, usersWithTaskLocal, taskId).then(() => {
        firebaseApi
          .createTask(taskInfo)
          .then(() => {
            userTasks.forEach((task) => {
              firebaseApi.assignTask(task);
              firebaseApi.setTaskState(task.stateId);
            });
          })
          .catch((error) => {
            console.error('Error with assigning task', error);
          });
      });
    }
  };

  asignTask = (userId, checked) => {
    const { userTasks, taskId, usersWithTaskFromDB, usersWithTaskLocal } = this.state;
    const stateId = generateID();
    const userTaskId = generateID();
    let memberTasks = userTasks;
    if (checked) {
      if (!usersWithTaskFromDB.includes(userId)) {
        memberTasks = [...memberTasks, { userId, taskId, stateId, userTaskId }];
      }
      this.setState(() => ({ usersWithTaskLocal: [...usersWithTaskLocal, userId] }));
    } else {
      memberTasks = memberTasks.filter((member) => member.userId !== userId);
      this.setState(() => ({ usersWithTaskLocal: [...usersWithTaskLocal.filter((memberId) => memberId !== userId)] }));
    }
    this.setState({ userTasks: memberTasks });
  };

  render() {
    const { taskName, description, startDate, deadlineDate, members, usersWithTaskLocal } = this.state;
    const { taskId, hideMemberPage } = this.props;

    const fields = [
      {
        id: 'name',
        value: taskName,
        name: 'taskName',
        type: 'textarea',
        label: 'Task name:',
        placeholder: 'Task name',
        regexp: titleMaxLength140,
        errorMessage: 'Task name must be shorter than 140 characters',
        cols: 30,
        rows: 2,
      },
      {
        id: 'description',
        value: description,
        name: 'description',
        type: 'textarea',
        label: 'Description:',
        placeholder: 'Task description',
        regexp: textMaxLength1000,
        errorMessage: 'Task description must be shorter than 1000 characters',
        cols: 30,
        rows: 5,
      },
      { id: 'startDate', value: startDate, name: 'startDate', type: 'date', label: 'Start:' },
      { id: 'deadlineDate', value: deadlineDate, name: 'deadlineDate', type: 'date', label: 'Deadline:' },
    ];

    const formFields = fields.map(({ id, value, name, type, label, placeholder, regexp, errorMessage, cols, rows }) => {
      if (type === 'date') {
        return (
          <AvField
            key={id}
            id={id}
            name={name}
            label={label}
            type={type}
            onChange={this.onChange}
            value={value}
            required
          />
        );
      }

      return (
        <AvField
          key={id}
          id={id}
          value={value}
          name={name}
          type={type}
          label={label}
          placeholder={placeholder}
          onChange={this.onChange}
          cols={cols}
          rows={rows}
          validate={{
            required: { value: true, errorMessage: 'Field is required' },
            pattern: {
              value: `${regexp}`,
              errorMessage,
            },
          }}
        />
      );
    });

    return ReactDom.createPortal(
      <div className={styles.wrapper}>
        <h1 className={styles.title}>{taskId === 'newTask' ? 'New task' : `Edit task`}</h1>
        <div className={styles.left}>
          <AvForm id='form'>{formFields}</AvForm>
        </div>

        <div className={styles.right}>
          {members && (
            <MemberList members={members} asignTask={this.asignTask} usersWithTaskLocal={usersWithTaskLocal} />
          )}
          <div className={styles.buttonWrapper}>
            <Button className={styles.successButton} form='form'>
              {taskId === 'newTask' ? 'Create' : 'Save'}
            </Button>
            <Button className={styles.defaultButton} onClick={hideMemberPage}>
              Back to grid
            </Button>
          </div>
        </div>
      </div>,
      this.root,
    );
  }
}

TaskPage.propTypes = {
  taskId: PropTypes.string.isRequired,
  hideMemberPage: PropTypes.func.isRequired,
};

export default TaskPage;
