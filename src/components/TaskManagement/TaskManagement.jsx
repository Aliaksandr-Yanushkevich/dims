import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'reactstrap';
import Button from '../common/Button/Button';
import styles from './TaskManagement.module.scss';
import TableHeader from '../common/TableHeader/TableHeader';
import TasksPage from '../TaskPage/TaskPage';
import { taskManagementTitle } from '../../constants';
import TaskData from './TaskData';
import firebaseApi from '../../api/firebaseApi';
import Preloader from '../common/Preloader/Preloader';
import dateToString from '../../helpers/dateToString';

class TaskManagement extends React.Component {
  state = {
    tasks: null,
    taskPageIsVisible: false,
  };

  componentDidMount() {
    const { role } = this.props;
    const isAdmin = role === 'admin';
    const isMentor = role === 'mentor';

    if (isAdmin || isMentor) {
      firebaseApi.getTaskList().then((tasks) => {
        this.setState({ tasks });
      });
    }
  }

  newTask = (e) => {
    const { setCurrentTask } = this.props;
    setCurrentTask(e);
    this.setState({ taskPageIsVisible: true });
  };

  deleteTask = (e) => {
    const taskId = e.target.dataset.taskid;
    firebaseApi.deleteTask(taskId);
  };

  hideMemberPage = () => {
    this.setState({ taskPageIsVisible: false });
  };

  render() {
    const { tasks, taskPageIsVisible } = this.state;
    const { currentTaskId, role } = this.props;
    const isAdmin = role === 'admin';
    const isMentor = role === 'mentor';

    if (!(isAdmin || isMentor)) {
      return <p>Only admininstrators and mentors have acces to this page</p>;
    }
    if (!tasks) {
      return <Preloader />;
    }
    const taskRows = tasks
      ? tasks.map((task, index) => {
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
              newTask={this.newTask}
              deleteTask={this.deleteTask}
            />
          );
        })
      : null;

    return (
      <>
        <h1 className={styles.title}>Task management</h1>
        <div className={styles.tableWrapper}>
          <Modal isOpen={taskPageIsVisible} toggle={this.hideMemberPage}>
            <TasksPage taskId={currentTaskId} hideMemberPage={this.hideMemberPage} />
          </Modal>
          <Button className={`${styles.defaultButton} ${styles.createTask}`} taskId='newTask' onClick={this.newTask}>
            Create task
          </Button>
          <table>
            <TableHeader titleArray={taskManagementTitle} />
            <tbody>{taskRows}</tbody>
          </table>
        </div>
      </>
    );
  }
}

TaskManagement.propTypes = {
  setCurrentTask: PropTypes.func.isRequired,
  currentTaskId: PropTypes.string,
  role: PropTypes.string,
};

TaskManagement.defaultProps = {
  currentTaskId: '',
  role: '',
};

export default TaskManagement;
