import React from 'react';
import { NavLink } from 'react-router-dom';
import Button from '../Button/Button';
import dateToStringForInput from '../common/dateToStringForInput';
import firebaseApi from '../../api/firebaseApi';
import styles from './TaskTrack.module.scss';

class TaskTrack extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      taskName: null,
      note: '',
    };
  }

  componentDidMount() {
    const { userId, taskId } = this.props;
    firebaseApi.getUserTasks(userId).then((response) => this.setState({ taskName: response.tasks[taskId].taskName }));
  }

  onChange = (e) => {
    const { value } = e.currentTarget;
    this.setState({ note: value });
  };

  render() {
    const { taskName, note } = this.state;
    const { userId } = this.props;
    return (
      <div className={styles.wrapper}>
        <h1>Task Track - {taskName}</h1>

        <div className={styles.dateItem}>
          <label htmlFor='date'>Date</label>
          <input id='date' type='date' value={dateToStringForInput(new Date())} disabled />
        </div>
        <label htmlFor='date'>Note</label>
        <textarea
          name='note'
          id='note'
          cols='30'
          rows='10'
          value={note}
          placeholder='Type your note here'
          onChange={this.onChange}
        />
        <div className={styles.buttonWrapper}>
          <Button className={styles.successButton} buttonText='Save' onClick={() => console.log('note saved!')} />
          <NavLink to='/members'>
            <Button buttonText='Back to grid' />
          </NavLink>
        </div>
      </div>
    );
  }
}

export default TaskTrack;
