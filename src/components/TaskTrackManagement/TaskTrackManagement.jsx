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

  render() {
    const { tasks } = this.state;
    const { userId, taskId, setCurrentUser, setCurrentTask, taskTrackPageIsVisible, show } = this.props;
    const tableRows = tasks
      ? tasks.map((task, index) => {
          return (
            <TasksTracksManagementRow
              index={index}
              taskName={task.taskName}
              userId={userId}
              taskId={task.taskId}
              setCurrentUser={setCurrentUser}
              setCurrentTask={setCurrentTask}
              show={show}
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
          <TaskTrack
            userId={userId}
            taskId={taskId}
            setCurrentTask={this.setCurrentTask}
            setCurrentUser={this.setCurrentUser}
            show={show}
          />
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
  taskTrackPageIsVisible: PropTypes.bool.isRequired,
  show: PropTypes.func.isRequired,
};

TasksTracks.defaultProps = {
  taskId: '',
};

export default TasksTracks;
