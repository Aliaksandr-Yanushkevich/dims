import React from 'react';
import PropTypes from 'prop-types';
import ReactDom from 'react-dom';
import firebaseApi from '../../api/firebaseApi';
import dateToStringForInput from '../common/dateToStringForInput';
import Button from '../Button/Button';
import styles from './TaskPage.module.scss';
import FormField from '../FormField/FormField';
import MemberList from './MemberList';

class TaskPage extends React.Component {
  constructor() {
    super();
    this.root = document.createElement('div');
    document.body.appendChild(this.root);
  }

  state = {
    members: null,
    taskName: '',
    description: '',
    startDate: '',
    deadLineDate: '',
    taskNameIsValid: false,
    descriptionIsValid: false,
    startDateIsValid: false,
    deadLineDateIsValid: false,
  };

  componentDidMount() {
    const { userId, taskId } = this.props;
    if (userId && taskId !== 'newTask') {
      firebaseApi
        .getUserTasks(userId)
        .then((result) => {
          const { taskName, description, startDate, deadLineDate } = result.tasks[taskId];
          const startDateConverted = dateToStringForInput(startDate.toDate());
          const deadLineDateConverted = dateToStringForInput(deadLineDate.toDate());
          this.setState({
            taskName,
            description,
            startDate: startDateConverted,
            deadLineDate: deadLineDateConverted,
          });
        })
        .catch((error) => {
          console.error(`Error receiving data: ${error}`);
        });
    }
    firebaseApi
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

  validateForm = (id, message) => {
    this.setState({ [`${id}IsValid`]: !message });
  };

  updateTask = () => {
    console.log('task is updated!');
  };

  createTask = () => {
    console.log('task is created!');
  };

  render() {
    const {
      deadLineDate,
      description,
      startDate,
      taskName,
      taskNameIsValid,
      descriptionIsValid,
      startDateIsValid,
      deadLineDateIsValid,
    } = this.state;
    const { members } = this.state;
    const { taskId, hideMemberPage } = this.props;

    return ReactDom.createPortal(
      <div className={styles.wrapper}>
        <form action=''>
          <h1 className={styles.title}>{taskId === 'newTask' ? 'New task' : `Task - ${taskName}`}</h1>
          <FormField
            id='taskName'
            label='Task name:'
            onChange={this.onChange}
            value={taskName}
            placeholder='Task name'
            validateForm={this.validateForm}
          />
          <FormField
            id='description'
            name='description'
            inputType='textarea'
            label='Description:'
            onChange={this.onChange}
            value={description}
            placeholder='Task description'
            validateForm={this.validateForm}
          />
          <FormField
            id='startDate'
            inputType='date'
            label='Start:'
            onChange={this.onChange}
            value={startDate}
            validateForm={this.validateForm}
          />
          <FormField
            id='deadLineDate'
            inputType='date'
            label='Deadline:'
            onChange={this.onChange}
            value={deadLineDate}
            validateForm={this.validateForm}
          />
          {members && <MemberList members={members} />}
          <div className={styles.buttonWrapper}>
            <Button
              className={styles.successButton}
              onClick={taskId === 'newTask' ? this.createTask : this.updateTask}
              disabled={!(taskNameIsValid && descriptionIsValid && startDateIsValid && deadLineDateIsValid)}
            >
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
  userId: PropTypes.string.isRequired,
  taskId: PropTypes.string.isRequired,
};

TaskPage.defaultProps = {};

export default TaskPage;
