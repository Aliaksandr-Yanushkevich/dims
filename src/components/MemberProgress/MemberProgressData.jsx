import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

const MemberProgressData = ({ taskId, taskName, taskDescription, setCurrentTask, showTask }) => (
  <tr key={taskId}>
    <td>{taskId + 1}</td>
    <td>
      <NavLink
        to='/member_progress:userId?'
        data-taskid={taskId}
        onClick={(e) => {
          setCurrentTask(e);
          showTask(true);
        }}
      >
        {taskName}
      </NavLink>
    </td>
    <td>{taskDescription}</td>
    <td>Here should be track date</td>
  </tr>
);

MemberProgressData.propTypes = {
  taskId: PropTypes.number,
  taskName: PropTypes.string,
  taskDescription: PropTypes.string,
  setCurrentTask: PropTypes.func.isRequired,
  showTask: PropTypes.func.isRequired,
};
MemberProgressData.defaultProps = {
  taskId: 0,
  taskName: '',
  taskDescription: '',
};

export default MemberProgressData;
