import React from 'react';
import { NavLink } from 'react-router-dom';

import styles from './TaskManagement.module.scss';
import TableHeader from '../common/TableHeader/TableHeader';
import TasksPage from '../TaskPage/TaskPage';
import { taskManagementTitle } from '../../constants';
import TaskData from './TaskData';
import firebaseApi from '../../api/firebaseApi';
import Preloader from '../common/Preloader/Preloader';
import dateToString from '../common/dateToString';
import Button from '../Button/Button';

class taskManagement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: null,
    };
  }

  componentDidMount() {
    firebaseApi.getTaskList().then((tasks) => this.setState({ tasks }));
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
          <Button id={styles.createTask} taskId='newTask' buttonText='Create task' onClick={this.createTask} />
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

export default taskManagement;
