import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Modal } from 'reactstrap';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './MembersTasks.module.scss';
import TableHeader from '../common/TableHeader/TableHeader';
import Preloader from '../common/Preloader/Preloader';
import MemberCurrentTasks from './MemberCurrentTasks';
import { membersTasksTitle, membersTasksTitleForMembers } from '../../constants';
import TaskTrackPageContainer from '../TaskTrackPage/TaskTrackPageContainer';
import { setCurrentTaskName } from '../../redux/reducers/memberTasksReducer';
import { setUserTaskId } from '../../redux/reducers/taskTrackManagementReducer';
import { showTaskTrackPage, clearTaskTrackPage } from '../../redux/reducers/taskTrackPageReducer';
import showToast from '../../helpers/showToast';

const MemberTasks = ({
  role,
  isFetching,
  userTasks,
  currentUserFirstName,
  currentUserLastName,
  taskTrackPageIsVisible,
  setCurrentTaskName,
  showTaskTrackPage,
  setUserTaskId,
  clearTaskTrackPage,
  message,
}) => {
  const track = (e) => {
    e.persist();
    const { id, taskid } = e.target.dataset;
    setCurrentTaskName(id);
    showTaskTrackPage(true);
    setUserTaskId(taskid);
  };

  const hideTaskTrackPage = () => {
    clearTaskTrackPage();
    showTaskTrackPage(false);
  };

  const isAdmin = role === 'admin';
  const isMentor = role === 'mentor';
  const isMember = role === 'member';

  if (isFetching) {
    return <Preloader />;
  }

  if (message) {
    showToast({ message, messageType: 'warning' });
  }

  if (userTasks && !userTasks.length) {
    return (
      <p>
        {isMember && 'You '}
        {(isAdmin || isMentor) && `${currentUserFirstName} ${currentUserLastName} `}
        haven&apos;t tasks
      </p>
    );
  }

  const tasksArr = userTasks
    ? userTasks.map((task, index) => {
        return (
          <MemberCurrentTasks
            key={task.userTaskId}
            index={index}
            userTaskId={task.userTaskId}
            taskName={task.name}
            startDate={task.startDate}
            deadlineDate={task.deadlineDate}
            stateName={task.stateName}
            trackTask={track}
            stateId={task.stateId}
            role={role}
          />
        );
      })
    : null;

  return (
    <>
      <ToastContainer />
      <Modal isOpen={taskTrackPageIsVisible} toggle={hideTaskTrackPage}>
        <TaskTrackPageContainer hideTaskTrackPage={hideTaskTrackPage} />
      </Modal>
      <h1 className={styles.title}>Member&apos;s Task Manage Grid</h1>
      {isMember && (
        <h2 className={styles.subtitle}>
          {`Hi, dear ${currentUserFirstName} ${currentUserLastName}! This is your current tasks:`}
        </h2>
      )}
      {(isAdmin || isMentor) && (
        <h2 className={styles.subtitle}>{`Сurrent tasks of ${currentUserFirstName} ${currentUserLastName}:`}</h2>
      )}
      <table>
        <TableHeader titleArray={isAdmin || isMentor ? membersTasksTitle : membersTasksTitleForMembers} />
        <tbody>{tasksArr}</tbody>
      </table>
    </>
  );
};

const mapStateToProps = (state) => {
  const { currentUserId, currentUserFirstName, currentUserLastName, userTasks, message, isFetching } = state.app;
  const { role } = state.auth;
  const { taskTrackPageIsVisible } = state.taskTrackPage;
  const { currentTaskName } = state.memberTasks;
  const { userTaskId } = state.taskTrackManagement;

  return {
    currentUserId,
    role,
    currentTaskName,
    userTaskId,
    userTasks,
    currentUserFirstName,
    currentUserLastName,
    taskTrackPageIsVisible,
    message,
    isFetching,
  };
};

MemberTasks.propTypes = {
  role: PropTypes.string,
  isFetching: PropTypes.bool.isRequired,
  userTasks: PropTypes.arrayOf(PropTypes.shape({ subProp: PropTypes.string })),
  currentUserFirstName: PropTypes.string,
  currentUserLastName: PropTypes.string,
  taskTrackPageIsVisible: PropTypes.bool.isRequired,
  setCurrentTaskName: PropTypes.func.isRequired,
  showTaskTrackPage: PropTypes.func.isRequired,
  setUserTaskId: PropTypes.func.isRequired,
  clearTaskTrackPage: PropTypes.func.isRequired,
  message: PropTypes.string,
};

MemberTasks.defaultProps = {
  role: '',
  userTasks: [],
  currentUserFirstName: '',
  currentUserLastName: '',
  message: null,
};

export default connect(mapStateToProps, { setCurrentTaskName, showTaskTrackPage, setUserTaskId, clearTaskTrackPage })(
  MemberTasks,
);
