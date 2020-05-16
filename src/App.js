import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import Header from './components/common/Header/Header';
import Members from './components/Members/Members';
import MemberPage from './components/MemberPage/MemberPage';
import MemberProgress from './components/MemberProgress/MemberProgress';
import MemberTasks from './components/MemberTasks/MembersTasks';
import Tasks from './components/Tasks/Tasks';
import TaskTrack from './components/TaskTrack/TaskTrack';
import TaskTrackManagement from './components/TaskTrackManagement/TaskTrackManagement';
import Footer from './components/common/Footer/Footer';
import firebaseApi from './api/firebaseApi';
import styles from './App.module.scss';
import TaskPage from './components/TaskPage/TaskPage';
import TaskManagement from './components/TaskManagement/TaskManagement';
import Login from './components/Login/Login';

class App extends Component {
  constructor() {
    super();
    this.state = {
      members: null,
      currentUserId: 'newMember',
      currentTaskId: 'newTask',
      taskPageIsVisible: false,
      taskTrackPageIsVisible: false,
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
    const taskId =
      e.currentTarget.dataset.taskid !== 'newTask' ? +e.currentTarget.dataset.taskid : e.currentTarget.dataset.taskid;
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
    document.title = 'DIMS';
    const { members, currentUserId, currentTaskId, taskPageIsVisible, taskTrackPageIsVisible } = this.state;
    return (
      <BrowserRouter>
        <div className={styles.wrapper}>
          <Header />
          <div className={styles.contentWrapper}>
            <Redirect from='/' to='/members' />
            <Route
              path='/members'
              render={() => (
                <Members userId={currentUserId} membersArray={members} setCurrentUser={this.setCurrentUser} />
              )}
            />
            <Route
              path='/member_progress:userId?'
              component={() => (
                <MemberProgress
                  userId={currentUserId}
                  taskId={currentTaskId}
                  setCurrentTask={this.setCurrentTask}
                  showTask={this.showTask}
                  taskPageIsVisible={taskPageIsVisible}
                />
              )}
            />
            <Route
              path='/member_tasks:userId?'
              component={() => (
                <MemberTasks
                  userId={currentUserId}
                  taskId={currentTaskId}
                  setCurrentTask={this.setCurrentTask}
                  taskTrackPageIsVisible={taskTrackPageIsVisible}
                  showTaskTrack={this.showTaskTrack}
                />
              )}
            />
            <Route path='/tasks' component={() => <Tasks taskId={currentTaskId} />} />
            {/* <Route path='/member_page' component={() => <MemberPage userId={currentUserId} taskId={currentTaskId} />} /> */}
            {/* <Route path='/task_page' component={() => <TaskPage userId={currentUserId} taskId={currentTaskId} />} /> */}
            <Route
              path='/task_management'
              component={() => (
                <TaskManagement
                  userId={currentUserId}
                  taskId={currentTaskId}
                  setCurrentTask={this.setCurrentTask}
                  setCurrentUser={this.setCurrentUser}
                  taskPageIsVisible={taskPageIsVisible}
                  showTask={this.showTask}
                />
              )}
            />
            <Route
              path='/task_track_management'
              component={() => (
                <TaskTrackManagement
                  userId={currentUserId}
                  taskId={currentTaskId}
                  setCurrentTask={this.setCurrentTask}
                  setCurrentUser={this.setCurrentUser}
                  taskTrackPageIsVisible={taskTrackPageIsVisible}
                  showTaskTrack={this.showTaskTrack}
                />
              )}
            />
            {/* <Route
              path='/task_track'
              component={() => (
                <TaskTrack
                  userId={currentUserId}
                  taskId={currentTaskId}
                  setCurrentTask={this.setCurrentTask}
                  setCurrentUser={this.setCurrentUser}
                />
              )}
            /> */}
            <Route path='/login' component={() => <Login />} />
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
