import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TableHeader from '../common/TableHeader/TableHeader';
import Preloader from '../common/Preloader/Preloader';
import MemberProgressData from './MemberProgressData';
import { memberProgressTitle } from '../../constants';
import firebaseApi from '../../api/firebaseApi';

class MemberProgres extends Component {
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
      firebaseApi
        .getUserTasks(userId)
        .then(({ tasks, firstName, lastName }) =>
          this.setState({
            tasks,
            firstName,
            lastName,
          }),
        )
        .catch(() => {
          throw new Error('Error receiving data');
        });
    }
  }

  render() {
    const { tasks, firstName, lastName } = this.state;
    if (!tasks) {
      return <Preloader />;
    }

    const tasksArray = tasks.map((task) => (
      <MemberProgressData taskId={task.taskId} taskName={task.taskName} taskDescription={task.description} />
    ));
    return (
      <>
        <h1>Member Progress Grid</h1>
        <h2>{`${firstName} ${lastName} progress:`}</h2>
        <table>
          <tbody>
            <TableHeader titleArray={memberProgressTitle} />
            {tasksArray}
          </tbody>
        </table>
      </>
    );
  }
}

MemberProgres.propTypes = { userId: PropTypes.string };
MemberProgres.defaultProps = { userId: '4iKBUOYjXypfQT9Uv9JA' };

export default MemberProgres;
