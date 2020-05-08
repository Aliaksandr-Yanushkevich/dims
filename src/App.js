import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import Header from './components/common/Header/Header';
import Members from './components/Members/Members';
import MemberProgress from './components/MemberProgress/MemberProgress';
import MemberTasks from './components/MemberTasks/MembersTasks';
import Tasks from './components/Tasks/Tasks';
import TasksTracks from './components/TasksTracks/TasksTracks';
import Footer from './components/common/Footer/Footer';
import firebaseApi from './api/firebaseApi';
import styles from './App.module.scss';

class App extends Component {
  constructor() {
    super();
    this.state = {
      members: null,
      currentUserId: null,
    };
  }

  componentDidMount() {
    firebaseApi
      .getMembers()
      .then((members) =>
        this.setState({
          members,
        }),
      )
      .catch(() => {
        throw new Error('Error receiving data');
      });
  }

  setCurrentUser = (e) => {
    this.setState({
      currentUserId: e.currentTarget.dataset.id,
    });
  };

  createUsers = (amount) => {
    firebaseApi.createFakeMembers(amount).then(() => {
      firebaseApi
        .getMembers()
        .then((members) =>
          this.setState({
            members,
          }),
        )
        .catch(() => {
          throw new Error('Error receiving data');
        });
    });
  };

  render() {
    document.title = 'DIMS';
    const { members, currentUserId } = this.state;
    return (
      <BrowserRouter>
        <div className={styles.wrapper}>
          <Header />
          <div className={styles.contentWrapper}>
            <Redirect from='/' to='/members' />
            <Route
              path='/members'
              render={() => (
                <Members membersArray={members} setCurrentUser={this.setCurrentUser} createUsers={this.createUsers} />
              )}
            />
            <Route path='/member_progress:userId?' component={() => <MemberProgress userId={currentUserId} />} />
            <Route path='/member_tasks:userId?' component={() => <MemberTasks userId={currentUserId} />} />
            <Route path='/tasks' component={() => <Tasks />} />
            <Route path='/tasks_tracks' component={() => <TasksTracks />} />
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
