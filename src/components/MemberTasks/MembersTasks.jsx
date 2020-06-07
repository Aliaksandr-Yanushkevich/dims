import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './MembersTasks.module.scss';
import TableHeader from '../common/TableHeader/TableHeader';
import Preloader from '../common/Preloader/Preloader';
import MemberCurrentTasks from './MemberCurrentTasks';
import { membersTasksTitle, membersTasksTitleForMembers } from '../../constants';
import TaskTrack from '../TaskTrack/TaskTrack';
import firebaseApi from '../../api/firebaseApi';

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
      firebaseApi
        .getUserInfo(userId)
        .then((userInfo) => {
          const { firstName, lastName } = userInfo.data();
          this.setState({ firstName, lastName });
        })
        .catch((error) => {
          console.error(`Error receiving data: ${error}`);
        });

      firebaseApi
        .getUserTaskList(userId)
        .then((taskList) => {
          if (taskList.length) {
            taskList.forEach((task) => {
              const { taskId, userTaskId, stateId } = task;
              firebaseApi.getUserTaskData(taskId, userTaskId, stateId).then((taskInfo) => {
                if (taskInfo) {
                  this.setState(({ taskData }) => ({ taskData: [...taskData, taskInfo] }));
                  this.setState({ isFetching: false });
                }
              });
            });
          } else {
            this.setState({ isFetching: false });
          }
        })
        .catch((error) => {
          console.error(`Error receiving data: ${error}`);
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
      taskTrackPageIsVisible,
      currentTaskName,
      currentUserTaskId,
      isFetching,
    } = this.state;

    if (isFetching) return <Preloader />;

    if (!taskData.length) {
      return (
        <p>
          {role === 'member' && 'You '}
          {(role === 'admin' || role === 'mentor') && `${firstName} ${lastName} `}
          haven&apos;t tasks
        </p>
      );
    }
    const tasksArr = taskData.map((task, index) => (
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
    ));

    return (
      <>
        {taskTrackPageIsVisible && (
          <TaskTrack
            userTaskId={currentUserTaskId}
            taskName={currentTaskName}
            hideTaskTrackPage={this.hideTaskTrackPage}
          />
        )}
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
