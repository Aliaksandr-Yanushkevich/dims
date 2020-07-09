import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './MembersProgress.module.scss';
import TableHeader from '../common/TableHeader/TableHeader';
import Preloader from '../common/Preloader/Preloader';
import MemberProgressData from './MemberProgressData';
import { memberProgressTitle } from '../../constants';
import TaskPage from '../TaskPage/TaskPage';
import firebaseApi from '../../api/firebaseApi';

class MemberProgres extends Component {
  state = {
    firstName: null,
    lastName: null,
    taskPageIsVisible: false,
    taskData: [],
    isFetching: false,
  };

  componentDidMount() {
    const { userId, role } = this.props;

    if (userId && role !== 'member') {
      this.setState({ isFetching: true });

      firebaseApi.getUserInfo(userId).then((userInfo) => {
        const { firstName, lastName } = userInfo;
        this.setState({ firstName, lastName });
      });

      firebaseApi.getUserTaskList(userId).then((taskData) => {
        this.setState(() => ({ taskData, isFetching: false }));
      });
    }
  }

  createTask = (e) => {
    const { setCurrentTask } = this.props;
    setCurrentTask(e);
    this.setState({ taskPageIsVisible: true });
  };

  hideMemberPage = () => {
    this.setState({ taskPageIsVisible: false });
  };

  render() {
    const { firstName, lastName, taskPageIsVisible, taskData, isFetching } = this.state;
    const { userId, currentTaskId, role } = this.props;
    const isAdmin = role === 'admin';
    const isMentor = role === 'mentor';

    if (!(isAdmin || isMentor)) {
      return <p>Only admininstrators and mentors have acces to this page</p>;
    }

    if (isFetching) {
      return <Preloader />;
    }
    if (!taskData.length && !isFetching) {
      return <p>{`${firstName} ${lastName} hasn't tracked tasks.`}</p>;
    }
    const tasksArray = taskData.map((task, index) => (
      <MemberProgressData
        key={task.taskId}
        index={index}
        taskId={task.taskId}
        taskName={task.name}
        trackNote={task.trackNote}
        trackDate={task.trackDate}
        createTask={this.createTask}
      />
    ));
    return (
      <>
        {taskPageIsVisible && <TaskPage userId={userId} taskId={currentTaskId} hideMemberPage={this.hideMemberPage} />}
        <h1 className={styles.title}>Member Progress Grid</h1>
        <h2 className={styles.subtitle}>{`${firstName} ${lastName} progress:`}</h2>
        <table>
          <tbody>
            <tr>
              <TableHeader titleArray={memberProgressTitle} />
            </tr>
            {tasksArray}
          </tbody>
        </table>
      </>
    );
  }
}

MemberProgres.propTypes = {
  role: PropTypes.string,
  userId: PropTypes.string,
  currentTaskId: PropTypes.string.isRequired,
  setCurrentTask: PropTypes.func.isRequired,
};

MemberProgres.defaultProps = {
  role: '',
  userId: '',
};

export default MemberProgres;
