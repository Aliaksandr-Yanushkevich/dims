import React, { Component } from 'react';
import TableHeader from '../common/TableHeader/TableHeader';
import firebase from 'firebase';
import Preloader from '../common/Preloader/Preloader';
import MemberCurrentTasks from './MemberCurrentTasks';
// import { NavLink } from 'react-router-dom';
// import style from './MembersProgress.module.scss';

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
    if (this.props.userId) {
      this.db
        .collection('dims')
        .doc(this.props.userId)
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
    if (!this.state.tasks) return <Preloader />;
    const tasksArr = this.state.tasks.map((el) => (
      <MemberCurrentTasks
        taskId={el.taskId}
        taskName={el.taskName}
        startDate={el.startDate.toDate()}
        deadLineDate={el.deadLineDate.toDate()}
      />
    ));
    return (
      <>
        <h2>{`Hi, dear ${this.state.firstName} ${this.state.lastName}! This is your current tasks:`}</h2>
        <TableHeader titleArr={['#', 'name', 'start', 'deadline', 'status', '', 'available only for admin']} />
        {tasksArr}
      </>
    );
  }
}

export default MemberTasks;
