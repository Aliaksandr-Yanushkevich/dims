import React, { Component } from 'react';
// import { NavLink } from 'react-router-dom';
// import style from './Members.module.scss';
import TableHeader from '../common/TableHeader/TableHeader';
import MemberData from './MemberData';
import Preloader from '../common/Preloader/Preloader';
const Members = (props) => {
  {
    if (!props.membersArr) return <Preloader />;
  }
  const memberRows = props.membersArr.map((el) => (
    <MemberData
      i={el.indexNumber}
      firstName={el.firstName}
      lastName={el.lastName}
      age={el.age}
      direction={el.direction}
      education={el.education}
      startDate={el.startDate}
      userId={el.userId}
      setCurrentUser={props.setCurrentUser}
    />
  ));
  return (
    <>
      <TableHeader titleArr={['#', 'full name', 'direction', 'education', 'start', 'age', '']} />
      {memberRows}
    </>
  );
};

export default Members;
