import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Modal } from 'reactstrap';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './TaskTrackManagement.module.scss';
import TableHeader from '../common/TableHeader/TableHeader';
import { tasksTrackTitle } from '../../constants';
import Preloader from '../common/Preloader/Preloader';
import TasksTracksManagementRow from './TaskTrackManagementRow';
import TaskTrackPageContainer from '../TaskTrackPage/TaskTrackPageContainer';
import firebaseApi from '../../api/firebaseApi';
import dateToString from '../../helpers/dateToString';
import showToast from '../../helpers/showToast';
import {
  setCurrentTaskTrackId,
  setUserTaskId,
  clearTaskTrackId,
} from '../../redux/reducers/taskTrackManagementReducer';
import { setCurrentTaskName } from '../../redux/reducers/memberTasksReducer';
import { showTaskTrackPage, clearTaskTrackPage } from '../../redux/reducers/taskTrackPageReducer';

const TaskTrackManagement = ({
  role,
  trackData,
  taskTrackPageIsVisible,
  isFetching,
  setCurrentTaskTrackId,
  setCurrentTaskName,
  setUserTaskId,
  showTaskTrackPage,
  clearTaskTrackPage,
  clearTaskTrackId,
  message,
}) => {
  const editTask = (e) => {
    e.persist();
    const { taskid, name, id } = e.target.dataset;
    setCurrentTaskTrackId(taskid);
    setCurrentTaskName(name);
    setUserTaskId(id);
    showTaskTrackPage(true);
  };

  const deleteNote = (e) => {
    e.persist();
    const taskTrackId = e.target.dataset.taskid;
    firebaseApi.deleteItemWithId('TaskTrack', taskTrackId).then((result) => {
      showToast(result);
    });
  };

  const hideTaskTrackPage = () => {
    clearTaskTrackPage();
    clearTaskTrackId();
    showTaskTrackPage(false);
  };

  const tableRows = trackData
    ? trackData.map((task, index) => {
        return (
          <TasksTracksManagementRow
            key={task.taskTrackId}
            index={index + 1}
            taskName={task.taskName}
            userTaskId={task.userTaskId}
            taskTrackId={task.taskTrackId}
            trackNote={task.trackNote}
            trackDate={dateToString(task.trackDate)}
            editTask={editTask}
            deleteNote={deleteNote}
          />
        );
      })
    : null;

  if (isFetching) {
    return <Preloader />;
  }

  if (role !== 'member') {
    return (
      <p>
        You do not have permission to view this page. This page is only available to users with the &apos;member&apos;
        role.
      </p>
    );
  }

  if (message) {
    showToast({ message, messageType: 'warning' });
  }

  if (trackData && !trackData.length) {
    return <p>You haven&apos;t track notes</p>;
  }
  return (
    <>
      <ToastContainer />
      <Modal isOpen={taskTrackPageIsVisible} toggle={hideTaskTrackPage}>
        <TaskTrackPageContainer hideTaskTrackPage={hideTaskTrackPage} />
      </Modal>
      <h1 className={styles.title}>Task Track Management</h1>
      <table>
        <TableHeader titleArray={tasksTrackTitle} />
        <tbody>{tableRows}</tbody>
      </table>
    </>
  );
};

const mapStateToProps = ({ taskTrackManagement, auth, memberTasks, taskTrackPage, app }) => {
  const { currentTaskTrackId, trackData, userTaskId, message } = taskTrackManagement;
  const { role } = auth;
  const { currentTaskName } = memberTasks;
  const { taskTrackPageIsVisible } = taskTrackPage;
  const { isFetching } = app;
  return {
    role,
    currentTaskTrackId,
    currentTaskName,
    userTaskId,
    trackData,
    taskTrackPageIsVisible,
    message,
    isFetching,
  };
};

TaskTrackManagement.propTypes = {
  role: PropTypes.string,
  trackData: PropTypes.arrayOf(PropTypes.shape({ subProp: PropTypes.string })),
  taskTrackPageIsVisible: PropTypes.bool.isRequired,
  isFetching: PropTypes.bool.isRequired,
  setCurrentTaskTrackId: PropTypes.func.isRequired,
  setCurrentTaskName: PropTypes.func.isRequired,
  setUserTaskId: PropTypes.func.isRequired,
  showTaskTrackPage: PropTypes.func.isRequired,
  clearTaskTrackPage: PropTypes.func.isRequired,
  clearTaskTrackId: PropTypes.func.isRequired,
};

TaskTrackManagement.defaultProps = {
  role: '',
  trackData: [],
};

export default connect(mapStateToProps, {
  setCurrentTaskTrackId,
  setCurrentTaskName,
  setUserTaskId,
  showTaskTrackPage,
  clearTaskTrackPage,
  clearTaskTrackId,
})(TaskTrackManagement);
