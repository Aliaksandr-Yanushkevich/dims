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
  constructor() {
    super();
    this._isMounted = false;
    this.state = {
      firstName: null,
      lastName: null,
      taskPageIsVisible: false,
      taskData: null,
    };
  }

  componentDidMount() {
    // this property is attempt to fix memory leak. there is problem with setState taskData https://qna.habr.com/q/605261
    // setTimeout on 51 line is other workaround - but this aproach fixes problem
    this._isMounted = true;

    const { userId } = this.props;
    const taskData = [];
    if (userId) {
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
          taskList.forEach((task) => {
            const { taskId, userTaskId, stateId } = task;
            firebaseApi.getUserTaskData(taskId, userTaskId, stateId).then((taskInfo) => {
              taskData.push(taskInfo);
            });
          });
        })
        .then(() => {
          if (this._isMounted) {
            console.log(taskData.length);
            setTimeout(() => {
              // workaround
              this.setState({ taskData });
              console.log(taskData.length);
            }, 2000);
          }
        })
        .catch((error) => {
          console.error(`Error receiving data: ${error}`);
        });
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
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
    const { firstName, lastName, taskPageIsVisible, taskData } = this.state;
    const { userId, currentTaskId } = this.props;
    if (!taskData) {
      return <Preloader />;
    }
    const tasksArray = taskData.map((task, index) => {
      return (
        <MemberProgressData
          key={task.taskId}
          index={index}
          taskId={task.taskId}
          taskName={task.name}
          trackNote={task.trackNote}
          trackDate={task.trackDate}
          createTask={this.createTask}
        />
      );
    });
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
  userId: PropTypes.string.isRequired,
  currentTaskId: PropTypes.string.isRequired,
  setCurrentTask: PropTypes.func.isRequired,
};

export default MemberProgres;
