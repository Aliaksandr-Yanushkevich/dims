import React from 'react';
import { NavLink } from 'react-router-dom';
import Button from '../Button/Button';
import dateToStringForInput from '../common/dateToStringForInput';
import firebaseApi from '../../api/firebaseApi';
import styles from './TaskTrack.module.scss';
import FormField from '../../utils/validators/FormField';

class TaskTrack extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      taskName: null,
      note: '',
      noteIsValid: false,
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

  validateForm = (id, message) => {
    const valid = message ? false : true;
    switch (id) {
      case 'note':
        this.setState({ noteIsValid: valid });
        break;
      default:
        break;
    }
  };

  render() {
    const { taskName, note, noteIsValid } = this.state;
    const { showTaskTrack } = this.props;
    return (
      <div className={styles.wrapper}>
        <h1>Task Track - {taskName}</h1>

        <div className={styles.dateItem}>
          <label htmlFor='date'>Date</label>
          <input id='date' type='date' value={dateToStringForInput(new Date())} disabled />
        </div>
        {/* <label htmlFor='date'>Note</label>
        <textarea
          name='note'
          id='note'
          cols='30'
          rows='10'
          value={note}
          placeholder='Type your note here'
          onChange={this.onChange}
        /> */}
        <FormField
          id='note'
          name='note'
          value={note}
          placeholder='Type your note here'
          onChange={this.onChange}
          required
          maxLength={140}
          inputType='textarea'
          validateForm={this.validateForm}
        />
        <div className={styles.buttonWrapper}>
          <Button
            className={styles.successButton}
            buttonText='Save'
            onClick={() => console.log('note saved!')}
            disabled={!noteIsValid}
          />
          <Button buttonText='Back to grid' onClick={() => showTaskTrack(false)} />
        </div>
      </div>
    );
  }
}

export default TaskTrack;
