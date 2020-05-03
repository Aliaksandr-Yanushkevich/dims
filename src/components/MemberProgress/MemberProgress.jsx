import React, { Component } from 'react';
import firebase from 'firebase';
import PropTypes from 'prop-types';
import TableHeader from '../common/TableHeader/TableHeader';
import Preloader from '../common/Preloader/Preloader';
import MemberProgressData from './MemberProgressData';

class MemberProgres extends Component {
  constructor() {
    super();
    this.db = firebase.firestore();
    this.state = {
      tasks: null,
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
    const tasksProgressArr = tasks.map((el) => (
      <MemberProgressData taskId={el.taskId} taskName={el.taskName} description={el.description} />
    ));
    return (
      <>
        <h1>Member Progress Grid</h1>
        <h2>{`${firstName} ${lastName} progress:`}</h2>
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

MemberProgres.propTypes = { userId: PropTypes.string };
MemberProgres.defaultProps = { userId: 'abz' };

export default MemberProgres;
