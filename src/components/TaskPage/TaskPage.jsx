import React from 'react';
import PropTypes from 'prop-types';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faInfoCircle, faUsers } from '@fortawesome/free-solid-svg-icons';
import Button from '../common/Button/Button';
import styles from './TaskPage.module.scss';
import MemberList from './MemberList';
import firebaseApi from '../../api/firebaseApi';
import taskPageFields from './taskPageFields';
import SubmitButton from '../common/SubmitButton/SubmitButton';
import showToast from '../../helpers/showToast';
import { onChangeValue } from '../../redux/reducers/taskPageIndex';
import createPattern from '../../helpers/createPattern';
import generateID from '../../helpers/generateID';
import Preloader from '../common/Preloader/Preloader';

const TaskPage = (props) => {
  const {
    userTasks,
    taskId,
    usersWithTaskFromDB,
    usersWithTaskLocal,
    hideMemberPage,
    onChangeValue,
    message,
    isFetching,
  } = props;
  const onChange = (e) => {
    const { name, value } = e.target;
    onChangeValue(name, value);
  };
  const formFields = taskPageFields.map(({ id, name, type, label, placeholder, regexp, errorMessage, cols, rows }) => {
    if (type === 'date') {
      return (
        <AvField
          key={id}
          id={id}
          name={name}
          label={label}
          type={type}
          onChange={onChange}
          value={props[name]}
          required
        />
      );
    }

    return (
      <AvField
        key={id}
        id={id}
        value={props[name]}
        name={name}
        type={type}
        label={label}
        placeholder={placeholder}
        onChange={onChange}
        cols={cols}
        rows={rows}
        validate={{
          required: { value: true, errorMessage: 'Field is required' },
          pattern: createPattern(regexp, errorMessage),
        }}
      />
    );
  });

  const createTask = (event, errors, values) => {
    if (!errors.length) {
      const { name, description, startDate, deadlineDate } = values;

      const taskInfo = {
        taskId: taskId === 'newTask' ? generateID() : taskId,
        name: name.trim(),
        description: description.trim(),
        startDate: new Date(startDate),
        deadlineDate: new Date(deadlineDate),
      };

      firebaseApi
        .assignTaskToUsers(usersWithTaskFromDB, usersWithTaskLocal, taskId, userTasks, taskInfo)
        .then((result) => {
          showToast(result);
        });
    }
  };

  if (message) {
    showToast(message);
  }

  if (isFetching) {
    return <Preloader />;
  }

  return (
    <>
      <ToastContainer />
      <div className={styles.wrapper}>
        <h1 className={styles.title}>
          <FontAwesomeIcon icon={faEdit} className={styles.icon} />
          {taskId === 'newTask' ? 'New task' : `Edit task`}
        </h1>
        <div className={styles.taskPageContent}>
          <div className={styles.left}>
            <h4 className={styles.groupTitle}>
              <FontAwesomeIcon icon={faInfoCircle} className={styles.icon} />
              Task Info
            </h4>
            <AvForm id='createTask' onSubmit={createTask}>
              {formFields}
            </AvForm>
          </div>

          <div className={styles.right}>
            <h4 className={styles.groupTitle}>
              <FontAwesomeIcon icon={faUsers} className={styles.icon} />
              Members
            </h4>
            <MemberList />
          </div>
        </div>
        <div className={styles.buttonWrapper}>
          <SubmitButton className={`${styles.successButton} ${styles.leftButton}`} form='createTask'>
            {taskId === 'newTask' ? 'Create' : 'Save'}
          </SubmitButton>
          <Button className={styles.defaultButton} onClick={hideMemberPage}>
            Back
          </Button>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = ({ taskPage, app }) => {
  const {
    taskId,
    name,
    description,
    startDate,
    deadlineDate,
    usersWithTaskFromDB,
    usersWithTaskLocal,
    userTasks,
    currentTaskData,
    message,
  } = taskPage;

  const { isFetching } = app;

  return {
    description,
    startDate,
    deadlineDate,
    usersWithTaskFromDB,
    usersWithTaskLocal,
    userTasks,
    currentTaskData,
    taskId,
    name,
    message,
    isFetching,
  };
};

TaskPage.propTypes = {
  taskId: PropTypes.string.isRequired,
  hideMemberPage: PropTypes.func.isRequired,
  userTasks: PropTypes.arrayOf(PropTypes.shape({ subProp: PropTypes.string })),
  usersWithTaskFromDB: PropTypes.arrayOf(PropTypes.string),
  usersWithTaskLocal: PropTypes.arrayOf(PropTypes.string),
  onChangeValue: PropTypes.func.isRequired,
  message: PropTypes.node,
  isFetching: PropTypes.bool.isRequired,
};

TaskPage.defaultProps = {
  userTasks: [],
  usersWithTaskFromDB: [],
  usersWithTaskLocal: [],
  message: null,
};

export default connect(mapStateToProps, { onChangeValue })(TaskPage);
