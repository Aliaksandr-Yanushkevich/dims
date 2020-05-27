import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './MembersProgress.module.scss';
import TableHeader from '../common/TableHeader/TableHeader';
import Preloader from '../common/Preloader/Preloader';
import MemberProgressData from './MemberProgressData';
import { memberProgressTitle } from '../../constants';
import firebaseApi from '../../api/firebaseApi';
import TaskPage from '../TaskPage/TaskPage';

class MemberProgres extends Component {
  state = {
    tasks: null,
    firstName: null,
    lastName: null,
    taskPageIsVisible: false,
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

  createTask = (e) => {
    const { setCurrentTask } = this.props;
    setCurrentTask(e);
    this.setState({ taskPageIsVisible: true });
  };

  hideMemberPage = () => {
    this.setState({ taskPageIsVisible: false });
  };

  render() {
    const { tasks, firstName, lastName, taskPageIsVisible } = this.state;
    const { userId, taskId } = this.props;
    if (!tasks) {
      return <Preloader />;
    }

    const tasksArray = tasks.map(({ taskId, taskName, description }) => (
      <MemberProgressData
        key={`${description}${taskName}`}
        taskId={taskId}
        taskName={taskName}
        taskDescription={description}
        createTask={this.createTask}
      />
    ));
    return (
      <>
        {taskPageIsVisible && <TaskPage userId={userId} taskId={taskId} hideMemberPage={this.hideMemberPage} />}
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
  taskId: PropTypes.string.isRequired,
  setCurrentTask: PropTypes.func.isRequired,
};

export default MemberProgres;
