import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import Header from './components/common/Header/Header';
import Members from './components/Members/Members';
import MemberProgress from './components/MemberProgress/MemberProgress';
import MemberTasks from './components/MemberTasks/MembersTasks';
import TaskTrackManagement from './components/TaskTrackManagement/TaskTrackManagement';
import Footer from './components/common/Footer/Footer';
import styles from './App.module.scss';
import TaskManagement from './components/TaskManagement/TaskManagement';
import Login from './components/Login/Login';
import Account from './components/Account/Account';
import firebaseApi from './api/firebaseApi';
import getUserFromSessionStorage from './helpers/getUserFromSessionStorage';

class App extends Component {
  state = {
    currentUserId: null,
    role: null,
    currentTaskId: 'newTask',
    firstName: null,
    lastName: null,
    accountPageIsVisible: false,
  };

  componentDidMount() {
    const user = getUserFromSessionStorage();
    if (user) {
      const { role, userId, firstName, lastName, email } = user;
      this.setState({ role, currentUserId: userId, firstName, lastName, email });
    }
    document.title = 'DIMS';
  }

  setUser = (userId, role, firstName, lastName, email) => {
    this.setState({ currentUserId: userId, role, firstName, lastName, email });
  };

  logout = () => {
    firebaseApi.logout().then(() => {
      this.setState({ currentUserId: null, role: null, currentTaskId: 'newTask', firstName: null, lastName: null });
    });
  };

  setCurrentUser = (e) => {
    e.persist();
    const {
      target: {
        dataset: { id: currentUserId },
      },
    } = e;
    this.setState({
      currentUserId,
    });
  };

  setCurrentTask = (e) => {
    e.persist();
    const {
      target: {
        dataset: { taskid: currentTaskId },
      },
    } = e;
    this.setState({
      currentTaskId,
    });
  };

  showAccountPage = () => {
    this.setState({ accountPageIsVisible: true });
  };

  hideAccountPage = () => {
    this.setState({ accountPageIsVisible: false });
  };

  render() {
    const { currentUserId, currentTaskId, role, firstName, lastName, email, accountPageIsVisible } = this.state;

    return (
      <BrowserRouter>
        {accountPageIsVisible && (
          <Account
            role={role}
            firstName={firstName}
            lastName={lastName}
            email={email}
            hideAccountPage={this.hideAccountPage}
          />
        )}
        <div className={styles.wrapper}>
          <Header
            firstName={firstName}
            lastName={lastName}
            logout={this.logout}
            role={role}
            showAccountPage={this.showAccountPage}
            hideAccountPage={this.hideAccountPage}
          />
          <div className={styles.contentWrapper}>
            {!currentUserId && <Redirect from='/' to='/login' />}
            <Route path='/members'>
              <Members currentUserId={currentUserId} setCurrentUser={this.setCurrentUser} role={role} />
            </Route>
            <Route path='/member_progress:userId?'>
              <MemberProgress
                userId={currentUserId}
                currentTaskId={currentTaskId}
                setCurrentTask={this.setCurrentTask}
                role={role}
              />
            </Route>
            <Route path='/member_tasks:userId?'>
              <MemberTasks userId={currentUserId} role={role} />
            </Route>
            <Route path='/task_management'>
              <TaskManagement
                userId={currentUserId}
                currentTaskId={currentTaskId}
                setCurrentTask={this.setCurrentTask}
                setCurrentUser={this.setCurrentUser}
                role={role}
              />
            </Route>
            <Route path='/task_track_management'>
              <TaskTrackManagement userId={currentUserId} role={role} />
            </Route>
            <Route path='/login'>
              <Login setUser={this.setUser} />
            </Route>
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
