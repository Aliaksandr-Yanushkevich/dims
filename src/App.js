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
  state = {
    members: null,
    currentUserId: null,
  };

  componentDidMount() {
    document.title = 'DIMS';
    firebaseApi
      .getMembers()
      .then((members) =>
        this.setState({
          members,
        }),
      )
      .catch((error) => {
        console.error(`Error receiving data: ${error}`);
      });
  }

  setCurrentUser = (e) => {
    e.persist();
    this.setState({
      currentUserId: e.target.dataset.id,
    });
  };

  createUsers = (amount) => {
    firebaseApi
      .createFakeMembers(amount)
      .then((members) =>
        this.setState({
          members,
        }),
      )
      .catch((error) => {
        console.error(`Error receiving data: ${error}`);
      });
  };

  render() {
    const { members, currentUserId } = this.state;
    return (
      <BrowserRouter>
        <div className={styles.wrapper}>
          <Header />
          <div className={styles.contentWrapper}>
            <Redirect from='/' to='/members' />
            <Route path='/members'>
              <Members membersArray={members} setCurrentUser={this.setCurrentUser} createUsers={this.createUsers} />
            </Route>
            <Route path='/member_progress:userId?'>
              <MemberProgress userId={currentUserId} />
            </Route>
            <Route path='/member_tasks:userId?'>
              <MemberTasks userId={currentUserId} />
            </Route>
            <Route path='/tasks'>
              <Tasks />
            </Route>
            <Route path='/tasks_tracks'>
              <TasksTracks />
            </Route>
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
