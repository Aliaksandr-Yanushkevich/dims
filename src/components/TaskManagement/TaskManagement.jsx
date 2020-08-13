import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Modal } from 'reactstrap';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from '../common/Button/Button';
import styles from './TaskManagement.module.scss';
import TableHeader from '../common/TableHeader/TableHeader';
import TaskData from './TaskData';
import firebaseApi from '../../api/firebaseApi';
import Preloader from '../common/Preloader/Preloader';
import dateToString from '../../helpers/dateToString';
import { showTaskPage, clearTaskPage, showTaskCard } from '../../redux/reducers/taskPageIndex';
import { setCurrentTask } from '../../redux/reducers/appIndex';
import TaskPageContainer from '../TaskPage/TaskPageContainer';
import showToast from '../../helpers/showToast';
import DeleteConfirmation from '../common/DeleteConfirmation/DeleteConfirmation';
import { showDeleteConfirmation, setParameters, setFunction } from '../../redux/reducers/deleteConfirmationIndex';
import TaskCardContainer from '../TaskCard/TaskCardContainer';
import TableHeaderCell from '../common/TableHeaderCell/TableHeaderCell';

const TaskManagement = ({
  setCurrentTask,
  taskPageIsVisible,
  showTaskPage,
  role,
  taskList,
  clearTaskPage,
  message,
  deleteConfirmationIsVisible,
  taskCardIsVisible,
  showDeleteConfirmation,
  setParameters,
  setFunction,
  showTaskCard,
}) => {
  const newTask = (e) => {
    const taskId = e.target.dataset.taskid;
    setCurrentTask(taskId);
    showTaskPage(true);
  };

  const deleteTask = (e) => {
    const taskId = e.target.dataset.taskid;
    setParameters(taskId);
    setFunction(firebaseApi.deleteTask);
    showDeleteConfirmation(true);
  };

  const hideDeleteConfirmation = () => {
    showDeleteConfirmation(false);
  };

  const hideMemberPage = () => {
    clearTaskPage();
    showTaskPage(false);
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
  const taskRows = taskList
    ? taskList.map((task, index) => {
        const { name, startDate, deadlineDate, taskId } = task;
        const start = dateToString(startDate);
        const deadline = dateToString(deadlineDate);
        return (
          <TaskData
            key={taskId}
            index={index}
            taskName={name}
            startDate={start}
            deadline={deadline}
            taskId={taskId}
            newTask={newTask}
            deleteTask={deleteTask}
            showTask={showTask}
          />
        );
      })
    : null;

  if (!(isAdmin || isMentor)) {
    return <p>Only admininstrators and mentors have acces to this page</p>;
  }
  if (!taskList) {
    return <Preloader />;
  }

  if (message) {
    showToast({ message, messageType: 'warning' });
  }

  return (
    <>
      <ToastContainer />
      <Modal isOpen={taskCardIsVisible} toggle={hideTaskCard} centered>
        <TaskCardContainer hideTaskCard={hideTaskCard} />
      </Modal>
      <Modal isOpen={deleteConfirmationIsVisible} toggle={hideDeleteConfirmation} centered>
        <DeleteConfirmation hideDeleteConfirmation={hideDeleteConfirmation}>
          Are you sure to delete this task?
        </DeleteConfirmation>
      </Modal>
      <Modal id={styles.modalTaskPage} isOpen={taskPageIsVisible} toggle={hideMemberPage} centered>
        <TaskPageContainer hideMemberPage={hideMemberPage} />
      </Modal>
      <h1 className={styles.title}>Task management</h1>
      <div className={styles.tableWrapper}>
        <Button className={`${styles.defaultButton} ${styles.createTask}`} taskId='newTask' onClick={newTask}>
          Create task
        </Button>
        <table>
          <TableHeader>
            <TableHeaderCell title='#' className={styles.taskManagementIndexHeader} />
            <TableHeaderCell title='task name' className={styles.taskManagementTaskNameHeader} />
            <TableHeaderCell title='start' className={styles.taskManagementStartDateHeader} />
            <TableHeaderCell title='deadline' className={styles.taskManagementDeadlineHeader} />
            <TableHeaderCell title='' className={styles.taskManagementPanelHeader} />
          </TableHeader>
          <tbody>{taskRows}</tbody>
        </table>
      </div>
    </>
  );
};

const mapStateToProps = ({ taskManagement, taskPage, auth, deleteConfirmation }) => {
  const { taskList, message } = taskManagement;
  const { taskPageIsVisible, taskCardIsVisible } = taskPage;
  const { role } = auth;
  const { deleteConfirmationIsVisible, params, func } = deleteConfirmation;
  return { taskList, taskPageIsVisible, role, message, deleteConfirmationIsVisible, params, func, taskCardIsVisible };
};

TaskManagement.propTypes = {
  setCurrentTask: PropTypes.func.isRequired,
  showTaskPage: PropTypes.func.isRequired,
  clearTaskPage: PropTypes.func.isRequired,
  role: PropTypes.string,
  taskList: PropTypes.arrayOf(PropTypes.shape({ subProp: PropTypes.string })),
  taskPageIsVisible: PropTypes.bool.isRequired,
  showDeleteConfirmation: PropTypes.func.isRequired,
  setParameters: PropTypes.func.isRequired,
  setFunction: PropTypes.func.isRequired,
  deleteConfirmationIsVisible: PropTypes.bool.isRequired,
  message: PropTypes.string,
  taskCardIsVisible: PropTypes.bool.isRequired,
  showTaskCard: PropTypes.func.isRequired,
};

TaskManagement.defaultProps = {
  role: '',
  taskList: [],
  message: null,
};

export default connect(mapStateToProps, {
  showTaskPage,
  setCurrentTask,
  clearTaskPage,
  showDeleteConfirmation,
  setParameters,
  setFunction,
  showTaskCard,
})(TaskManagement);
