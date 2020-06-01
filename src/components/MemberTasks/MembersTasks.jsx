import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './MembersTasks.module.scss';
import TableHeader from '../common/TableHeader/TableHeader';
import Preloader from '../common/Preloader/Preloader';
import MemberCurrentTasks from './MemberCurrentTasks';
import { membersTasksTitle } from '../../constants';
import TaskTrack from '../TaskTrack/TaskTrack';
import firebaseTrueApi from '../../api/firebaseTrueApi';

class MemberTasks extends Component {
  state = {
    currentTaskName: null,
    currentUserTaskId: null,
    taskData: null,
    firstName: null,
    lastName: null,
    taskTrackPageIsVisible: false,
  };

  componentDidMount() {
    const { userId } = this.props;
    const taskData = [];
    if (userId) {
      firebaseTrueApi
        .getUserInfo(userId)
        .then((userInfo) => {
          const { firstName, lastName } = userInfo.data();
          this.setState({ firstName, lastName });
        })
        .catch((error) => {
          console.error(`Error receiving data: ${error}`);
        });

      firebaseTrueApi
        .getUserTaskList(userId)
        .then((taskList) => {
          taskList.forEach((task) => {
            const { taskId, userTaskId, stateId } = task;
            firebaseTrueApi.getUserTaskData(taskId, userTaskId, stateId).then((taskInfo) => {
              taskData.push(taskInfo);
            });
          });
        })
        .then(() => {
          setTimeout(() => {
            // workaround
            console.log(taskData);
            this.setState({ taskData });
          }, 1000);
        })
        .catch((error) => {
          console.error(`Error receiving data: ${error}`);
        });
    }
  }

  trackTask = (e) => {
    e.persist();
    debugger;
    const currentUserTaskId = e.target.dataset.taskid;
    const currentTaskName = e.target.dataset.id;
    this.setState({ currentTaskName, currentUserTaskId, taskTrackPageIsVisible: true });
  };

  hideTaskTrackPage = () => {
    this.setState({ taskTrackPageIsVisible: false });
  };

  render() {
    const { taskData, firstName, lastName, taskTrackPageIsVisible, currentTaskName, currentUserTaskId } = this.state;
    if (!taskData) return <Preloader />;
    const tasksArr = taskData.map((task, index) => (
      <MemberCurrentTasks
        index={index}
        userTaskId={task.userTaskId}
        taskName={task.name}
        startDate={task.startDate}
        deadlineDate={task.deadlineDate}
        stateName={task.stateName}
        trackTask={this.trackTask}
        stateId={task.stateId}
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
        <h2 className={styles.subtitle}>{`Hi, dear ${firstName} ${lastName}! This is your current tasks:`}</h2>
        <table>
          <tbody>
            <TableHeader titleArray={membersTasksTitle} />
            {tasksArr}
          </tbody>
        </table>
      </>
    );
  }
}

MemberTasks.propTypes = {
  userId: PropTypes.string,
  setCurrentTask: PropTypes.func.isRequired,
};
MemberTasks.defaultProps = { userId: '' };

export default MemberTasks;
