import React from 'react';
import PropTypes from 'prop-types';
import Button from '../Button/Button';
import dateToStringForInput from '../../helpers/dateToStringForInput';
import styles from './TaskTrack.module.scss';
import FormField from '../FormField/FormField';
import firebaseApi from '../../api/firebaseApi';
import Preloader from '../common/Preloader/Preloader';
import generateID from '../../helpers/generateID';

class TaskTrack extends React.Component {
  state = {
    taskName: null,
    trackNote: '',
    formIsValid: false,
  };

  componentDidMount() {
    const { taskTrackId, taskName } = this.props;
    this.validateForm();
    if (taskTrackId) {
      firebaseApi
        .getTaskTrack(taskTrackId)
        .then((trackNote) => this.setState({ trackNote }))
        .catch((error) => {
          console.error(`Error receiving data: ${error}`);
        });
    }
    this.setState({ taskName });
  }

  onChange = (e) => {
    const { value } = e.currentTarget;
    this.setState({ trackNote: value });
    this.validateForm();
  };

  validateForm = () => {
    // magic numbers here are minimal/maximum length for input fields or other special requirements
    const { trackNote } = this.state;
    if (trackNote.length && trackNote.length <= 1000) {
      this.setState({ formIsValid: true });
    } else {
      this.setState({ formIsValid: false });
    }
  };

  trackTask = () => {
    const { userTaskId, taskTrackId } = this.props;
    const { trackNote } = this.state;
    const trackDate = new Date();
    if (taskTrackId) {
      firebaseApi.trackTask(userTaskId, taskTrackId, trackDate, trackNote.trim());
    } else {
      const generatedTaskTrackId = generateID();
      firebaseApi.trackTask(userTaskId, generatedTaskTrackId, trackDate, trackNote.trim());
    }
  };

  render() {
    const { taskName, trackNote, formIsValid } = this.state;
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
          label='Note'
          maxLength={1000}
        />
        <div className={styles.buttonWrapper}>
          <Button disabled={!formIsValid} className={styles.successButton} onClick={this.trackTask}>
            Save
          </Button>
          <Button onClick={hideTaskTrackPage}>Back to grid</Button>
        </div>
      </div>
    );
  }
}

TaskTrack.propTypes = {
  userTaskId: PropTypes.string.isRequired,
  taskTrackId: PropTypes.string,
  taskName: PropTypes.string.isRequired,
  hideTaskTrackPage: PropTypes.func.isRequired,
};

TaskTrack.defaultProps = {
  taskTrackId: null,
};

export default TaskTrack;
