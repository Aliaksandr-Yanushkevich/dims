import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import Header from './components/common/Header/Header';
import Footer from './components/common/Footer/Footer';
import styles from './App.module.scss';
import Login from './components/Login/Login';
import MembersContainer from './components/Members/MembersContainer';
import MemberProgressContainer from './components/MemberProgress/MemberProgressContainer';
import MemberTasksContainer from './components/MemberTasks/MembersTasksContainer';
import TaskManagementContainer from './components/TaskManagement/TaskManagementContainer';
import TaskTrackManagementContainer from './components/TaskTrackManagement/TaskTrackManagementContainer';

class App extends Component {
  componentDidMount() {
    document.title = 'DIMS';
  }

  render() {
    const { isAuth, role } = this.props;
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
              <MemberTasksContainer />
            </Route>
            <Route path='/task_management'>
              <TaskManagementContainer />
            </Route>
            <Route path='/task_track_management'>
              <TaskTrackManagementContainer />
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

App.propTypes = {
  isAuth: PropTypes.bool.isRequired,
  role: PropTypes.string,
};

App.defaultProps = {
  role: '',
};

const mapStateToProps = (state) => {
  const { currentTaskId, currentUserId, accountPageIsVisible } = state.app;
  const { isAuth, role, userId, firstName, lastName } = state.auth;
  return { currentTaskId, currentUserId, isAuth, role, userId, firstName, lastName, accountPageIsVisible };
};

export default connect(mapStateToProps, {})(App);
