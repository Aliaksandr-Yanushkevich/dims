import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'reactstrap';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './TaskTrackManagement.module.scss';
import TableHeader from '../common/TableHeader/TableHeader';
import { tasksTrackTitle } from '../../constants';
import Preloader from '../common/Preloader/Preloader';
import TasksTracksManagementRow from './TaskTrackManagementRow';
import TaskTrack from '../TaskTrack/TaskTrack';
import firebaseApi from '../../api/firebaseApi';
import dateToString from '../../helpers/dateToString';
import showToast from '../../helpers/showToast';

class TaskTrackManagement extends React.Component {
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
    const isMember = role === 'member';

    if (userId && userId !== 'newMember' && isMember) {
      this.setState({ isFetching: true });
      firebaseApi.getTrackDataArray(userId).then((trackData) => {
        this.setState({ trackData, isFetching: false });
      });
    }
  }

  editTask = (e) => {
    e.persist();
    const { taskid, name, id } = e.target.dataset;

    this.setState({
      currentTaskTrackId: taskid,
      currentTaskName: name,
      currentUserTaskId: id,
      taskTrackPageIsVisible: true,
    });
  };

  deleteNote = (e) => {
    e.persist();
    const currentTaskTrackId = e.target.dataset.taskid;
    firebaseApi.deleteItemWithId('TaskTrack', currentTaskTrackId).then((result) => {
      showToast(result);
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
    if (trackData && !trackData.length) {
      return <p>You haven&apos;t track notes</p>;
    }
    return (
      <>
        <ToastContainer />
        <Modal isOpen={taskTrackPageIsVisible} toggle={this.hideTaskTrackPage}>
          <TaskTrack
            userTaskId={currentUserTaskId}
            taskTrackId={currentTaskTrackId}
            taskName={currentTaskName}
            hideTaskTrackPage={this.hideTaskTrackPage}
          />
        </Modal>
        <h1 className={styles.title}>Task Track Management</h1>
        <table>
          <TableHeader titleArray={tasksTrackTitle} />
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
