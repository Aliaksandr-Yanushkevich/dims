import React from 'react';
import Header from './components/Header/Header';
import Members from './components/Members/Members';
import MemberProgress from './components/MembersProgress/MembersProgress';
import MemberTasks from './components/MemberTasks/MembersTasks';
import Tasks from './components/Tasks/Tasks';
import TasksTracks from './components/TasksTracks/TasksTracks';
import NavBar from './components/Navbar/Navbar';
import { BrowserRouter, Route } from 'react-router-dom';
import style from './App.module.scss';

function App() {
  return (
    <BrowserRouter>
      <div className={style.app_wrapper}>
        <Header />
        <div className={style.app_wrapper_content}>
          <Route path='/members' render={() => <Members />} />
          <Route path='/member_progress' render={() => <MemberProgress />} />
          <Route path='/member_tasks' render={() => <MemberTasks />} />
          <Route path='/tasks' render={() => <Tasks />} />
          <Route path='/tasks_tracks' render={() => <TasksTracks />} />
        </div>
        <NavBar />
      </div>
    </BrowserRouter>
  );
}

export default App;
