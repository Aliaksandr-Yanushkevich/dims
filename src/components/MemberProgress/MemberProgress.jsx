import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Modal } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarMinus } from '@fortawesome/free-solid-svg-icons';
import styles from './MembersProgress.module.scss';
import TableHeader from '../common/TableHeader/TableHeader';
import Preloader from '../common/Preloader/Preloader';
import MemberProgressData from './MemberProgressData';
import { setCurrentTask } from '../../redux/reducers/appIndex';
import { showTaskCard } from '../../redux/reducers/taskPageIndex';
import showToast from '../../helpers/showToast';
import TaskCardContainer from '../TaskCard/TaskCardContainer';
import Message from '../common/Message/Message';
import TableHeaderCell from '../common/TableHeaderCell/TableHeaderCell';

const MemberProgres = ({
  role,
  currentUserFirstName,
  currentUserLastName,
  taskCardIsVisible,
  userTasks,
  isFetching,
  setCurrentTask,
  showTaskCard,
  message,
}) => {
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
    return (
      <Message
        text={`${currentUserFirstName} ${currentUserLastName} hasn't tracked tasks.`}
        icon={<FontAwesomeIcon icon={faCalendarMinus} />}
      />
    );
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
          showTask={showTask}
        />
      ))
    : null;

  if (isFetching) {
    return <Preloader />;
  }
  return (
    <>
      <Modal isOpen={taskCardIsVisible} toggle={hideTaskCard} centered>
        <TaskCardContainer hideTaskCard={hideTaskCard} />
      </Modal>

      <h1 className={styles.title}>Member Progress Grid</h1>
      <h2 className={styles.subtitle}>{`${currentUserFirstName} ${currentUserLastName} progress:`}</h2>
      <table>
        <TableHeader>
          <TableHeaderCell title='#' className={styles.taskIndexHeader} />
          <TableHeaderCell title='task' className={styles.taskNameHeader} />
          <TableHeaderCell title='note' className={styles.taskNoteHeader} icon='faGraduationCap' />
          <TableHeaderCell title='date' className={styles.taskNoteDateHeader} />
        </TableHeader>
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
  const { taskCardIsVisible } = taskPage;

  return {
    currentUserId,
    isFetching,
    currentTaskId,
    role,
    currentUserFirstName,
    currentUserLastName,
    taskCardIsVisible,
    userTasks,
    message,
  };
};

MemberProgres.propTypes = {
  role: PropTypes.string,
  setCurrentTask: PropTypes.func.isRequired,
  currentUserFirstName: PropTypes.string,
  currentUserLastName: PropTypes.string,
  taskCardIsVisible: PropTypes.bool.isRequired,
  userTasks: PropTypes.arrayOf(PropTypes.shape({ subProp: PropTypes.string })),
  isFetching: PropTypes.bool.isRequired,
  showTaskCard: PropTypes.func.isRequired,
  message: PropTypes.node,
};

MemberProgres.defaultProps = {
  role: '',
  currentUserFirstName: '',
  currentUserLastName: '',
  userTasks: null,
  message: null,
};

export default connect(mapStateToProps, { setCurrentTask, showTaskCard })(MemberProgres);
