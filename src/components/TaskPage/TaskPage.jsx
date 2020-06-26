import React from 'react';
import PropTypes from 'prop-types';
import ReactDom from 'react-dom';
import dateToStringForInput from '../../helpers/dateToStringForInput';
import Button from '../Button/Button';
import styles from './TaskPage.module.scss';
import FormField from '../FormField/FormField';
import MemberList from './MemberList';
import firebaseApi from '../../api/firebaseApi';
import generateID from '../../helpers/generateID';

class TaskPage extends React.Component {
  constructor() {
    super();
    this.state = {
      members: null,
      name: '',
      description: '',
      startDate: dateToStringForInput(new Date()),
      deadlineDate: '',
      usersWithTaskFromDB: null,
      usersWithTaskLocal: null,
      userTasks: [],
      formIsValid: false,
    };
    this.root = document.createElement('div');
    document.body.appendChild(this.root);
  }

  componentDidMount() {
    const { taskId } = this.props;
    this.validateForm();

    if (taskId && taskId !== 'newTask') {
      this.setState({ taskId });
      firebaseApi.getTask(taskId).then((task) => {
        this.setState({ ...task });
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
    const { id, value } = e.currentTarget;
    this.setState({ [id]: value });
    this.validateForm();
  };

  validateForm = () => {
    const { name, description, deadlineDate } = this.state;
    // magic numbers here are minimal/maximum length for input fields
    if (
      name.length &&
      name.length <= 140 &&
      description.length >= 1 &&
      description.length <= 2000 &&
      deadlineDate.length
    ) {
      this.setState({ formIsValid: true });
    } else {
      this.setState({ formIsValid: false });
    }
  };

  createTask = () => {
    const {
      name,
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
      name: name.trim(),
      description: description.trim(),
      startDate: preparedstartDate,
      deadlineDate: preparedDeadlineDate,
    };
    firebaseApi.assignTaskToUsers(usersWithTaskFromDB, usersWithTaskLocal, taskId, userTasks, taskInfo);
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
    const { name, description, startDate, deadlineDate, members, formIsValid, usersWithTaskLocal } = this.state;
    const { taskId, hideMemberPage } = this.props;

    return ReactDom.createPortal(
      <div className={styles.wrapper}>
        <form action=''>
          <h1 className={styles.title}>{taskId === 'newTask' ? 'New task' : `Edit task`}</h1>
          <FormField
            id='name'
            name='taskName'
            inputType='textarea'
            label='Task name:'
            onChange={this.onChange}
            value={name}
            placeholder='Task name'
            cols={30}
            rows={2}
          />
          <FormField
            id='description'
            name='description'
            inputType='textarea'
            label='Description:'
            maxLength={2000}
            onChange={this.onChange}
            value={description}
            placeholder='Task description'
          />
          <FormField id='startDate' inputType='date' label='Start:' onChange={this.onChange} value={startDate} />
          <FormField
            id='deadlineDate'
            inputType='date'
            label='Deadline:'
            onChange={this.onChange}
            value={deadlineDate}
          />
          {members && (
            <MemberList members={members} asignTask={this.asignTask} usersWithTaskLocal={usersWithTaskLocal} />
          )}
          <div className={styles.buttonWrapper}>
            <Button disabled={!formIsValid} className={styles.successButton} onClick={this.createTask}>
              {taskId === 'newTask' ? 'Create' : 'Save'}
            </Button>
            <Button onClick={hideMemberPage}>Back to grid</Button>
          </div>
        </form>
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
