import React from 'react';
const MemberData = ({ i, firstName, lastName, direction, education, startDate, age }) => {
  return (
    <tr key={i}>
      <td>{i}</td>
      <td>{firstName}</td>
      <td>{lastName}</td>
      <td>{direction}</td>
      <td>{education}</td>
      <td>
        {startDate.getDate() < 10 ? '0' + (startDate.getDate() + 1) : startDate.getDate() + 1}.
        {startDate.getMonth() < 9 ? '0' + (startDate.getMonth() + 1) : startDate.getMonth() + 1}.
        {startDate.getFullYear()}
      </td>
      <td>{age}</td>
      <td>
        <button>Progress</button>
        <button>Tasks</button>
        <button>Edit</button>
        <button>Delete</button>
      </td>
    </tr>
  );
};

export default MemberData;
