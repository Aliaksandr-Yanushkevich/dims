import React, { Component } from 'react';
import firebase from 'firebase';
import PropTypes from 'prop-types';
import TableHeader from '../common/TableHeader/TableHeader';
import Preloader from '../common/Preloader/Preloader';
import MemberCurrentTasks from './MemberCurrentTasks';

class MemberTasks extends Component {
  constructor() {
    super();
    this.db = firebase.firestore();
    this.state = {
      tasks: null,
      firstName: null,
      lastName: null,
    };
  }

  componentDidMount() {
    const { userId } = this.props;
    if (userId) {
      this.db
        .collection('dims')
        .doc(userId)
        .get()
        .then((querySnapshot) => {
          this.setState({
            firstName: querySnapshot.data().firstName,
            lastName: querySnapshot.data().lastName,
            tasks: querySnapshot.data().tasks,
          });
        });
    }
  }

  render() {
    const { tasks, firstName, lastName } = this.state;
    if (!tasks) return <Preloader />;
    const tasksArr = tasks.map((el) => (
      <MemberCurrentTasks
        taskId={el.taskId}
        taskName={el.taskName}
        startDate={el.startDate.toDate()}
        deadLineDate={el.deadLineDate.toDate()}
      />
    ));
    return (
      <>
        <h1>Member&apos;s Task Manage Grid</h1>
        <h2>{`Hi, dear ${firstName} ${lastName}! This is your current tasks:`}</h2>
        <table>
          <tbody>
            <TableHeader titleArr={['#', 'name', 'start', 'deadline', 'status', '', 'available only for admin']} />
            {tasksArr}
          </tbody>
        </table>
      </>
    );
  }
}

MemberTasks.propTypes = { userId: PropTypes.string };
MemberTasks.defaultProps = { userId: 'abz' };

export default MemberTasks;
