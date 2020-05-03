import React, { Component } from 'react';
import Header from './components/common/Header/Header';
import Members from './components/Members/Members';
import MemberProgress from './components/MemberProgress/MemberProgress';
import MemberTasks from './components/MemberTasks/MembersTasks';
import Tasks from './components/Tasks/Tasks';
import TasksTracks from './components/TasksTracks/TasksTracks';
import Footer from './components/common/Footer/Footer';
import { BrowserRouter, Route } from 'react-router-dom';
import style from './App.module.scss';
import firebase from 'firebase';
import { DB_CONFIG } from './config';

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

  setCurrentUser = (e) => {
    this.setState({
      currentUserId: e.currentTarget.dataset.id,
    });
  };

  componentDidMount() {
    let dbMembers = [];
    this.db
      .collection('dims')
      .orderBy('indexNumber')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((el) => {
          dbMembers = [
            ...dbMembers,
            {
              indexNumber: el.data().indexNumber,
              firstName: el.data().firstName,
              lastName: el.data().lastName,
              age: el.data().age,
              direction: el.data().direction,
              education: el.data().education,
              startDate: el.data().startDate,
              userId: el.ref.path.substring(el.ref.path.indexOf('/') + 1),
            },
          ];
        });
        return dbMembers;
      })
      .then((dbMembers) =>
        this.setState({
          members: dbMembers,
        }),
      );
  }
  render() {
    return (
      <BrowserRouter>
        <div className={style.app_wrapper}>
          <Header />
          <div className={style.app_wrapper_content}>
            <Route
              path='/members'
              render={() => <Members membersArr={this.state.members} setCurrentUser={this.setCurrentUser} />}
            />
            <Route
              path='/member_progress:userId?'
              render={() => <MemberProgress userId={this.state.currentUserId} />}
            />
            <Route path='/member_tasks:userId?' render={() => <MemberTasks userId={this.state.currentUserId} />} />
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
