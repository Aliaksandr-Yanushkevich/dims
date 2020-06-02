import React from 'react';
import PropTypes from 'prop-types';
import styles from './TaskManagement.module.scss';
import TableHeader from '../common/TableHeader/TableHeader';
import TasksPage from '../TaskPage/TaskPage';
import { taskManagementTitle } from '../../constants';
import TaskData from './TaskData';
import firebaseApi from '../../api/firebaseApi';
import Preloader from '../common/Preloader/Preloader';
import dateToString from '../../helpers/dateToString';
import Button from '../Button/Button';

class TaskManagement extends React.Component {
  state = {
    tasks: null,
    taskPageIsVisible: false,
  };

  componentDidMount() {
    const tasks = [];
    firebaseApi
      .getTaskList()
      .then((tasksList) => {
        tasksList.forEach((task) => {
          const { name, startDate, deadlineDate, taskId } = task.data();
          tasks.push({ name, startDate: startDate.toDate(), deadlineDate: deadlineDate.toDate(), taskId });
        });
        this.setState({ tasks });
      })
      .catch((error) => {
        console.error(`Error receiving data: ${error}`);
      });
  }

  newTask = (e) => {
    const { setCurrentTask } = this.props;
    setCurrentTask(e);
    this.setState({ taskPageIsVisible: true });
  };

  deleteTask = (e) => {
    const taskId = e.target.dataset.taskid;
    firebaseApi
      .deleteTask(taskId)
      .then(() => console.log('Task is removed successfully'))
      .catch((error) => console.error('Problem with removing task', error));
  };

  hideMemberPage = () => {
    this.setState({ taskPageIsVisible: false });
  };

  render() {
    const { tasks, taskPageIsVisible } = this.state;
    const { currentTaskId } = this.props;
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
          {taskPageIsVisible && <TasksPage taskId={currentTaskId} hideMemberPage={this.hideMemberPage} />}
          <Button id={styles.createTask} taskId='newTask' onClick={this.newTask}>
            Create task
          </Button>
          <table>
            <thead>
              <tr>
                <TableHeader titleArray={taskManagementTitle} />
              </tr>
            </thead>
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
};

TaskManagement.defaultProps = {
  currentTaskId: '',
};

export default TaskManagement;
