import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './MembersProgress.module.scss';
import TableData from '../common/TableData/TableData';

const MemberProgressData = ({ index, taskId, taskName, trackNote, trackDate, createTask }) => {
  return (
    <tr key={`${taskId}${taskName}`}>
      <TableData>{index + 1}</TableData>
      <TableData>
        <NavLink className={styles.link} to='/member_progress:userId?' data-taskid={taskId} onClick={createTask}>
          {taskName}
        </NavLink>
      </TableData>
      <TableData>{trackNote}</TableData>
      <TableData>{trackDate}</TableData>
    </tr>
  );
};

MemberProgressData.propTypes = {
  taskId: PropTypes.number,
  taskName: PropTypes.string,
  taskDescription: PropTypes.string,
  setCurrentTask: PropTypes.func.isRequired,
};
MemberProgressData.defaultProps = {
  taskId: 0,
  taskName: '',
  taskDescription: '',
};

export default MemberProgressData;
