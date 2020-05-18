import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import Header from './components/common/Header/Header';
import Members from './components/Members/Members';
import MemberProgress from './components/MemberProgress/MemberProgress';
import MemberTasks from './components/MemberTasks/MembersTasks';
import TaskTrackManagement from './components/TaskTrackManagement/TaskTrackManagement';
import Footer from './components/common/Footer/Footer';
import firebaseApi from './api/firebaseApi';
import styles from './App.module.scss';
import TaskManagement from './components/TaskManagement/TaskManagement';
import Login from './components/Login/Login';

class App extends Component {
  state = {
    members: null,
    currentUserId: 'newMember',
    currentTaskId: 'newTask',
    taskPageIsVisible: false,
    taskTrackPageIsVisible: false,
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
      .catch(() => {
        throw new Error('Error receiving data');
      });
  }

  setCurrentUser = (e) => {
    e.persist();
    this.setState({
      currentUserId: e.target.dataset.id,
    });
  };

  setCurrentTask = (e) => {
    e.persist();
    const taskId =
      e.target.dataset.taskid !== 'newTask' ? +e.currentTarget.dataset.taskid : e.currentTarget.dataset.taskid;
    this.setState({
      currentTaskId: taskId,
    });
  };

  showTask = (value) => {
    this.setState({ taskPageIsVisible: value });
  };

  showTaskTrack = (value) => {
    this.setState({ taskTrackPageIsVisible: value });
  };

  render() {
    const { members, currentUserId, currentTaskId, taskPageIsVisible, taskTrackPageIsVisible } = this.state;
    return (
      <BrowserRouter>
        <div className={styles.wrapper}>
          <Header />
          <div className={styles.contentWrapper}>
            <Redirect from='/' to='/members' />
            <Route path='/members'>
              <Members userId={currentUserId} membersArray={members} setCurrentUser={this.setCurrentUser} />
            </Route>
            <Route path='/member_progress:userId?'>
              <MemberProgress
                userId={currentUserId}
                taskId={currentTaskId}
                setCurrentTask={this.setCurrentTask}
                showTask={this.showTask}
                taskPageIsVisible={taskPageIsVisible}
              />
            </Route>
            <Route path='/member_tasks:userId?'>
              <MemberTasks
                userId={currentUserId}
                taskId={currentTaskId}
                setCurrentTask={this.setCurrentTask}
                taskTrackPageIsVisible={taskTrackPageIsVisible}
                showTaskTrack={this.showTaskTrack}
              />
            </Route>
            <Route path='/task_management'>
              <TaskManagement
                userId={currentUserId}
                taskId={currentTaskId}
                setCurrentTask={this.setCurrentTask}
                setCurrentUser={this.setCurrentUser}
                taskPageIsVisible={taskPageIsVisible}
                showTask={this.showTask}
              />
            </Route>
            <Route path='/task_track_management'>
              {' '}
              <TaskTrackManagement
                userId={currentUserId}
                taskId={currentTaskId}
                setCurrentTask={this.setCurrentTask}
                setCurrentUser={this.setCurrentUser}
                taskTrackPageIsVisible={taskTrackPageIsVisible}
                showTaskTrack={this.showTaskTrack}
              />
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

export default App;
