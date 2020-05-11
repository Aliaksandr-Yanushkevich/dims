import React from 'react';
import { NavLink } from 'react-router-dom';
import firebaseApi from '../../api/firebaseApi';
import dateToStringForInput from '../common/dateToStringForInput';
import MemberName from './MemberName';
import Button from '../Button/Button';
// import { membersTasksTitle } from '../../constants';
import styles from './TaskPage.module.scss';

class TasksPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      taskId: 0,
      firstName: null,
      lastName: null,
      tasks: [
        {
          deadLineDate: null,
          description: null,
          startDate: null,
          status: null,
          taskId: null,
          taskName: null,
        },
      ],
      names: [],
    };
  }

  componentDidMount() {
    const { userId, taskId } = this.props;
    console.log(this.props);
    firebaseApi.getUserTasks(userId).then((result) => {
      this.setState({
        firstName: result.firstName,
        lastName: result.lastName,
        tasks: result.tasks,
        taskId: +taskId,
      });
    });
    firebaseApi.getNames().then((names) => this.setState({ names }));
  }

  onChange = (e) => {
    const { id, value } = e.currentTarget;
    switch (id) {
      case 'description':
        this.setState({
          newData: {
            ...this.state.newData,
            tasks: [
              ...this.state.newData.tasks,
              { ...this.state.newData.tasks[this.props.taskId], description: value },
            ],
          },
        });
        break;
      case 'lastName':
        this.setState({ newData: { ...this.state.newData, lastName: value } });
        break;
      case 'age':
        this.setState({ newData: { ...this.state.newData, age: value } });
        break;
      case 'education':
        this.setState({ newData: { ...this.state.newData, education: value } });
        break;
      case 'direction':
        console.log(value);
        this.setState({ newData: { ...this.state.newData, direction: value } });
        break;
      case 'startDate':
        this.setState({ newData: { ...this.state.newData, startDate: value } });
        break;
      default:
        break;
    }
  };

  render() {
    // const {taskId} = this.state.taskId
    const { deadLineDate, description, startDate, taskName } = this.state.tasks[this.state.taskId];
    const { names } = this.state;
    const { taskId } = this.props;
    const memberNames = names
      ? names.map((name) => {
          return <MemberName firstName={name.firstName} lastName={name.lastName} userId={name.userId} />;
        })
      : null;
    return (
      <>
        <h1>Task - {taskName}</h1>
        <label htmlFor=''></label>
        <input type='text' value={taskName} />
        <label htmlFor='description'>Description </label>
        <textarea
          name='description'
          id='description'
          cols='30'
          rows='10'
          value={description}
          onChange={this.onChange}
        ></textarea>
        <label htmlFor='startDate'>Start</label>
        <input
          id='startDate'
          type='date'
          required
          onChange={this.onChange}
          value={startDate ? dateToStringForInput(startDate.toDate()) : startDate}
        />
        <label htmlFor='startDate'>Deadline</label>
        <input
          id='deadLineDate'
          type='date'
          required
          onChange={this.onChange}
          value={deadLineDate ? dateToStringForInput(deadLineDate.toDate()) : deadLineDate}
        />
        <div className={styles.members}>
          <div className={styles.membersTitle}>Members</div>
          <div className={styles.membersItems}>
            <ul>{memberNames}</ul>
          </div>
        </div>
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
      </>
    );
  }
}

export default TasksPage;
