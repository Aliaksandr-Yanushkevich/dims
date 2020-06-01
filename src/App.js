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
import Registration from './components/Registration/Registration';

class App extends Component {
  state = {
    // currentUserId: 'newMember',
    currentUserId: 'pu7f8c6lk',
    currentTaskId: 'newTask',
  };

  componentDidMount() {
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
    const { currentUserId, currentTaskId } = this.state;
    return (
      <BrowserRouter>
        <div className={styles.wrapper}>
          <Header />
          <div className={styles.contentWrapper}>
            <Redirect from='/' to='/members' />
            <Route path='/members'>
              <Members currentUserId={currentUserId} setCurrentUser={this.setCurrentUser} />
            </Route>
            <Route path='/member_progress:userId?'>
              <MemberProgress
                userId={currentUserId}
                currentTaskId={currentTaskId}
                setCurrentTask={this.setCurrentTask}
              />
            </Route>
            <Route path='/member_tasks:userId?'>
              <MemberTasks userId={currentUserId} taskId={currentTaskId} />
            </Route>
            <Route path='/task_management'>
              <TaskManagement
                userId={currentUserId}
                currentTaskId={currentTaskId}
                setCurrentTask={this.setCurrentTask}
                setCurrentUser={this.setCurrentUser}
              />
            </Route>
            <Route path='/task_track_management'>
              <TaskTrackManagement
                userId={currentUserId}
                taskId={currentTaskId}
                setCurrentTask={this.setCurrentTask}
                setCurrentUser={this.setCurrentUser}
              />
            </Route>
            <Route path='/login'>
              <Login />
            </Route>
            <Route path='/registration'>
              <Registration />
            </Route>
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
