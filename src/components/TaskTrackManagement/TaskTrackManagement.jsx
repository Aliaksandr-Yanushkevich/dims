import React from 'react';
import PropTypes from 'prop-types';
import styles from './TaskTrackManagement.module.scss';
import TableHeader from '../common/TableHeader/TableHeader';
import { tasksTrackTitle } from '../../constants';
import Preloader from '../common/Preloader/Preloader';
import TasksTracksManagementRow from './TaskTrackManagementRow';
import TaskTrack from '../TaskTrack/TaskTrack';
import firebaseApi from '../../api/firebaseApi';
import dateToString from '../../helpers/dateToString';

class TasksTracks extends React.Component {
  state = {
    currentTaskTrackId: null,
    currentUserTaskId: null,
    currentTaskName: null,
    trackData: [],
    taskTrackPageIsVisible: false,
    isFetching: false,
  };

  componentDidMount() {
    const { userId, role } = this.props;
    if (userId && userId !== 'newMember' && role === 'member') {
      this.setState({ isFetching: true });
      return firebaseApi
        .getUserTaskList(userId)
        .then((tracks) => {
          if (tracks.length) {
            tracks.forEach((track) => {
              const { userTaskId } = track;
              return firebaseApi.getTrackData(userTaskId).then((trackInfo) => {
                if (trackInfo) {
                  this.setState(({ trackData }) => ({ trackData: [...trackData, ...trackInfo] }));
                  this.setState({ isFetching: false });
                }
                this.setState({ isFetching: false });
              });
            });
          } else {
            this.setState({ isFetching: false });
          }
        })
        .catch((error) => console.error('Track info receiving error', error));
    }
  }

  editTask = (e) => {
    e.persist();
    const currentTaskTrackId = e.target.dataset.taskid;
    const currentTaskName = e.target.dataset.name;
    const currentUserTaskId = e.target.dataset.id;
    this.setState({ currentTaskTrackId, currentTaskName, currentUserTaskId, taskTrackPageIsVisible: true });
  };

  deleteNote = (e) => {
    e.persist();
    const currentTaskTrackId = e.target.dataset.taskid;
    firebaseApi
      .deleteItemWithId('TaskTrack', currentTaskTrackId)
      .then(() => {
        console.log('Track note deleted successfully');
      })
      .catch((error) => {
        console.error('Problem with note removing', error);
      });
  };

  hideTaskTrackPage = () => {
    this.setState({ taskTrackPageIsVisible: false });
  };

  render() {
    const { role } = this.props;
    const {
      trackData,
      taskTrackPageIsVisible,
      currentUserTaskId,
      currentTaskTrackId,
      currentTaskName,
      isFetching,
    } = this.state;
    const tableRows = trackData.length
      ? trackData.map((task, index) => {
          return (
            <TasksTracksManagementRow
              key={task.taskTrackId}
              index={index + 1}
              userTaskId={task.userTaskId}
              taskTrackId={task.taskTrackId}
              trackNote={task.trackNote}
              trackDate={dateToString(task.trackDate)}
              editTask={this.editTask}
              deleteNote={this.deleteNote}
            />
          );
        })
      : null;

    if (role !== 'member') {
      return (
        <p>
          You do not have permission to view this page. This page is only available to users with the &apos;member&apos;
          role.
        </p>
      );
    }

    if (isFetching) {
      return <Preloader />;
    }
    if (!trackData.length && !isFetching) {
      return <p>You haven&apos;t track notes</p>;
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
  role: PropTypes.string.isRequired,
};

export default TasksTracks;
