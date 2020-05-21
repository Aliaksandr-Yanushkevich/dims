import React from 'react';
import PropTypes from 'prop-types';
import firebaseApi from '../../api/firebaseApi';
import dateToStringForInput from '../common/dateToStringForInput';
import Button from '../Button/Button';
import styles from './TaskPage.module.scss';
import FormField from '../FormField/FormField';
import MemberList from './MemberList';

class TaskPage extends React.Component {
  state = {
    names: null,
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
        .catch((error) => console.error(`Error receiving data: ${error}`));
    }
    firebaseApi
      .getNames()
      .then((names) => this.setState({ names }))
      .catch((error) => console.error(`Error receiving data: ${error}`));
  }

  onChange = (e) => {
    const { id, value } = e.currentTarget;
    switch (id) {
      case 'taskName':
        this.setState({ taskName: value });
        break;
      case 'description':
        this.setState({ description: value });
        break;
      case 'startDate':
        this.setState({ startDate: value });
        break;
      case 'deadLineDate':
        this.setState({ deadLineDate: value });
        break;
      default:
        break;
    }
  };

  validateForm = (id, message) => {
    switch (id) {
      case 'taskName':
        this.setState({ taskNameIsValid: !message });
        break;
      case 'description':
        this.setState({ descriptionIsValid: !message });
        break;
      case 'startDate':
        this.setState({ startDateIsValid: !message });
        break;
      case 'deadLineDate':
        this.setState({ deadLineDateIsValid: !message });
        break;
      default:
        break;
    }
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
    const { names } = this.state;
    const { taskId, show } = this.props;

    const backToGrid = () => {
      show('taskPage');
    };

    return (
      <div className={styles.wrapper}>
        <form action=''>
          {taskId === 'newTask' ? (
            <h1 className={styles.title}>New task</h1>
          ) : (
            <h1 className={styles.title}>{`Task - ${taskName}`}</h1>
          )}
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
          {names ? <MemberList names={names} /> : null}
          <div className={styles.buttonWrapper}>
            {taskId !== 'newTask' ? (
              <Button
                className={styles.successButton}
                onClick={() => console.log('task updated/sent!')}
                disabled={!(taskNameIsValid && descriptionIsValid && startDateIsValid && deadLineDateIsValid)}
              >
                Save
              </Button>
            ) : (
              <Button
                className={styles.successButton}
                onClick={() => console.log('task created!')}
                disabled={!(taskNameIsValid && descriptionIsValid && startDateIsValid && deadLineDateIsValid)}
              >
                Create
              </Button>
            )}
            <Button onClick={backToGrid}>Back to grid</Button>
          </div>
        </form>
      </div>
    );
  }
}

TaskPage.propTypes = {
  userId: PropTypes.string.isRequired,
  taskId: PropTypes.string.isRequired,
  show: PropTypes.func.isRequired,
};

TaskPage.defaultProps = {};

export default TaskPage;
