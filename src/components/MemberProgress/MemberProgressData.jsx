import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './MembersProgress.module.scss';

const MemberProgressData = ({ taskId, taskName, taskDescription, setCurrentTask, show }) => {
  const onClick = (e) => {
    setCurrentTask(e);
    show('taskPage', true);
  };
  return (
    <tr key={`${taskId}${taskName}`}>
      <td className={styles.tableData}>{taskId + 1}</td>
      <td className={styles.tableData}>
        <NavLink className={styles.link} to='/member_progress:userId?' data-taskid={taskId} onClick={onClick}>
          {taskName}
        </NavLink>
      </td>
      <td className={styles.tableData}>{taskDescription}</td>
      <td className={styles.tableData}>Here should be track date</td>
    </tr>
  );
};

MemberProgressData.propTypes = {
  taskId: PropTypes.number,
  taskName: PropTypes.string,
  taskDescription: PropTypes.string,
  setCurrentTask: PropTypes.func.isRequired,
  show: PropTypes.func.isRequired,
};
MemberProgressData.defaultProps = {
  taskId: 0,
  taskName: '',
  taskDescription: '',
};

export default MemberProgressData;
