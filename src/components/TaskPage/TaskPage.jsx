import React from 'react';
import PropTypes from 'prop-types';
import ReactDom from 'react-dom';
import dateToStringForInput from '../../helpers/dateToStringForInput';
import Button from '../Button/Button';
import styles from './TaskPage.module.scss';
import MemberList from './MemberList';
import firebaseApi from '../../api/firebaseApi';
import generateID from '../../helpers/generateID';
import taskPagaFields from './taskPageFields';
import TextAreaField from '../common/TextAreaField/TextAreaField';
import DateField from '../common/DateField/DateField';
import validateTaskPageForm from '../../helpers/validators/validateTaskPageForm';
import FormMessage from '../common/FormMessage/FormMessage';

class TaskPage extends React.Component {
  constructor() {
    super();
    const defaultDeadline = new Date(Date.now() + 604800000); // number is the number of milliseconds in a week
    this.state = {
      members: null,
      taskName: '',
      description: '',
      startDate: dateToStringForInput(new Date()),
      deadlineDate: dateToStringForInput(defaultDeadline),
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
      firebaseApi.getTask(taskId).then((task) => {
        const { name } = task;
        this.setState({ ...task, taskName: name });
      });
    } else {
      this.setState({ taskId: generateID() });
    }

    firebaseApi.getNames().then((members) => {
      this.setState({ members });
    });

    firebaseApi.getUsersWithTask(taskId).then((usersWithTaskFromDB) => {
      this.setState({ usersWithTaskFromDB, usersWithTaskLocal: usersWithTaskFromDB });
    });
  }

  componentWillUnmount() {
    document.body.removeChild(this.root);
  }

  onChange = (e) => {
    const { name, value } = e.currentTarget;
    this.setState({ [name]: value, message: '' });
  };

  createTask = () => {
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

    const isValid = validateTaskPageForm(taskName, description, startDate, deadlineDate);

    if (isValid.formIsValid) {
      const taskInfo = {
        taskId,
        name: taskName.trim(),
        description: description.trim(),
        startDate: new Date(startDate),
        deadlineDate: new Date(deadlineDate),
      };
      firebaseApi
        .assignTaskToUsers(usersWithTaskFromDB, usersWithTaskLocal, taskId, userTasks, taskInfo)
        .then(({ message, messageType }) => {
          this.setState({ message, messageType });
        });
    } else {
      const { message, messageType } = isValid;
      this.setState({ message, messageType });
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
    const { members, usersWithTaskLocal, message, messageType } = this.state;
    const { taskId, hideMemberPage } = this.props;
    const fields = taskPagaFields.map((field) => {
      const { id, name, type, label, placeholder, regexp, errorMessage, cols, rows } = field;
      if (type === 'date') {
        return (
          <DateField key={id} id={id} name={name} label={label} value={this.state[name]} onChange={this.onChange} />
        );
      }
      if (type === 'textarea') {
        return (
          <TextAreaField
            id={id}
            name={name}
            label={label}
            value={this.state[name]}
            regexp={regexp}
            errorMessage={errorMessage}
            onChange={this.onChange}
            cols={cols}
            rows={rows}
            placeholder={placeholder}
          />
        );
      }
      return null;
    });

    return ReactDom.createPortal(
      <div className={styles.wrapper}>
        <form>
          <h1 className={styles.title}>{taskId === 'newTask' ? 'New task' : `Edit task`}</h1>
          {fields}
          {members && (
            <MemberList members={members} asignTask={this.asignTask} usersWithTaskLocal={usersWithTaskLocal} />
          )}
        </form>

        <FormMessage messageType={messageType}>{message}</FormMessage>

        <div className={styles.buttonWrapper}>
          <Button className={styles.successButton} onClick={this.createTask}>
            {taskId === 'newTask' ? 'Create' : 'Save'}
          </Button>
          <Button onClick={hideMemberPage}>Back to grid</Button>
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
