import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './MembersTasks.module.scss';
import TableHeader from '../common/TableHeader/TableHeader';
import Preloader from '../common/Preloader/Preloader';
import MemberCurrentTasks from './MemberCurrentTasks';
import { membersTasksTitle } from '../../constants';
import firebaseApi from '../../api/firebaseApi';
import TaskTrack from '../TaskTrack/TaskTrack';

class MemberTasks extends Component {
  state = {
    tasks: null,
    firstName: null,
    lastName: null,
    taskTrackPageIsVisible: false,
  };

  componentDidMount() {
    const { userId } = this.props;
    if (userId) {
      firebaseApi
        .getUserTasks(userId)
        .then(({ tasks, firstName, lastName }) =>
          this.setState({
            tasks,
            firstName,
            lastName,
          }),
        )
        .catch((error) => {
          console.error(`Error receiving data: ${error}`);
        });
    }
  }

  editTask = (e) => {
    const { setCurrentTask } = this.props;
    setCurrentTask(e);
    this.setState({ taskTrackPageIsVisible: true });
  };

  hideTaskTrackPage = () => {
    this.setState({ taskTrackPageIsVisible: false });
  };

  render() {
    const { tasks, firstName, lastName, taskTrackPageIsVisible } = this.state;
    const { userId, taskId } = this.props;
    if (!tasks) return <Preloader />;
    const tasksArr = tasks.map((task) => (
      <MemberCurrentTasks
        taskId={task.taskId}
        taskName={task.taskName}
        startDate={task.startDate.toDate()}
        deadLineDate={task.deadLineDate.toDate()}
        editTask={this.editTask}
      />
    ));
    return (
      <>
        {taskTrackPageIsVisible && (
          <TaskTrack
            userId={userId}
            taskId={taskId}
            setCurrentTask={this.setCurrentTask}
            setCurrentUser={this.setCurrentUser}
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
  taskId: PropTypes.string,
  setCurrentTask: PropTypes.func.isRequired,
};
MemberTasks.defaultProps = { userId: '', taskId: '' };

export default MemberTasks;
