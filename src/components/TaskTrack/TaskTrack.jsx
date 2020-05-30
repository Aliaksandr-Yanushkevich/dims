import React from 'react';
import PropTypes from 'prop-types';
import Button from '../Button/Button';
import dateToStringForInput from '../../helpers/dateToStringForInput';
import styles from './TaskTrack.module.scss';
import FormField from '../FormField/FormField';
import firebaseTrueApi from '../../api/firebaseTrueApi';
import Preloader from '../common/Preloader/Preloader';
import generateID from '../../helpers/generateID';

class TaskTrack extends React.Component {
  state = {
    taskName: null,
    note: '',
  };

  componentDidMount() {
    const { userTaskId } = this.props;
    if (userTaskId) {
      firebaseTrueApi
        .getTaskName(userTaskId)
        .then((taskName) => {
          this.setState({ taskName });
        })
        .catch((error) => {
          console.error(`Error receiving data: ${error}`);
        });
    }
  }

  onChange = (e) => {
    const { value } = e.currentTarget;
    this.setState({ trackNote: value });
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

  trackTask = () => {
    const { userTaskId } = this.props;
    const { trackNote } = this.state;
    const taskTrackId = generateID();
    const trackDate = new Date();
    firebaseTrueApi.trackTask(userTaskId, taskTrackId, trackDate, trackNote);
  };

  render() {
    const { taskName, trackNote } = this.state;
    const { hideTaskTrackPage } = this.props;
    if (!taskName) {
      return <Preloader />;
    }

    return (
      <div className={styles.wrapper}>
        <h1 className={styles.title}>{`Task Track - ${taskName}`}</h1>

        <div className={styles.dateItem}>
          <label htmlFor='date'>Date </label>
          <input id='date' type='date' value={dateToStringForInput(new Date())} disabled />
        </div>
        <FormField
          id='note'
          name='note'
          value={trackNote}
          placeholder='Type your note here'
          onChange={this.onChange}
          inputType='textarea'
          validateForm={this.validateForm}
        />
        <div className={styles.buttonWrapper}>
          <Button className={styles.successButton} onClick={this.trackTask}>
            Save
          </Button>
          <Button onClick={hideTaskTrackPage}>Back to grid</Button>
        </div>
      </div>
    );
  }
}

TaskTrack.propTypes = {
  userId: PropTypes.string.isRequired,
  taskId: PropTypes.string.isRequired,
  hideTaskTrackPage: PropTypes.func.isRequired,
};

export default TaskTrack;
