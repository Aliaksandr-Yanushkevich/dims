import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AvField from 'availity-reactstrap-validation/lib/AvField';
import AvForm from 'availity-reactstrap-validation/lib/AvForm';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from '../common/Button/Button';
import dateToStringForInput from '../../helpers/dateToStringForInput';
import styles from './TaskTrack.module.scss';
import firebaseApi from '../../api/firebaseApi';
import Preloader from '../common/Preloader/Preloader';
import generateID from '../../helpers/generateID';
import taskTrackFields from './taskTrackFields';
import SubmitButton from '../common/SubmitButton/SubmitButton';
import showToast from '../../helpers/showToast';

class TaskTrackContainer extends React.Component {
  state = {
    taskName: null,
  };

  componentDidMount() {
    const { taskTrackId, taskName } = this.props;
    if (taskTrackId) {
      firebaseApi.getTaskTrack(taskTrackId).then((trackNote) => {
        this.setState({ trackNote });
      });
    }
    this.setState({ taskName });
  }

  onChange = (e) => {
    const { name, value } = e.currentTarget;
    this.setState({ [name]: value, message: '' });
  };

  trackTask = (event, errors, values) => {
    debugger;
    if (!errors.length) {
      const { userTaskId, taskTrackId } = this.props;
      const { trackNote } = values;
      const trackDate = new Date();

      if (taskTrackId) {
        firebaseApi.trackTask(userTaskId, taskTrackId, trackDate, trackNote.trim()).then((result) => {
          showToast(result);
        });
      } else {
        const generatedTaskTrackId = generateID();
        firebaseApi.trackTask(userTaskId, generatedTaskTrackId, trackDate, trackNote.trim()).then((result) => {
          showToast(result);
        });
      }
    }
  };

  render() {
    const { taskName } = this.state;
    const { hideTaskTrackPage } = this.props;
    const fields = taskTrackFields.map((field) => {
      const { id, name, type, label, placeholder, regexp, errorMessage, cols, rows, disabled } = field;
      if (type === 'date') {
        return (
          <AvField
            key={id}
            id={id}
            name={name}
            type='date'
            label={label}
            value={dateToStringForInput(new Date())}
            disabled={disabled}
          />
        );
      }
      if (type === 'textarea') {
        return (
          <AvField
            key={id}
            id={id}
            name={name}
            type='textarea'
            label={label}
            value={this.state[name]}
            onChange={this.onChange}
            cols={cols}
            rows={rows}
            placeholder={placeholder}
            validate={{
              required: { value: true, errorMessage: 'Field is required' },
              pattern: {
                value: `${regexp}`,
                errorMessage,
              },
            }}
          />
        );
      }
      return null;
    });

    if (!taskName) {
      return <Preloader />;
    }

    return (
      <>
        <ToastContainer />
        <div className={styles.wrapper}>
          <h1 className={styles.title}>{`Task Track - ${taskName}`}</h1>

          <AvForm id='track' onSubmit={this.trackTask}>
            {fields}
          </AvForm>
          <div className={styles.buttonWrapper}>
            <SubmitButton className={styles.successButton} form='track'>
              Save
            </SubmitButton>
            <Button className={styles.defaultButton} onClick={hideTaskTrackPage}>
              Back to grid
            </Button>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  const { userTasks } = state.app;
  return { userTasks };
};

TaskTrackContainer.propTypes = {
  userTaskId: PropTypes.string,
  taskTrackId: PropTypes.string,
  taskName: PropTypes.string,
  hideTaskTrackPage: PropTypes.func.isRequired,
};

TaskTrackContainer.defaultProps = {
  taskTrackId: null,
  userTaskId: '',
  taskName: '',
};

export default connect(mapStateToProps, {})(TaskTrackContainer);
