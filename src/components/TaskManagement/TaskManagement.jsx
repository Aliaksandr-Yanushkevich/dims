import React from 'react';
import PropTypes from 'prop-types';
import styles from './TaskManagement.module.scss';
import TableHeader from '../common/TableHeader/TableHeader';
import TasksPage from '../TaskPage/TaskPage';
import { taskManagementTitle } from '../../constants';
import TaskData from './TaskData';
import firebaseApi from '../../api/firebaseApi';
import Preloader from '../common/Preloader/Preloader';
import dateToString from '../common/dateToString';
import Button from '../Button/Button';

class TaskManagement extends React.Component {
  state = {
    tasks: null,
  };

  componentDidMount() {
    firebaseApi
      .getTaskList()
      .then((tasks) => this.setState({ tasks }))
      .catch((error) => console.error(`Error receiving data: ${error}`));
  }

  createTask = (e) => {
    const { setCurrentTask, showTask } = this.props;
    setCurrentTask(e);
    showTask(true);
  };

  render() {
    const { tasks } = this.state;
    const { setCurrentUser, setCurrentTask, userId, taskId, taskPageIsVisible, showTask } = this.props;
    if (!tasks) {
      return <Preloader />;
    }
    const taskRows = tasks
      ? tasks.map((task, index) => {
          const startDate = dateToString(task.startDate);
          const deadline = dateToString(task.deadLineDate);
          return (
            <TaskData
              index={index}
              taskName={task.taskName}
              startDate={startDate}
              deadline={deadline}
              taskId={task.taskId}
              userId={task.userId}
              setCurrentUser={setCurrentUser}
              setCurrentTask={setCurrentTask}
              showTask={showTask}
            />
          );
        })
      : null;

    return (
      <>
        <h1>Task management</h1>
        <div className={styles.tableWrapper}>
          {taskPageIsVisible ? <TasksPage userId={userId} taskId={taskId} showTask={showTask} /> : null}
          <Button id={styles.createTask} taskId='newTask' onClick={this.createTask}>
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
  showTask: PropTypes.func.isRequired,
  setCurrentUser: PropTypes.func.isRequired,
  userId: PropTypes.string,
  taskId: PropTypes.string,
  taskPageIsVisible: PropTypes.bool.isRequired,
};

TaskManagement.defaultProps = {
  userId: '',
  taskId: '',
};

export default TaskManagement;
