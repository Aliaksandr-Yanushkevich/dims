import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Modal } from 'reactstrap';
import Button from '../common/Button/Button';
import styles from './TaskManagement.module.scss';
import TableHeader from '../common/TableHeader/TableHeader';
import { taskManagementTitle } from '../../constants';
import TaskData from './TaskData';
import firebaseApi from '../../api/firebaseApi';
import Preloader from '../common/Preloader/Preloader';
import dateToString from '../../helpers/dateToString';
import { showTaskPage, clearUserTasks } from '../../redux/reducers/taskPageReducer';
import { setCurrentTask } from '../../redux/reducers/appReducer';
import TaskPageContainer from '../TaskPage/TaskPageContainer';

const TaskManagement = ({ setCurrentTask, taskPageIsVisible, showTaskPage, role, taskList, clearUserTasks }) => {
  const newTask = (e) => {
    const taskId = e.target.dataset.taskid;
    setCurrentTask(taskId);
    showTaskPage(true);
  };

  const deleteTask = (e) => {
    const taskId = e.target.dataset.taskid;
    firebaseApi.deleteTask(taskId);
  };

  const hideMemberPage = () => {
    clearUserTasks();
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

  return (
    <>
      <h1 className={styles.title}>Task management</h1>
      <div className={styles.tableWrapper}>
        <Modal isOpen={taskPageIsVisible} toggle={hideMemberPage}>
          <TaskPageContainer hideMemberPage={hideMemberPage} />
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
  const { taskList } = state.taskManagement;
  const { taskPageIsVisible } = state.taskPage;
  const { role } = state.auth;

  return { taskList, taskPageIsVisible, role };
};

TaskManagement.propTypes = {
  setCurrentTask: PropTypes.func.isRequired,
  showTaskPage: PropTypes.func.isRequired,
  clearUserTasks: PropTypes.func.isRequired,
  role: PropTypes.string,
  taskList: PropTypes.arrayOf(PropTypes.shape({ subProp: PropTypes.string })),
  taskPageIsVisible: PropTypes.bool.isRequired,
};

TaskManagement.defaultProps = {
  role: '',
  taskList: [],
};

export default connect(mapStateToProps, { showTaskPage, setCurrentTask, clearUserTasks })(TaskManagement);
