import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, ModalBody } from 'reactstrap';
import styles from './MembersTasks.module.scss';
import TableHeader from '../common/TableHeader/TableHeader';
import Preloader from '../common/Preloader/Preloader';
import MemberCurrentTasks from './MemberCurrentTasks';
import { membersTasksTitle, membersTasksTitleForMembers } from '../../constants';
import firebaseApi from '../../api/firebaseApi';
import TaskTrack from '../TaskTrack/TaskTrack';

class MemberTasks extends Component {
  state = {
    currentTaskName: null,
    currentUserTaskId: null,
    taskData: [],
    firstName: null,
    lastName: null,
    taskTrackPageIsVisible: false,
    isFetching: false,
  };

  componentDidMount() {
    const { userId } = this.props;
    if (userId) {
      this.setState({ isFetching: true });
      firebaseApi.getUserInfo(userId).then((userInfo) => {
        const { firstName, lastName } = userInfo;
        this.setState({ firstName, lastName });
      });

      firebaseApi.getUserTaskList(userId).then((taskData) => {
        this.setState({ taskData, isFetching: false });
      });
    }
  }

  trackTask = (e) => {
    e.persist();
    const currentUserTaskId = e.target.dataset.taskid;
    const currentTaskName = e.target.dataset.id;
    this.setState({ currentTaskName, currentUserTaskId, taskTrackPageIsVisible: true });
  };

  hideTaskTrackPage = () => {
    this.setState({ taskTrackPageIsVisible: false });
  };

  render() {
    const { role } = this.props;
    const {
      taskData,
      firstName,
      lastName,
      isFetching,
      taskTrackPageIsVisible,
      currentUserTaskId,
      currentTaskName,
    } = this.state;

    if (isFetching) {
      return <Preloader />;
    }

    if (!taskData.length) {
      return (
        <p>
          {role === 'member' && 'You '}
          {(role === 'admin' || role === 'mentor') && `${firstName} ${lastName} `}
          haven&apos;t tasks
        </p>
      );
    }
    const tasksArr = taskData.map((task, index) => {
      return (
        <MemberCurrentTasks
          key={task.userTaskId}
          index={index}
          userTaskId={task.userTaskId}
          taskName={task.name}
          startDate={task.startDate}
          deadlineDate={task.deadlineDate}
          stateName={task.stateName}
          trackTask={this.trackTask}
          stateId={task.stateId}
          role={role}
        />
      );
    });

    return (
      <>
        <Modal isOpen={taskTrackPageIsVisible} toggle={this.hideTaskTrackPage}>
          <ModalBody>
            <TaskTrack
              userTaskId={currentUserTaskId}
              taskName={currentTaskName}
              hideTaskTrackPage={this.hideTaskTrackPage}
            />
          </ModalBody>
        </Modal>
        <h1 className={styles.title}>Member&apos;s Task Manage Grid</h1>
        {role === 'member' && (
          <h2 className={styles.subtitle}>{`Hi, dear ${firstName} ${lastName}! This is your current tasks:`}</h2>
        )}
        {(role === 'admin' || role === 'mentor') && (
          <h2 className={styles.subtitle}>{`Сurrent tasks of ${firstName} ${lastName}:`}</h2>
        )}
        <table>
          <thead>
            <tr>
              <TableHeader
                titleArray={role === 'admin' || role === 'mentor' ? membersTasksTitle : membersTasksTitleForMembers}
              />
            </tr>
          </thead>
          <tbody>{tasksArr}</tbody>
        </table>
      </>
    );
  }
}

MemberTasks.propTypes = {
  role: PropTypes.string,
  userId: PropTypes.string,
};

MemberTasks.defaultProps = {
  role: '',
  userId: '',
};

export default MemberTasks;
