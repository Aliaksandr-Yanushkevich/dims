import React, { Component } from 'react';
import Header from './components/Header/Header';
import Members from './components/Members/Members';
import MemberProgress from './components/MembersProgress/MembersProgress';
import MemberTasks from './components/MemberTasks/MembersTasks';
import Tasks from './components/Tasks/Tasks';
import TasksTracks from './components/TasksTracks/TasksTracks';
import NavBar from './components/Navbar/Navbar';
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
      members: [
        {
          indexNumber: 1,
          firstName: 'Aliaksandr',
          lastName: 'Yanushkevich',
          age: 28,
          direction: 'Javascript',
          education: 'PSU',
          startDate: '28.04.2020',
        },
        {
          indexNumber: 2,
          firstName: 'Ryhor',
          lastName: 'Sidoryn',
          age: 30,
          direction: 'Javascript',
          education: 'BNTU',
          startDate: '03.03.2020',
        },
      ],
    };
  }

  componentDidMount() {
    this.db
      .collection('dims')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((el) => {
          this.setState({
            members: [
              ...this.state.members,
              {
                firstName: el.data().firstName,
                lastName: el.data().lastName,
                age: el.data().age,
                education: el.data().education,
                direction: el.data().direction,
                startDate: el.data().startDate,
                indexNumber: el.data().indexNumber,
              },
            ],
          });
        });
      });
  }
  render() {
    return (
      <BrowserRouter>
        <div className={style.app_wrapper}>
          <Header />
          <div className={style.app_wrapper_content}>
            <Route path='/members' render={() => <Members membersArr={this.state.members} />} />
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
}

export default App;
