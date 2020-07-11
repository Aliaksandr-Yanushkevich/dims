import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import Header from './components/common/Header/Header';
import MemberTasks from './components/MemberTasks/MembersTasks';
import TaskTrackManagement from './components/TaskTrackManagement/TaskTrackManagement';
import Footer from './components/common/Footer/Footer';
import styles from './App.module.scss';
import TaskManagement from './components/TaskManagement/TaskManagement';
import Login from './components/Login/Login';
import MembersContainer from './components/Members/MembersContainer';
import MemberProgressContainer from './components/MemberProgress/MemberProgressContainer';

class App extends Component {
  componentDidMount() {
    document.title = 'DIMS';
  }

  render() {
    const { isAuth, currentUserId, currentTaskId, role } = this.props;
    const savedUserData = sessionStorage.getItem('user');

    return (
      <BrowserRouter>
        <div className={styles.wrapper}>
          <Header />
          <div className={styles.contentWrapper}>
            {/* here should use HOC for redirect. to create universal HOC for all secured component is better solution */}
            {!isAuth && !savedUserData && <Redirect from='/' to='/login' />}
            {role === 'admin' || (role === 'mentor' && <Redirect from='/' to='/members' />)}
            <Route path='/members'>
              <MembersContainer />
            </Route>
            <Route path='/member_progress:userId?'>
              <MemberProgressContainer />
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
              <Login />
            </Route>
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state) => {
  const { currentTaskId, currentUserId, accountPageIsVisible } = state.app;
  const { isAuth, role, userId, firstName, lastName } = state.auth;
  return { currentTaskId, currentUserId, isAuth, role, userId, firstName, lastName, accountPageIsVisible };
};

export default connect(mapStateToProps, {})(App);
