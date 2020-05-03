import React from 'react';
import PropTypes from 'prop-types';
import TableHeader from '../common/TableHeader/TableHeader';
import MemberData from './MemberData';
import Preloader from '../common/Preloader/Preloader';

const Members = ({ membersArr, setCurrentUser }) => {
  {
    if (!membersArr) return <Preloader />;
  }
  const memberRows = membersArr.map((el) => (
    <MemberData
      index={el.index}
      firstName={el.firstName}
      lastName={el.lastName}
      age={el.age}
      direction={el.direction}
      education={el.education}
      startDate={el.startDate}
      userId={el.userId}
      setCurrentUser={setCurrentUser}
    />
  ));
  return (
    <>
      <h1>Members Manage Grid</h1>
      <table>
        <thead>
          <tr>
            <TableHeader titleArr={['#', 'full name', 'direction', 'education', 'start', 'age', '']} />
          </tr>
        </thead>
        <tbody>{memberRows}</tbody>
      </table>
    </>
  );
};

Members.propTypes = {
  membersArr: PropTypes.arrayOf(PropTypes.object),
  setCurrentUser: PropTypes.func,
};

Members.defaultProps = {
  membersArr: [
    {
      index: 1,
      firstName: 'Ivan',
      lastName: 'Ivanov',
      age: 22,
      direction: 'Java',
      education: 'BSUIR',
      startDate: new Date('December 17, 1995 03:24:00'),
      userId: 'XcAp',
    },
  ],
};

export default Members;
