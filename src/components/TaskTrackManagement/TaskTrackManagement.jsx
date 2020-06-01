import React from 'react';
import PropTypes from 'prop-types';
import styles from './TaskTrackManagement.module.scss';
import TableHeader from '../common/TableHeader/TableHeader';
import { tasksTrackTitle } from '../../constants';
import Preloader from '../common/Preloader/Preloader';
import TasksTracksManagementRow from './TaskTrackManagementRow';
import TaskTrack from '../TaskTrack/TaskTrack';
import firebaseTrueApi from '../../api/firebaseTrueApi';
import dateToString from '../../helpers/dateToString';

class TasksTracks extends React.Component {
  state = {
    currentTaskTrackId: null,
    currentUserTaskId: null,
    currentTaskName: null,
    trackData: null,
    taskTrackPageIsVisible: false,
  };

  componentDidMount() {
    const { userId } = this.props;
    const trackData = [];
    if (userId !== 'newMember') {
      return firebaseTrueApi
        .getUserTaskList(userId)
        .then((tracks) => {
          tracks.forEach((track) => {
            const { userTaskId } = track;
            return firebaseTrueApi.getTrackData(userTaskId).then((trackInfo) => {
              if (trackInfo) {
                trackData.push(...trackInfo);
              }
            });
          });
        })
        .then(() => {
          setTimeout(() => {
            this.setState({ trackData });
          }, 1000);
        })

        .catch((error) => console.error('Track info receiving error', error));
    }
  }

  editTask = (e) => {
    // const { setCurrentTask, setCurrentUser } = this.props;
    // setCurrentTask(e);
    // setCurrentUser(e);
    e.persist();
    debugger;
    const currentTaskTrackId = e.target.dataset.taskid;
    const currentTaskName = e.target.dataset.name;
    const currentUserTaskId = e.target.dataset.id;
    this.setState({ currentTaskTrackId, currentTaskName, currentUserTaskId, taskTrackPageIsVisible: true });
  };

  hideTaskTrackPage = () => {
    this.setState({ taskTrackPageIsVisible: false });
  };

  render() {
    const { trackData, taskTrackPageIsVisible, currentUserTaskId, currentTaskTrackId, currentTaskName } = this.state;
    const tableRows = trackData
      ? trackData.map((task, index) => {
          return (
            <TasksTracksManagementRow
              index={index + 1}
              userTaskId={task.userTaskId}
              taskName={task.name}
              taskTrackId={task.taskTrackId}
              trackNote={task.trackNote}
              trackDate={dateToString(task.trackDate)}
              editTask={this.editTask}
            />
          );
        })
      : null;
    if (!trackData) {
      return <Preloader />;
    }
    return (
      <>
        {taskTrackPageIsVisible && (
          <TaskTrack
            userTaskId={currentUserTaskId}
            taskTrackId={currentTaskTrackId}
            taskName={currentTaskName}
            hideTaskTrackPage={this.hideTaskTrackPage}
          />
        )}
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
  setCurrentUser: PropTypes.func.isRequired,
  setCurrentTask: PropTypes.func.isRequired,
};

export default TasksTracks;
