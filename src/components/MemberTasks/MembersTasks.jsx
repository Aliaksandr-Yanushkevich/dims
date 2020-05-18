import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TableHeader from '../common/TableHeader/TableHeader';
import Preloader from '../common/Preloader/Preloader';
import MemberCurrentTasks from './MemberCurrentTasks';
import { membersTasksTitle } from '../../constants';
import firebaseApi from '../../api/firebaseApi';

class MemberTasks extends Component {
  constructor() {
    super();
    this.state = {
      tasks: null,
      firstName: null,
      lastName: null,
    };
  }

  componentDidMount() {
    const { userId } = this.props;
    if (userId) {
      firebaseApi.getUserTasks(userId).then(({ tasks, firstName, lastName }) =>
        this.setState({
          tasks,
          firstName,
          lastName,
        }),
      );
    }
  }

  render() {
    const { tasks, firstName, lastName } = this.state;
    if (!tasks) return <Preloader />;
    const tasksArr = tasks.map((task) => (
      <MemberCurrentTasks
        taskId={task.taskId}
        taskName={task.taskName}
        startDate={task.startDate.toDate()}
        deadLineDate={task.deadLineDate.toDate()}
      />
    ));
    return (
      <>
        <h1>Member&apos;s Task Manage Grid</h1>
        <h2>{`Hi, dear ${firstName} ${lastName}! This is your current tasks:`}</h2>
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

MemberTasks.propTypes = { userId: PropTypes.string };
MemberTasks.defaultProps = { userId: 'fLFWTByHgY6EZlalpay2' };

export default MemberTasks;
