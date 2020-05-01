import React from 'react';
import { NavLink } from 'react-router-dom';
import style from './Members.module.scss';
import randomMembers from '../../randomMembers';
import TableHeader from '../common/TableHeader';
import MemberData from './MemberData';
// import firebase from 'firebase';
// import {DB_CONFIG} from "../../config"

const Members = (props) => {
  // const app = firebase.initializeApp(DB_CONFIG);
  // const database = app.database().ref().child("age")
  // const members = randomMembers();
  const memberRows = members.map((el) => (
    <MemberData
      i={el.indexNumber}
      firstName={el.first_name}
      lastName={el.last_name}
      direction={el.direction}
      education={el.education}
      startDate={el.start_date}
      age={el.age}
    />
  ));
  return (
    <>
      <TableHeader titleArr={Object.keys(members[0])} />
      {memberRows}
    </>
  );
};

export default Members;
