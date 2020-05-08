import React from 'react';
import PropTypes from 'prop-types';

const MemberProgressData = ({ taskId, taskName, taskDescription }) => (
  <tr key={taskId}>
    <td>{taskId}</td>
    <td>{taskName}</td>
    <td>{taskDescription}</td>
    <td>Here should be track date</td>
  </tr>
);

MemberProgressData.propTypes = {
  taskId: PropTypes.string,
  taskName: PropTypes.string,
  taskDescription: PropTypes.string,
};
MemberProgressData.defaultProps = {
  taskId: '1',
  taskName: 'FTP',
  taskDescription: 'The SDD hard drive is down, navigate the optical pixel so we can generate the JSON monitor!',
};

export default MemberProgressData;
