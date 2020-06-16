import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import AvField from 'availity-reactstrap-validation/lib/AvField';
import AvForm from 'availity-reactstrap-validation/lib/AvForm';
import dateToStringForInput from '../../helpers/dateToStringForInput';
import styles from './TaskTrack.module.scss';
import firebaseApi from '../../api/firebaseApi';
import Preloader from '../common/Preloader/Preloader';
import generateID from '../../helpers/generateID';
import { textMaxLength1000 } from '../../constants';

class TaskTrack extends React.Component {
  state = {
    taskName: null,
    trackNote: '',
  };

  componentDidMount() {
    const { taskTrackId, taskName } = this.props;
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
    const { value } = e.target;
    this.setState({ trackNote: value });
  };

  trackTask = (event, errors) => {
    if (!errors.length) {
      const { userTaskId, taskTrackId } = this.props;
      const { trackNote } = this.state;
      const trackDate = new Date();
      if (taskTrackId) {
        firebaseApi.trackTask(userTaskId, taskTrackId, trackDate, trackNote.trim());
      } else {
        const generatedTaskTrackId = generateID();
        firebaseApi.trackTask(userTaskId, generatedTaskTrackId, trackDate, trackNote.trim());
      }
    }
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

        <AvForm onSubmit={this.trackTask}>
          <AvField name='date' label='Date:' type='date' value={dateToStringForInput(new Date())} required disabled />
          <AvField
            id='note'
            value={trackNote}
            name='note'
            type='textarea'
            label='Note:'
            placeholder='Type your note here'
            onChange={this.onChange}
            validate={{
              required: { value: true, errorMessage: 'Field is required' },
              pattern: {
                value: `${textMaxLength1000}`,
                errorMessage: 'Field must be short than 1000 symbols',
              },
            }}
          />
          <div className={styles.buttonWrapper}>
            <Button className={styles.successButton}>Save</Button>
            <Button className={styles.defaultButton} onClick={hideTaskTrackPage}>
              Back to grid
            </Button>
          </div>
        </AvForm>
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
