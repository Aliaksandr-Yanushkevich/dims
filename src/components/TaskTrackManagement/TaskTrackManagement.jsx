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

class TaskTrackManagement extends React.Component {
  state = {
    currentTaskTrackId: null,
    currentUserTaskId: null,
    currentTaskName: null,
    trackData: null,
    taskTrackPageIsVisible: false,
    isFetching: false,
  };

  componentDidMount() {
    const { userId, role } = this.props;
    if (userId && userId !== 'newMember' && role === 'member') {
      this.setState({ isFetching: true });
      firebaseApi
        .getTrackDataArray(userId)
        .then((trackData) => {
          this.setState({ trackData });
        })
        .then(() => {
          this.setState({ isFetching: false });
        });
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
    firebaseApi.deleteItemWithId('TaskTrack', currentTaskTrackId);
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
    const tableRows = trackData
      ? trackData.map((task, index) => {
          return (
            <TasksTracksManagementRow
              key={task.taskTrackId}
              index={index + 1}
              taskName={task.taskName}
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
    if (!trackData && !isFetching) {
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

TaskTrackManagement.propTypes = {
  userId: PropTypes.string,
  role: PropTypes.string,
};

TaskTrackManagement.defaultProps = {
  userId: '',
  role: '',
};

export default TaskTrackManagement;
