import React from 'react';
import PropTypes from 'prop-types';
import Button from '../Button/Button';
import dateToStringForInput from '../../helpers/dateToStringForInput';
import styles from './TaskTrack.module.scss';
import firebaseApi from '../../api/firebaseApi';
import Preloader from '../common/Preloader/Preloader';
import generateID from '../../helpers/generateID';
import taskTrackFields from './taskTrackFields';
import DateField from '../common/DateField/DateField';
import TextAreaField from '../common/TextAreaField/TextAreaField';
import FormMessage from '../common/FormMessage/FormMessage';
import validateTaskTrackForm from '../../helpers/validators/validateTaskTrackForm';

class TaskTrack extends React.Component {
  state = {
    taskName: null,
    trackNote: '',
    message: '',
  };

  componentDidMount() {
    const { taskTrackId, taskName } = this.props;

    if (taskTrackId) {
      firebaseApi.getTaskTrack(taskTrackId).then((trackNote) => this.setState({ trackNote }));
    }
    this.setState({ taskName });
  }

  onChange = (e) => {
    const { name, value } = e.currentTarget;
    this.setState({ [name]: value, message: '' });
  };

  trackTask = () => {
    const { userTaskId, taskTrackId } = this.props;
    const { trackNote } = this.state;
    const trackDate = new Date();
    const isValid = validateTaskTrackForm(trackNote);

    if (isValid.formIsValid) {
      if (taskTrackId) {
        firebaseApi.trackTask(userTaskId, taskTrackId, trackDate, trackNote.trim()).then(({ message, messageType }) => {
          this.setState({ message, messageType });
        });
      } else {
        const generatedTaskTrackId = generateID();
        firebaseApi
          .trackTask(userTaskId, generatedTaskTrackId, trackDate, trackNote.trim())
          .then(({ message, messageType }) => {
            this.setState({ message, messageType });
          });
      }
    } else {
      const { message, messageType } = isValid;
      this.setState({ message, messageType });
    }
  };

  render() {
    const { taskName, message, messageType } = this.state;
    const { hideTaskTrackPage } = this.props;
    const fields = taskTrackFields.map((field) => {
      const { id, name, type, label, placeholder, regexp, errorMessage, cols, rows, disabled } = field;
      if (type === 'date') {
        return (
          <DateField
            key={id}
            id={id}
            name={name}
            label={label}
            value={dateToStringForInput(new Date())}
            disabled={disabled}
          />
        );
      }
      if (type === 'textarea') {
        return (
          <TextAreaField
            id={id}
            name={name}
            label={label}
            value={this.state[name]}
            regexp={regexp}
            errorMessage={errorMessage}
            onChange={this.onChange}
            cols={cols}
            rows={rows}
            placeholder={placeholder}
          />
        );
      }
      return null;
    });

    if (!taskName) {
      return <Preloader />;
    }

    return (
      <div className={styles.wrapper}>
        <h1 className={styles.title}>{`Task Track - ${taskName}`}</h1>

        <form>{fields}</form>

        <FormMessage className={styles.customMessage} messageType={messageType}>
          {message}
        </FormMessage>

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
  userTaskId: PropTypes.string.isRequired,
  taskTrackId: PropTypes.string,
  taskName: PropTypes.string.isRequired,
  hideTaskTrackPage: PropTypes.func.isRequired,
};

TaskTrack.defaultProps = {
  taskTrackId: null,
};

export default TaskTrack;
