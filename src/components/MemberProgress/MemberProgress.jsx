import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Modal } from 'reactstrap';
import styles from './MembersProgress.module.scss';
import TableHeader from '../common/TableHeader/TableHeader';
import Preloader from '../common/Preloader/Preloader';
import MemberProgressData from './MemberProgressData';
import { memberProgressTitle } from '../../constants';
import { setCurrentTask } from '../../redux/reducers/appReducer';
import { showTaskPage } from '../../redux/reducers/taskPageReducer';
import TaskPageContainer from '../TaskPage/TaskPageContainer';
import showToast from '../../helpers/showToast';

const MemberProgres = ({
  role,
  currentUserFirstName,
  currentUserLastName,
  taskPageIsVisible,
  userTasks,
  isFetching,
  setCurrentTask,
  showTaskPage,
  message,
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

  if (message) {
    showToast(message);
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
        <TaskPageContainer hideMemberPage={hideMemberPage} />
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

const mapStateToProps = ({ app, auth, taskPage }) => {
  const {
    currentUserId,
    isFetching,
    currentTaskId,
    currentUserFirstName,
    currentUserLastName,
    userTasks,
    message,
  } = app;
  const { role } = auth;
  const { taskPageIsVisible } = taskPage;

  return {
    currentUserId,
    isFetching,
    currentTaskId,
    role,
    currentUserFirstName,
    currentUserLastName,
    taskPageIsVisible,
    userTasks,
    message,
  };
};

MemberProgres.propTypes = {
  role: PropTypes.string,
  setCurrentTask: PropTypes.func.isRequired,
  currentUserFirstName: PropTypes.string,
  currentUserLastName: PropTypes.string,
  taskPageIsVisible: PropTypes.bool,
  userTasks: PropTypes.arrayOf(PropTypes.shape({ subProp: PropTypes.string })),
  isFetching: PropTypes.bool.isRequired,
  showTaskPage: PropTypes.func.isRequired,
  message: PropTypes.node,
};

MemberProgres.defaultProps = {
  role: '',
  currentUserFirstName: '',
  currentUserLastName: '',
  userTasks: null,
  taskPageIsVisible: false,
  message: null,
};

export default connect(mapStateToProps, { setCurrentTask, showTaskPage })(MemberProgres);
