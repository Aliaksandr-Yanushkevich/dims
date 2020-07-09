import React from 'react';
import PropTypes from 'prop-types';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from '../common/Button/Button';
import dateToStringForInput from '../../helpers/dateToStringForInput';
import styles from './TaskPage.module.scss';
import MemberList from './MemberList';
import firebaseApi from '../../api/firebaseApi';
import generateID from '../../helpers/generateID';
import taskPageFields from './taskPageFields';
import SubmitButton from '../common/SubmitButton/SubmitButton';
import showToast from '../../helpers/showToast';

class TaskPage extends React.Component {
  state = {
    members: null,
    taskName: '',
    description: '',
    startDate: dateToStringForInput(new Date()),
    deadlineDate: dateToStringForInput(new Date(Date.now() + 604800000)), // number is the number of milliseconds in a week
    usersWithTaskFromDB: null,
    usersWithTaskLocal: null,
    userTasks: [],
  };

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

  createTask = (event, errors, values) => {
    if (!errors.length) {
      const { userTasks, taskId, usersWithTaskFromDB, usersWithTaskLocal } = this.state;
      const { taskName, description, startDate, deadlineDate } = values;

      const taskInfo = {
        taskId,
        name: taskName.trim(),
        description: description.trim(),
        startDate: new Date(startDate),
        deadlineDate: new Date(deadlineDate),
      };

      firebaseApi
        .assignTaskToUsers(usersWithTaskFromDB, usersWithTaskLocal, taskId, userTasks, taskInfo)
        .then((result) => {
          showToast(result);
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
    const { members, usersWithTaskLocal } = this.state;
    const { taskId, hideMemberPage } = this.props;

    const formFields = taskPageFields.map(
      ({ id, name, type, label, placeholder, regexp, errorMessage, cols, rows }) => {
        if (type === 'date') {
          return (
            <AvField
              key={id}
              id={id}
              name={name}
              label={label}
              type={type}
              onChange={this.onChange}
              value={this.state[name]}
              required
            />
          );
        }

        return (
          <AvField
            key={id}
            id={id}
            value={this.state[name]}
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
      },
    );

    return (
      <>
        <ToastContainer />
        <div className={styles.wrapper}>
          <h1 className={styles.title}>{taskId === 'newTask' ? 'New task' : `Edit task`}</h1>
          <div className={styles.left}>
            <AvForm id='createTask' onSubmit={this.createTask}>
              {formFields}
            </AvForm>
          </div>

          <div className={styles.right}>
            {members && (
              <MemberList members={members} asignTask={this.asignTask} usersWithTaskLocal={usersWithTaskLocal} />
            )}
            <div className={styles.buttonWrapper}>
              <SubmitButton className={styles.successButton} form='createTask'>
                {taskId === 'newTask' ? 'Create' : 'Save'}
              </SubmitButton>
              <Button className={styles.defaultButton} onClick={hideMemberPage}>
                Back to grid
              </Button>
            </div>
          </div>
        </div>
      </>
    );
  }
}

TaskPage.propTypes = {
  taskId: PropTypes.string.isRequired,
  hideMemberPage: PropTypes.func.isRequired,
};

export default TaskPage;
