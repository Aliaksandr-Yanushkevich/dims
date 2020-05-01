import React from 'react';
const MemberData = ({ i, firstName, lastName, direction, education, startDate, age }) => {
  return (
    <tr key={i}>
      <td>{i}</td>
      <td>{firstName}</td>
      <td>{lastName}</td>
      <td>{direction}</td>
      <td>{education}</td>
      <td>{startDate}</td>
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
