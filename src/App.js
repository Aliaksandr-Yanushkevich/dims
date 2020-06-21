import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
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
import { setRole, loginSuccess } from './redux/reducers/authReducer';

class App extends Component {
  componentDidMount() {
    const { setRole } = this.props;
    const user = JSON.parse(sessionStorage.getItem('user'));
    if (user) {
      const { role, userId, firstName, lastName, email } = user;
      setRole({ role, currentUserId: userId, firstName, lastName, email });
    }
    document.title = 'DIMS';
  }

  setCurrentUser = (e) => {
    e.persist();
    this.setState({
      currentUserId: e.target.dataset.id,
    });
  };

  setCurrentTask = (e) => {
    e.persist();
    const taskId = e.target.dataset.taskid;
    this.setState({
      currentTaskId: taskId,
    });
  };

  render() {
    const { isAuth, currentUserId, currentTaskId, role, firstName, lastName, email, accountPageIsVisible } = this.props;
    const savedUserData = sessionStorage.getItem('user');

    return (
      <>
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
          <Header />
          <div className={styles.contentWrapper}>
            {!isAuth && !savedUserData && <Redirect from='/' to='/login' />}
            {role === 'admin' || (role === 'mentor' && <Redirect from='/' to='/members' />)}
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
              <MemberTasks userId={currentUserId} taskId={currentTaskId} role={role} />
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
              <Login />
            </Route>
          </div>
          <Footer />
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  const { currentTaskId, currentUserId, accountPageIsVisible } = state.app;
  const { isAuth, role, userId, firstName, lastName } = state.auth;
  return { currentTaskId, currentUserId, isAuth, role, userId, firstName, lastName };
};

export default connect(mapStateToProps, { setRole, loginSuccess })(App);
