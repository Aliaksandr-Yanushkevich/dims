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
import TaskTrack from '../TaskTrack/TaskTrack';
import firebaseApi from '../../api/firebaseApi';
import dateToString from '../../helpers/dateToString';
import showToast from '../../helpers/showToast';
import { setCurrentTaskTrackId } from '../../redux/reducers/taskTrackManagementReducer';
import { setCurrentTaskName } from '../../redux/reducers/memberTasksReducer';
import { setCurrentTask } from '../../redux/reducers/appReducer';
import { showTaskTrackPage } from '../../redux/reducers/taskTrackPageReducer';

const TaskTrackManagement = ({
  role,
  currentTaskTrackId,
  currentTaskName,
  currentTaskId,
  trackData,
  taskTrackPageIsVisible,
  isFetching,
  setCurrentTaskTrackId,
  setCurrentTaskName,
  setCurrentTask,
  showTaskTrackPage,
}) => {
  const editTask = (e) => {
    e.persist();
    const { taskid, name, id } = e.target.dataset;
    setCurrentTaskTrackId(taskid);
    setCurrentTaskName(name);
    setCurrentTask(id);
    showTaskTrackPage(true);
  };

  const deleteNote = (e) => {
    e.persist();
    const currentTaskTrackId = e.target.dataset.taskid;
    firebaseApi.deleteItemWithId('TaskTrack', currentTaskTrackId).then((result) => {
      showToast(result);
    });
  };

  const hideTaskTrackPage = () => {
    //clean data method
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

  if (role !== 'member') {
    return (
      <p>
        You do not have permission to view this page. This page is only available to users with the &apos;member&apos;
        role.
      </p>
    );
  }

  if (isFetching) {
    return <Preloader />;
  }
  if (trackData && !trackData.length) {
    return <p>You haven&apos;t track notes</p>;
  }
  return (
    <>
      <ToastContainer />
      <Modal isOpen={taskTrackPageIsVisible} toggle={hideTaskTrackPage}>
        <TaskTrack
          userTaskId={currentTaskId}
          taskTrackId={currentTaskTrackId}
          taskName={currentTaskName}
          hideTaskTrackPage={hideTaskTrackPage}
        />
      </Modal>
      <h1 className={styles.title}>Task Track Management</h1>
      <table>
        <TableHeader titleArray={tasksTrackTitle} />
        <tbody>{tableRows}</tbody>
      </table>
    </>
  );
};

const mapStateToProps = (state) => {
  const { currentTaskTrackId, trackData } = state.taskTrackManagement;
  const { role } = state.auth;
  const { currentTaskName } = state.memberTasks;
  const { currentTaskId, isFetching } = state.app;
  const { taskTrackPageIsVisible } = state.taskTrackPage;
  return { role, currentTaskTrackId, currentTaskName, currentTaskId, trackData, taskTrackPageIsVisible, isFetching };
};

TaskTrackManagement.propTypes = {
  role: PropTypes.string,
};

TaskTrackManagement.defaultProps = {
  role: '',
};

export default connect(mapStateToProps, {
  setCurrentTaskTrackId,
  setCurrentTaskName,
  setCurrentTask,
  showTaskTrackPage,
})(TaskTrackManagement);
