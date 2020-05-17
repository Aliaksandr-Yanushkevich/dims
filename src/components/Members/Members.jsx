import React from 'react';
import PropTypes from 'prop-types';
import TableHeader from '../common/TableHeader/TableHeader';
import MemberData from './MemberData';
import Preloader from '../common/Preloader/Preloader';
import { membersTitle } from '../../constants';

const Members = ({ membersArray, setCurrentUser, createUsers }) => {
  if (!membersArray) return <Preloader />;
  const memberRows = membersArray.map((member, index) => (
    <MemberData
      key={`${member.firstName}${member.lastName}${member.age}`}
      index={index + 1}
      firstName={member.firstName}
      lastName={member.lastName}
      age={member.age}
      direction={member.direction}
      education={member.education}
      startDate={member.startDate}
      userId={member.userId}
      setCurrentUser={setCurrentUser}
      createUsers={createUsers}
    />
  ));
  return (
    <>
      <h1>Members Manage Grid</h1>
      <table>
        <thead>
          <tr>
            <TableHeader titleArray={membersTitle} />
          </tr>
        </thead>
        <tbody>{memberRows}</tbody>
      </table>
    </>
  );
};

Members.propTypes = {
  membersArray: PropTypes.arrayOf(
    PropTypes.shape({
      index: PropTypes.number,
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      age: PropTypes.number,
      direction: PropTypes.string,
      education: PropTypes.string,
      startDate: PropTypes.instanceOf(Date),
      userId: PropTypes.string,
    }),
  ),
  setCurrentUser: PropTypes.func.isRequired,
  createUsers: PropTypes.func.isRequired,
};

Members.defaultProps = {
  membersArray: [
    {
      index: 1,
      firstName: 'Ivan',
      lastName: 'Ivanov',
      age: 22,
      direction: 'Java',
      education: 'BSUIR',
      startDate: new Date('December 17, 1995 03:24:00'),
      userId: 'fLFWTByHgY6EZlalpay2',
    },
  ],
};

export default Members;
