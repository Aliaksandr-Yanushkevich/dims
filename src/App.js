import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import firebase from 'firebase';
import Header from './components/common/Header/Header';
import Members from './components/Members/Members';
import MemberProgress from './components/MemberProgress/MemberProgress';
import MemberTasks from './components/MemberTasks/MembersTasks';
import Tasks from './components/Tasks/Tasks';
import TasksTracks from './components/TasksTracks/TasksTracks';
import Footer from './components/common/Footer/Footer';

import style from './App.module.scss';

import DB_CONFIG from './config';

class App extends Component {
  constructor() {
    super();
    this.app = firebase.initializeApp(DB_CONFIG);
    this.db = this.app.firestore();

    this.state = {
      members: null,
      currentUserId: null,
    };
  }

  componentDidMount() {
    let dbMembers = [];
    this.db
      .collection('dims')
      .orderBy('userId')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((el) => {
          dbMembers = [
            ...dbMembers,
            {
              index: el.data().userId,
              firstName: el.data().firstName,
              lastName: el.data().lastName,
              age: el.data().age,
              direction: el.data().direction,
              education: el.data().education,
              startDate: el.data().startDate.toDate(),
              userId: el.ref.path.substring(el.ref.path.indexOf('/') + 1),
            },
          ];
        });
        return dbMembers;
      })
      .then(() =>
        this.setState({
          members: dbMembers,
        }),
      );
  }

  setCurrentUser = (e) => {
    this.setState({
      currentUserId: e.currentTarget.dataset.id,
    });
  };

  render() {
    const { members, currentUserId } = this.state;
    return (
      <BrowserRouter>
        <div className={style.app_wrapper}>
          <Header />
          <div className={style.app_wrapper_content}>
            <Redirect from='/' to='/members' />
            <Route
              path='/members'
              render={() => <Members membersArr={members} setCurrentUser={this.setCurrentUser} />}
            />
            <Route path='/member_progress:userId?' render={() => <MemberProgress userId={currentUserId} />} />
            <Route path='/member_tasks:userId?' render={() => <MemberTasks userId={currentUserId} />} />
            <Route path='/tasks' render={() => <Tasks />} />
            <Route path='/tasks_tracks' render={() => <TasksTracks />} />
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
