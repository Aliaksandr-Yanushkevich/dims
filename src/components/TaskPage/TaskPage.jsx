import React from 'react';
import { NavLink } from 'react-router-dom';
import firebaseApi from '../../api/firebaseApi';
import dateToStringForInput from '../common/dateToStringForInput';
import MemberName from './MemberName';
import Button from '../Button/Button';
import styles from './TaskPage.module.scss';
import FormField from '../../utils/validators/FormField';

class TaskPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
  }

  componentDidMount() {
    const { userId, taskId } = this.props;
    if (userId && taskId !== 'newTask') {
      console.log(this.props);
      firebaseApi.getUserTasks(userId).then((result) => {
        const { taskName, description, startDate, deadLineDate } = result.tasks[taskId];
        const startDateConverted = dateToStringForInput(startDate.toDate());
        const deadLineDateConverted = dateToStringForInput(deadLineDate.toDate());
        this.setState({
          taskName,
          description,
          startDate: startDateConverted,
          deadLineDate: deadLineDateConverted,
        });
      });
    }
    firebaseApi.getNames().then((names) => this.setState({ names }));
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
    const valid = message ? false : true;
    switch (id) {
      case 'taskName':
        this.setState({ taskNameIsValid: valid });
        break;
      case 'description':
        this.setState({ descriptionIsValid: valid });
        break;
      case 'startDate':
        this.setState({ startDateIsValid: valid });
        break;
      case 'deadLineDate':
        this.setState({ deadLineDateIsValid: valid });
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
    const { taskId, showTask } = this.props;
    const memberNames = names
      ? names.map((name) => {
          return <MemberName firstName={name.firstName} lastName={name.lastName} userId={name.userId} />;
        })
      : null;
    return (
      <div className={styles.wrapper}>
        <form action=''>
          {taskId === 'newTask' ? <h1>New task</h1> : <h1>Task - {taskName}</h1>}
          <FormField
            id='taskName'
            required
            inputType='text'
            label='Task name:'
            onChange={this.onChange}
            value={taskName}
            placeholder='Task name'
            validateForm={this.validateForm}
            maxLength={140}
          />
          <FormField
            id='description'
            name='description'
            required
            inputType='textarea'
            label='Description:'
            onChange={this.onChange}
            value={description}
            placeholder='Task description'
            validateForm={this.validateForm}
          />
          <FormField
            id='startDate'
            required
            inputType='date'
            label='Start:'
            onChange={this.onChange}
            value={startDate}
            validateForm={this.validateForm}
          />
          <FormField
            id='deadLineDate'
            required
            inputType='date'
            label='Deadline:'
            onChange={this.onChange}
            value={deadLineDate}
            validateForm={this.validateForm}
          />
          <div className={styles.members}>
            <div className={styles.membersTitle}>Members</div>
            <div className={styles.membersItems}>
              <ul>{memberNames}</ul>
            </div>
          </div>
          <div className={styles.buttonWrapper}>
            {taskId !== 'newTask' ? (
              <Button
                className={styles.successButton}
                buttonText='Save'
                onClick={() => console.log('task updated/sent!')}
                disabled={!(taskNameIsValid && descriptionIsValid && startDateIsValid && deadLineDateIsValid)}
              />
            ) : (
              <Button
                className={styles.successButton}
                buttonText='Create'
                onClick={() => console.log('task created!')}
                disabled={!(taskNameIsValid && descriptionIsValid && startDateIsValid && deadLineDateIsValid)}
              />
            )}
            <Button buttonText='Back to grid' onClick={() => showTask(false)} />
          </div>
        </form>
      </div>
    );
  }
}

export default TaskPage;
