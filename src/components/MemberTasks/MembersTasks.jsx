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
import { setCurrentTaskName } from '../../redux/reducers/memberTasksIndex';
import { setUserTaskId } from '../../redux/reducers/taskTrackManagementIndex';
import { showTaskTrackPage, clearTaskTrackPage } from '../../redux/reducers/taskTrackPageIndex';
import showToast from '../../helpers/showToast';
import TaskCardContainer from '../TaskCard/TaskCardContainer';
import { showTaskCard } from '../../redux/reducers/taskPageIndex';
import { setCurrentTask } from '../../redux/reducers/appIndex';

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
  taskCardIsVisible,
  setCurrentTask,
  showTaskCard,
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

  const showTask = (e) => {
    const { taskid } = e.target.dataset;
    setCurrentTask(taskid);
    showTaskCard(true);
  };

  const hideTaskCard = () => {
    showTaskCard(false);
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
            showTask={showTask}
            taskId={task.taskId}
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
      <Modal isOpen={taskCardIsVisible} toggle={hideTaskCard} centered>
        <TaskCardContainer hideTaskCard={hideTaskCard} />
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

const mapStateToProps = ({ app, auth, taskTrackPage, memberTasks, taskTrackManagement, taskPage }) => {
  const { currentUserId, currentUserFirstName, currentUserLastName, userTasks, message, isFetching } = app;
  const { role } = auth;
  const { taskTrackPageIsVisible } = taskTrackPage;
  const { currentTaskName } = memberTasks;
  const { taskCardIsVisible } = taskPage;
  const { userTaskId } = taskTrackManagement;

  return {
    currentUserId,
    role,
    currentTaskName,
    userTaskId,
    userTasks,
    currentUserFirstName,
    currentUserLastName,
    taskTrackPageIsVisible,
    taskCardIsVisible,
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
  taskCardIsVisible: PropTypes.bool.isRequired,
  setCurrentTaskName: PropTypes.func.isRequired,
  showTaskTrackPage: PropTypes.func.isRequired,
  setUserTaskId: PropTypes.func.isRequired,
  clearTaskTrackPage: PropTypes.func.isRequired,
  setCurrentTask: PropTypes.func.isRequired,
  showTaskCard: PropTypes.func.isRequired,
  message: PropTypes.string,
};

MemberTasks.defaultProps = {
  role: '',
  userTasks: [],
  currentUserFirstName: '',
  currentUserLastName: '',
  message: null,
};

export default connect(mapStateToProps, {
  setCurrentTaskName,
  showTaskTrackPage,
  setUserTaskId,
  clearTaskTrackPage,
  setCurrentTask,
  showTaskCard,
})(MemberTasks);
