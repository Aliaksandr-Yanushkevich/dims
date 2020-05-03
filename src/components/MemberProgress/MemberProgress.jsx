import React, { Component } from 'react';
import TableHeader from '../common/TableHeader/TableHeader';
import firebase from 'firebase';
import Preloader from '../common/Preloader/Preloader';
import MemberProgressData from './MemberProgressData';
// import { NavLink } from 'react-router-dom';
// import style from './MembersProgress.module.scss';

class MemberProgres extends Component {
  constructor() {
    super();
    this.db = firebase.firestore();
    this.state = {
      tasks: null,
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
    const tasksProgressArr = this.state.tasks.map((el) => (
      <MemberProgressData taskId={el.taskId} taskName={el.taskName} description={el.description} />
    ));
    return (
      <>
        <h1>Member Progress Grid</h1>
        <h2>{`${this.state.firstName} ${this.state.lastName} progress:`}</h2>
        <table>
          <tbody>
            <TableHeader titleArr={['#', 'task', 'note', 'date']} />
            {tasksProgressArr}
          </tbody>
        </table>
      </>
    );
  }
}

export default MemberProgres;
