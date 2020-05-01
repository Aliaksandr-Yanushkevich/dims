import React, { Component } from 'react';
// import { NavLink } from 'react-router-dom';
// import style from './Members.module.scss';
import TableHeader from '../common/TableHeader';
import MemberData from './MemberData';
const Members = (props) => {
  const memberRows = props.membersArr.map((el) => (
    <MemberData
      i={el.indexNumber}
      firstName={el.firstName}
      lastName={el.lastName}
      direction={el.direction}
      education={el.education}
      startDate={el.startDate}
      age={el.age}
    />
  ));
  return (
    <>
      <TableHeader titleArr={Object.keys(props.membersArr[0])} />
      {memberRows}
    </>
  );
};

export default Members;
