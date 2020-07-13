import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Modal } from 'reactstrap';
import styles from './MembersTasks.module.scss';
import TableHeader from '../common/TableHeader/TableHeader';
import Preloader from '../common/Preloader/Preloader';
import MemberCurrentTasks from './MemberCurrentTasks';
import { membersTasksTitle, membersTasksTitleForMembers } from '../../constants';
import TaskTrack from '../TaskTrack/TaskTrack';
import { setCurrentTaskName } from '../../redux/reducers/memberTasksReducer';
import { setCurrentTask } from '../../redux/reducers/appReducer';
import { showTaskTrackPage } from '../../redux/reducers/taskTrackPageReducer';

const MemberTasks = ({
  role,
  isFetching,
  currentTaskName,
  currentUserTaskId,
  userTasks,
  currentUserFirstName,
  currentUserLastName,
  taskTrackPageIsVisible,
  setCurrentTaskName,
  showTaskTrackPage,
  setCurrentTask,
}) => {
  const track = (e) => {
    e.persist();
    const { id, taskid } = e.target.dataset;
    setCurrentTaskName(id);
    showTaskTrackPage(true);
    setCurrentTask(taskid);
  };

  const hideTaskTrackPage = () => {
    // clear data ?
    showTaskTrackPage(false);
  };

  const isAdmin = role === 'admin';
  const isMentor = role === 'mentor';
  const isMember = role === 'member';

  if (isFetching) {
    return <Preloader />;
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
      <Modal isOpen={taskTrackPageIsVisible} toggle={hideTaskTrackPage}>
        <TaskTrack userTaskId={currentUserTaskId} taskName={currentTaskName} hideTaskTrackPage={hideTaskTrackPage} />
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
  const { currentUserId, isFetching, currentUserFirstName, currentUserLastName, userTasks } = state.app;
  const { role } = state.auth;
  const { taskTrackPageIsVisible } = state.taskTrackPage;
  const { currentTaskName, currentUserTaskId } = state.memberTasks;

  return {
    currentUserId,
    role,
    isFetching,
    currentTaskName,
    currentUserTaskId,
    userTasks,
    currentUserFirstName,
    currentUserLastName,
    taskTrackPageIsVisible,
  };
};

MemberTasks.propTypes = {
  role: PropTypes.string,
  isFetching: PropTypes.bool.isRequired,
  currentTaskName: PropTypes.string,
  currentUserTaskId: PropTypes.string,
  userTasks: PropTypes.arrayOf(PropTypes.shape({ subProp: PropTypes.string })),
  currentUserFirstName: PropTypes.string,
  currentUserLastName: PropTypes.string,
  taskTrackPageIsVisible: PropTypes.bool.isRequired,
  setCurrentTaskName: PropTypes.func.isRequired,
  showTaskTrackPage: PropTypes.func.isRequired,
  setCurrentTask: PropTypes.func.isRequired,
};

MemberTasks.defaultProps = {
  role: '',
  currentTaskName: '',
  currentUserTaskId: '',
  userTasks: [],
  currentUserFirstName: '',
  currentUserLastName: '',
};

export default connect(mapStateToProps, { setCurrentTaskName, showTaskTrackPage, setCurrentTask })(MemberTasks);
