import React from 'react';
import { NavLink } from 'react-router-dom';
import style from './Members.module.scss';

const MemberData = ({ i, firstName, lastName, direction, education, startDate, age, userId, setCurrentUser }) => {
  return (
    <tr key={i}>
      <td>{i}</td>
      <td>
        {firstName} {lastName}
      </td>
      <td>{direction}</td>
      <td>{education}</td>
      <td>{startDate}</td>
      <td>{age}</td>
      <td>
        <div className={style.buttonWrapper}>
          <NavLink to='/member_progress'>
            <button data-id={userId} onClick={setCurrentUser}>
              Progress
            </button>
          </NavLink>
          <NavLink to='/member_tasks'>
            <button data-id={userId} onClick={setCurrentUser}>
              Tasks
            </button>
          </NavLink>
          <button data-id={userId}>Edit</button>
          <button className={style.dangerousButton} data-id={userId}>
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
};

export default MemberData;
