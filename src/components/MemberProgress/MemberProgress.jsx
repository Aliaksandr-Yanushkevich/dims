import React from 'react';
import { connect } from 'react-redux';
import PropTypes, { object } from 'prop-types';
import { Modal } from 'reactstrap';
import styles from './MembersProgress.module.scss';
import TableHeader from '../common/TableHeader/TableHeader';
import Preloader from '../common/Preloader/Preloader';
import MemberProgressData from './MemberProgressData';
import { memberProgressTitle } from '../../constants';
import TaskPage from '../TaskPage/TaskPage';
import { setCurrentTask } from '../../redux/reducers/appReducer';
import { showTaskPage } from '../../redux/reducers/taskPageReducer';

const MemberProgres = ({
  userId,
  currentTaskId,
  role,
  currentUserFirstName,
  currentUserLastName,
  taskPageIsVisible,
  userTasks,
  isFetching,
  setCurrentTask,
  showTaskPage,
}) => {
  const createTask = (e) => {
    const { taskid } = e.target.dataset;
    setCurrentTask(taskid);
    showTaskPage(true);
  };

  const hideMemberPage = () => {
    showTaskPage(false);
  };

  const isAdmin = role === 'admin';
  const isMentor = role === 'mentor';

  if (!(isAdmin || isMentor)) {
    return <p>Only admininstrators and mentors have acces to this page</p>;
  }

  if (isFetching) {
    return <Preloader />;
  }
  if (userTasks && !userTasks.length && !isFetching) {
    return <p>{`${currentUserFirstName} ${currentUserLastName} hasn't tracked tasks.`}</p>;
  }
  const tasksArray = userTasks
    ? userTasks.map((task, index) => (
        <MemberProgressData
          key={task.taskId}
          index={index}
          taskId={task.taskId}
          taskName={task.name}
          trackNote={task.trackNote}
          trackDate={task.trackDate}
          createTask={createTask}
        />
      ))
    : null;

  if (isFetching) {
    return <Preloader />;
  }
  return (
    <>
      <Modal isOpen={taskPageIsVisible} toggle={hideMemberPage}>
        <TaskPage userId={userId} taskId={currentTaskId} hideMemberPage={hideMemberPage} />
      </Modal>

      <h1 className={styles.title}>Member Progress Grid</h1>
      <h2 className={styles.subtitle}>{`${currentUserFirstName} ${currentUserLastName} progress:`}</h2>
      <table>
        <TableHeader titleArray={memberProgressTitle} />
        <tbody>{tasksArray}</tbody>
      </table>
    </>
  );
};

const mapStateToProps = (state) => {
  const { currentUserId, isFetching, currentTaskId } = state.app;
  const { role } = state.auth;
  const { taskPageIsVisible } = state.taskPage;
  const { currentUserFirstName, currentUserLastName, userTasks } = state.memberProgress;
  return {
    currentUserId,
    isFetching,
    currentTaskId,
    role,
    currentUserFirstName,
    currentUserLastName,
    taskPageIsVisible,
    userTasks,
  };
};

MemberProgres.propTypes = {
  role: PropTypes.string,
  userId: PropTypes.string,
  currentTaskId: PropTypes.string.isRequired,
  setCurrentTask: PropTypes.func.isRequired,
  currentUserFirstName: PropTypes.string,
  currentUserLastName: PropTypes.string,
  taskPageIsVisible: PropTypes.bool.isRequired,
  userTasks: PropTypes.arrayOf(PropTypes.instanceOf(object)),
  isFetching: PropTypes.bool.isRequired,
  showTaskPage: PropTypes.func.isRequired,
};

MemberProgres.defaultProps = {
  role: '',
  userId: '',
  currentUserFirstName: '',
  currentUserLastName: '',
  userTasks: [{}],
};

export default connect(mapStateToProps, { setCurrentTask, showTaskPage })(MemberProgres);
