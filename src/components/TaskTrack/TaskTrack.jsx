import React from 'react';
import PropTypes from 'prop-types';
import Button from '../Button/Button';
import dateToStringForInput from '../common/dateToStringForInput';
import firebaseApi from '../../api/firebaseApi';
import styles from './TaskTrack.module.scss';
import FormField from '../../utils/validators/FormField';

class TaskTrack extends React.Component {
  state = {
    taskName: null,
    note: '',
    noteIsValid: false,
  };

  componentDidMount() {
    const { userId, taskId } = this.props;
    firebaseApi
      .getUserTasks(userId)
      .then((response) => this.setState({ taskName: response.tasks[taskId].taskName }))
      .catch((error) => console.error(`Error receiving data: ${error}`));
  }

  onChange = (e) => {
    const { value } = e.currentTarget;
    this.setState({ note: value });
  };

  validateForm = (id, message) => {
    switch (id) {
      case 'note':
        this.setState({ noteIsValid: !message });
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
        <h1>{`Task Track - ${taskName}`}</h1>

        <div className={styles.dateItem}>
          <label htmlFor='date'>Date </label>
          <input id='date' type='date' value={dateToStringForInput(new Date())} disabled />
        </div>
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
          <Button className={styles.successButton} onClick={() => console.log('note saved!')} disabled={!noteIsValid}>
            Save
          </Button>
          <Button onClick={() => showTaskTrack(false)}>Back to grid</Button>
        </div>
      </div>
    );
  }
}

TaskTrack.propTypes = {
  userId: PropTypes.string.isRequired,
  taskId: PropTypes.string.isRequired,
  showTaskTrack: PropTypes.func.isRequired,
};

export default TaskTrack;
