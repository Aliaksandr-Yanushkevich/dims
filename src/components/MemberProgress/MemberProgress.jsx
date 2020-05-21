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

  render() {
    const { tasks, firstName, lastName } = this.state;
    const { userId, taskId, show, setCurrentTask, taskPageIsVisible } = this.props;
    if (!tasks) {
      return <Preloader />;
    }

    const tasksArray = tasks.map(({ taskId, taskName, description }) => (
      <MemberProgressData
        key={`${description}${taskName}`}
        taskId={taskId}
        taskName={taskName}
        taskDescription={description}
        setCurrentTask={setCurrentTask}
        show={show}
      />
    ));
    return (
      <>
        {taskPageIsVisible && <TaskPage userId={userId} taskId={taskId} show={show} />}
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
  show: PropTypes.func.isRequired,
  setCurrentTask: PropTypes.func.isRequired,
  taskPageIsVisible: PropTypes.bool.isRequired,
};

export default MemberProgres;
