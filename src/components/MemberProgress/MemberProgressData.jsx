import React from 'react';

const MemberProgressData = ({ taskId, taskName, description }) => {
  return (
    <tr key={taskId}>
      <td>{taskId}</td>
      <td>{taskName}</td>
      <td>{description}</td>
      <td>Here should be track date</td>
    </tr>
  );
};

export default MemberProgressData;
