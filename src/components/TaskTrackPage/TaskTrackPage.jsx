import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AvField from 'availity-reactstrap-validation/lib/AvField';
import AvForm from 'availity-reactstrap-validation/lib/AvForm';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from '../common/Button/Button';
import styles from './TaskTrack.module.scss';
import firebaseApi from '../../api/firebaseApi';
import Preloader from '../common/Preloader/Preloader';
import generateID from '../../helpers/generateID';
import taskTrackFields from './taskTrackFields';
import SubmitButton from '../common/SubmitButton/SubmitButton';
import showToast from '../../helpers/showToast';
import { onChangeValue } from '../../redux/reducers/taskTrackPageReducer';
import createPattern from '../../helpers/createPattern';

const TaskTrackPage = (props) => {
  const { hideTaskTrackPage, currentTaskName, message } = props;
  const onChange = (e) => {
    const { onChangeValue } = props;
    const { name, value } = e.target;
    onChangeValue(name, value);
  };

  const trackTask = (event, errors, values) => {
    if (!errors.length) {
      const { userTaskId, currentTaskTrackId } = props;
      const { trackNote } = values;
      const trackDate = new Date();

      if (currentTaskTrackId) {
        firebaseApi.trackTask(userTaskId, currentTaskTrackId, trackDate, trackNote.trim()).then((result) => {
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

  const fields = taskTrackFields.map((field) => {
    const { id, name, type, label, placeholder, regexp, errorMessage, cols, rows, disabled } = field;
    if (type === 'date') {
      return <AvField key={id} id={id} name={name} type='date' label={label} value={props[name]} disabled={disabled} />;
    }
    if (type === 'textarea') {
      return (
        <AvField
          key={id}
          id={id}
          name={name}
          type='textarea'
          label={label}
          value={props[name]}
          onChange={onChange}
          cols={cols}
          rows={rows}
          placeholder={placeholder}
          validate={{
            required: { value: true, errorMessage: 'Field is required' },
            pattern: createPattern(regexp, errorMessage),
          }}
        />
      );
    }
    return null;
  });

  if (!currentTaskName) {
    return <Preloader />;
  }

  if (message) {
    showToast(message);
  }

  return (
    <>
      <ToastContainer />
      <div className={styles.wrapper}>
        <h1 className={styles.title}>{`Task Track - ${currentTaskName}`}</h1>

        <AvForm id='track' onSubmit={trackTask}>
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
};

const mapStateToProps = (state) => {
  const { currentTaskName } = state.memberTasks;
  const { userTaskId, currentTaskTrackId } = state.taskTrackManagement;
  const { trackNote, trackDate, message } = state.taskTrackPage;
  return { currentTaskName, userTaskId, currentTaskTrackId, trackNote, trackDate, message };
};

TaskTrackPage.propTypes = {
  userTaskId: PropTypes.string,
  currentTaskTrackId: PropTypes.string,
  currentTaskName: PropTypes.string,
  hideTaskTrackPage: PropTypes.func.isRequired,
  onChangeValue: PropTypes.func.isRequired,
  message: PropTypes.node,
};

TaskTrackPage.defaultProps = {
  currentTaskTrackId: '',
  userTaskId: '',
  currentTaskName: '',
  message: null,
};

export default connect(mapStateToProps, { onChangeValue })(TaskTrackPage);
