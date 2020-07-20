import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Modal } from 'reactstrap';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from '../common/Button/Button';
import styles from './TaskManagement.module.scss';
import TableHeader from '../common/TableHeader/TableHeader';
import { taskManagementTitle } from '../../constants';
import TaskData from './TaskData';
import firebaseApi from '../../api/firebaseApi';
import Preloader from '../common/Preloader/Preloader';
import dateToString from '../../helpers/dateToString';
import { showTaskPage, clearTaskPage } from '../../redux/reducers/taskPageReducer';
import { setCurrentTask } from '../../redux/reducers/appReducer';
import TaskPageContainer from '../TaskPage/TaskPageContainer';
import showToast from '../../helpers/showToast';
import DeleteConfirmation from '../common/DeleteConfirmation/DeleteConfirmation';
import { showDeleteConfirmation, setParameters, setFunction } from '../../redux/reducers/deleteConfirmationReducer';

const TaskManagement = ({
  setCurrentTask,
  taskPageIsVisible,
  showTaskPage,
  role,
  taskList,
  clearTaskPage,
  message,
  deleteConfirmationIsVisible,
  showDeleteConfirmation,
  setParameters,
  setFunction,
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
      <h1 className={styles.title}>Task management</h1>
      <div className={styles.tableWrapper}>
        <Modal id={styles.modalTaskPage} isOpen={taskPageIsVisible} toggle={hideMemberPage} centered>
          <TaskPageContainer hideMemberPage={hideMemberPage} />
        </Modal>

        <Modal isOpen={deleteConfirmationIsVisible} toggle={hideDeleteConfirmation} centered>
          <DeleteConfirmation hideDeleteConfirmation={hideDeleteConfirmation}>
            Are you sure to delete this task?
          </DeleteConfirmation>
        </Modal>

        <Button className={`${styles.defaultButton} ${styles.createTask}`} taskId='newTask' onClick={newTask}>
          Create task
        </Button>
        <table>
          <TableHeader titleArray={taskManagementTitle} />
          <tbody>{taskRows}</tbody>
        </table>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  const { taskList, message } = state.taskManagement;
  const { taskPageIsVisible } = state.taskPage;
  const { role } = state.auth;
  const { deleteConfirmationIsVisible, params, func } = state.deleteConfirmation;
  return { taskList, taskPageIsVisible, role, message, deleteConfirmationIsVisible, params, func };
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
})(TaskManagement);
