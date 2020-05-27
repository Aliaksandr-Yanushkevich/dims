import React from 'react';
import PropTypes from 'prop-types';
import styles from './TaskTrackManagement.module.scss';
import TableHeader from '../common/TableHeader/TableHeader';
import { tasksTrackTitle } from '../../constants';
import firebaseApi from '../../api/firebaseApi';
import Preloader from '../common/Preloader/Preloader';
import TasksTracksManagementRow from './TaskTrackManagementRow';
import TaskTrack from '../TaskTrack/TaskTrack';

class TasksTracks extends React.Component {
  state = {
    tasks: null,
    taskTrackPageIsVisible: false,
  };

  componentDidMount() {
    const { userId } = this.props;
    if (userId !== 'newMember') {
      firebaseApi
        .getUserTasks(userId)
        .then((response) => this.setState({ tasks: response.tasks }))
        .catch((error) => {
          console.error(`Error receiving data: ${error}`);
        });
    }
  }

  editTask = (e) => {
    const { setCurrentTask, setCurrentUser } = this.props;
    setCurrentTask(e);
    setCurrentUser(e);
    this.setState({ taskTrackPageIsVisible: true });
  };

  hideTaskTrackPage = () => {
    this.setState({ taskTrackPageIsVisible: false });
  };

  render() {
    const { tasks, taskTrackPageIsVisible } = this.state;
    const { userId, taskId } = this.props;
    const tableRows = tasks
      ? tasks.map((task, index) => {
          return (
            <TasksTracksManagementRow
              index={index}
              taskName={task.taskName}
              userId={userId}
              taskId={task.taskId}
              editTask={this.editTask}
            />
          );
        })
      : null;
    if (!tasks) {
      return <Preloader />;
    }
    return (
      <>
        {taskTrackPageIsVisible ? (
          <TaskTrack userId={userId} taskId={taskId} hideTaskTrackPage={this.hideTaskTrackPage} />
        ) : null}
        <h1 className={styles.title}>Task Track Management</h1>
        <table>
          <thead>
            <tr>
              <TableHeader titleArray={tasksTrackTitle} />
            </tr>
          </thead>
          <tbody>{tableRows}</tbody>
        </table>
      </>
    );
  }
}

TasksTracks.propTypes = {
  userId: PropTypes.string.isRequired,
  taskId: PropTypes.string,
  setCurrentUser: PropTypes.func.isRequired,
  setCurrentTask: PropTypes.func.isRequired,
};

TasksTracks.defaultProps = {
  taskId: '',
};

export default TasksTracks;
