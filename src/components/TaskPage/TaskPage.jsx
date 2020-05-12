import React from 'react';
import { NavLink } from 'react-router-dom';
import firebaseApi from '../../api/firebaseApi';
import dateToStringForInput from '../common/dateToStringForInput';
import MemberName from './MemberName';
import Button from '../Button/Button';
import styles from './TaskPage.module.scss';

class TasksPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      names: null,
      taskName: null,
      description: null,
      startDate: null,
      deadLineDate: null,
    };
  }

  componentDidMount() {
    const { userId, taskId } = this.props;
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

  render() {
    const { deadLineDate, description, startDate, taskName } = this.state;
    const { names } = this.state;
    const { taskId } = this.props;
    const memberNames = names
      ? names.map((name) => {
          return <MemberName firstName={name.firstName} lastName={name.lastName} userId={name.userId} />;
        })
      : null;
    return (
      <div className={styles.wrapper}>
        <h1>Task - {taskName}</h1>
        <label htmlFor='description'>Description </label>
        {/* <input id='taskName' type='text' value={taskName} onChange={this.onChange} /> */}

        <textarea
          name='description'
          id='description'
          cols='30'
          rows='10'
          value={description}
          onChange={this.onChange}
        />
        <div className={styles.dateItem}>
          <label htmlFor='startDate'>Start</label>
          <input id='startDate' type='date' required onChange={this.onChange} value={startDate} />
        </div>
        <div className={styles.dateItem}>
          <label htmlFor='deadLineDate'>Deadline</label>
          <input id='deadLineDate' type='date' required onChange={this.onChange} value={deadLineDate} />
        </div>
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
            />
          ) : (
            <Button className={styles.successButton} buttonText='Create' onClick={() => console.log('task created!')} />
          )}

          <NavLink to='/members'>
            <Button buttonText='Back to grid' />
          </NavLink>
        </div>
      </div>
    );
  }
}

export default TasksPage;
