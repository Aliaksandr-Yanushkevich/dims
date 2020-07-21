import React from 'react';
import PropTypes from 'prop-types';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { connect } from 'react-redux';
import Button from '../common/Button/Button';
import styles from './TaskPage.module.scss';
import MemberList from './MemberList';
import firebaseApi from '../../api/firebaseApi';
import taskPageFields from './taskPageFields';
import SubmitButton from '../common/SubmitButton/SubmitButton';
import showToast from '../../helpers/showToast';
import { onChangeValue } from '../../redux/reducers/taskPageIndex';
import createPattern from '../../helpers/createPattern';

const TaskPage = (props) => {
  const { userTasks, taskId, usersWithTaskFromDB, usersWithTaskLocal, hideMemberPage, onChangeValue, message } = props;
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
        taskId,
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

  return (
    <>
      <ToastContainer />
      <div className={styles.wrapper}>
        <h1 className={styles.title}>{taskId === 'newTask' ? 'New task' : `Edit task`}</h1>
        <div className={styles.left}>
          <AvForm id='createTask' onSubmit={createTask}>
            {formFields}
          </AvForm>
        </div>

        <div className={styles.right}>
          <MemberList />
          <div className={styles.buttonWrapper}>
            <SubmitButton className={styles.successButton} form='createTask'>
              {taskId === 'newTask' ? 'Create' : 'Save'}
            </SubmitButton>
            <Button className={styles.defaultButton} onClick={hideMemberPage}>
              Back to grid
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = ({ taskPage }) => {
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
};

TaskPage.defaultProps = {
  userTasks: [],
  usersWithTaskFromDB: [],
  usersWithTaskLocal: [],
  message: null,
};

export default connect(mapStateToProps, { onChangeValue })(TaskPage);
