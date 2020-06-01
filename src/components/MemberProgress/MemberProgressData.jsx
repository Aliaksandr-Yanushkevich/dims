import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './MembersProgress.module.scss';
import TableData from '../common/TableData/TableData';
import dateToString from '../../helpers/dateToString';

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
      <TableData>{trackDate !== '-' ? dateToString(trackDate) : trackDate}</TableData>
    </tr>
  );
};

MemberProgressData.propTypes = {
  taskId: PropTypes.string.isRequired,
  taskName: PropTypes.string.isRequired,
};

export default MemberProgressData;
