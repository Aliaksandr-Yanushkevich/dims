import React from 'react';
import { NavLink } from 'react-router-dom';
const MemberProgressData = ({ taskId, name, description }) => {
  return (
    <tr key={taskId}>
      <td>{taskId}</td>
      <td>{name}</td>
      <td>{description}</td>
      <td>Here should be track date</td>
    </tr>
  );
};

export default MemberProgressData;
