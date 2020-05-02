import React from 'react';
import { NavLink } from 'react-router-dom';
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
        <NavLink to='/member_progress'>
          <button data-id={userId} onClick={setCurrentUser}>
            Progress
          </button>
        </NavLink>
        <NavLink to='/tasks'>
          <button data-id={userId}>Tasks</button>
        </NavLink>
        <button data-id={userId}>Edit</button>
        <button data-id={userId}>Delete</button>
      </td>
    </tr>
  );
};

export default MemberData;
