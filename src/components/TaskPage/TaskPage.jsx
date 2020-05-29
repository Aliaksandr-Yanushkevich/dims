import React from 'react';
import PropTypes from 'prop-types';
import ReactDom from 'react-dom';
import dateToStringForInput from '../../helpers/dateToStringForInput';
import Button from '../Button/Button';
import styles from './TaskPage.module.scss';
import FormField from '../FormField/FormField';
import MemberList from './MemberList';
import firebaseTrueApi from '../../api/firebaseTrueApi';
import generateID from '../../helpers/generateID';

class TaskPage extends React.Component {
  constructor() {
    super();
    this.state = {
      members: null,
      name: '',
      description: '',
      startDate: '',
      deadlineDate: '',
      userTasks: [],
    };
    this.root = document.createElement('div');
    document.body.appendChild(this.root);
  }

  componentDidMount() {
    const { taskId } = this.props;
    if (taskId && taskId !== 'newTask') {
      this.setState({ taskId });
      firebaseTrueApi
        .getTask(taskId)
        .then((task) => {
          const { name, description, startDate, deadlineDate } = task.data();
          this.setState({
            name,
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
    firebaseTrueApi
      .getNames()
      .then((members) => this.setState({ members }))
      .catch((error) => {
        console.error(`Error receiving data: ${error}`);
      });
  }

  componentWillUnmount() {
    document.body.removeChild(this.root);
  }

  onChange = (e) => {
    const { id, value } = e.currentTarget;
    this.setState({ [id]: value });
  };

  createTask = () => {
    const { name, description, startDate, deadlineDate, userTasks, taskId } = this.state;
    const preparedstartDate = new Date(startDate);
    const preparedDeadlineDate = new Date(deadlineDate);
    const taskInfo = {
      taskId,
      name,
      description,
      startDate: preparedstartDate,
      deadlineDate: preparedDeadlineDate,
    };
    firebaseTrueApi.createTask(taskInfo).then(() => {
      userTasks.forEach((task) => {
        firebaseTrueApi.assignTask(task);
        firebaseTrueApi.setTaskState(task.stateId);
      });
    });
  };

  asignTask = (userId, checked) => {
    const { userTasks, taskId } = this.state;
    const stateId = generateID();
    const userTaskId = generateID();
    let memberTasks = userTasks;
    if (checked) {
      memberTasks = [...memberTasks, { userId, taskId, stateId, userTaskId }];
    } else {
      memberTasks = memberTasks.filter((member) => member.userId !== userId);
    }
    this.setState({ userTasks: memberTasks });
  };

  render() {
    const { name, description, startDate, deadlineDate, members } = this.state;
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
          {members && <MemberList members={members} asignTask={this.asignTask} />}
          <div className={styles.buttonWrapper}>
            <Button className={styles.successButton} onClick={this.createTask}>
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
};

export default TaskPage;
