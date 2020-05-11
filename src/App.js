import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import Header from './components/common/Header/Header';
import Members from './components/Members/Members';
import MemberPage from './components/MemberPage/MemberPage';
import MemberProgress from './components/MemberProgress/MemberProgress';
import MemberTasks from './components/MemberTasks/MembersTasks';
import Tasks from './components/Tasks/Tasks';
import TasksTracks from './components/TasksTracks/TasksTracks';
import Footer from './components/common/Footer/Footer';
import firebaseApi from './api/firebaseApi';
import styles from './App.module.scss';
import TaskPage from './components/TaskPage/TaskPage';

class App extends Component {
  constructor() {
    super();
    this.state = {
      members: null,
      currentUserId: null,
      currentTaskId: null,
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

  setCurrentTask = (e) => {
    this.setState({
      currentTaskId: e.currentTarget.dataset.taskid,
    });
  };

  render() {
    document.title = 'DIMS';
    const { members, currentUserId, currentTaskId } = this.state;
    return (
      <BrowserRouter>
        <div className={styles.wrapper}>
          <Header />
          <div className={styles.contentWrapper}>
            <Redirect from='/' to='/members' />
            <Route
              path='/members'
              render={() => <Members membersArray={members} setCurrentUser={this.setCurrentUser} />}
            />
            <Route
              path='/member_progress:userId?'
              component={() => (
                <MemberProgress userId={currentUserId} taskId={currentTaskId} setCurrentTask={this.setCurrentTask} />
              )}
            />
            <Route
              path='/member_tasks:userId?'
              component={() => <MemberTasks userId={currentUserId} taskId={currentTaskId} />}
            />
            <Route path='/tasks' component={() => <Tasks taskId={currentTaskId} />} />
            <Route path='/tasks_tracks' component={() => <TasksTracks />} />
            <Route path='/member_page' component={() => <MemberPage userId={currentUserId} taskId={currentTaskId} />} />
            <Route path='/task_page' component={() => <TaskPage userId={currentUserId} taskId={currentTaskId} />} />
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
