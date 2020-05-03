import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import style from './Members.module.scss';

const MemberData = ({ index, firstName, lastName, direction, education, startDate, age, userId, setCurrentUser }) => {
  return (
    <tr key={index}>
      <td>{index}</td>
      <td>
        {firstName}
        {lastName}
      </td>
      <td>{direction}</td>
      <td>{education}</td>
      <td>
        {`${startDate.getDate() < 10 ? `0${startDate.getDate()}` : startDate.getDate()}.${
          startDate.getMonth() < 9 ? `0${startDate.getMonth() + 1}` : startDate.getMonth() + 1
        }.${startDate.getFullYear()}`}
      </td>
      <td>{age}</td>
      <td>
        <div className={style.buttonWrapper}>
          <NavLink to='/member_progress'>
            <button type='button' data-id={userId} onClick={setCurrentUser}>
              Progress
            </button>
          </NavLink>
          <NavLink to='/member_tasks'>
            <button type='button' data-id={userId} onClick={setCurrentUser}>
              Tasks
            </button>
          </NavLink>
          <button type='button' data-id={userId}>
            Edit
          </button>
          <button type='button' className={style.dangerousButton} data-id={userId}>
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
};

MemberData.propTypes = {
  index: PropTypes.number,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  direction: PropTypes.string,
  education: PropTypes.string,
  startDate: PropTypes.instanceOf(Date),
  age: PropTypes.number,
  userId: PropTypes.number,
  setCurrentUser: PropTypes.func,
};
MemberData.defaultProps = {
  index: 1,
  firstName: 'Ivan',
  lastName: 'Ivanov',
  direction: 'Javascript',
  education: 'PSU',
  startDate: new Date('December 17, 1995 03:24:00'),
  age: 28,
  userId: 1,
};

export default MemberData;
