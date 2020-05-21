import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import dateToString from '../common/dateToString';
import styles from './MembersTasks.module.scss';
import Button from '../Button/Button';

const MemberCurrentTasks = ({ taskId, taskName, startDate, deadLineDate, setCurrentTask, show }) => {
  const onClick = (e) => {
    setCurrentTask(e);
    show('taskTrackPage', true);
  };
  return (
    <tr key={`${taskId}${taskName}`}>
      <td className={styles.tableData}>{taskId}</td>
      <td className={styles.tableData}>{taskName}</td>
      <td className={styles.tableData}>{dateToString(startDate)}</td>
      <td className={styles.tableData}>{dateToString(deadLineDate)}</td>
      <td className={styles.tableData}>Here should be task status</td>
      <td className={styles.tableData}>
        <Button taskId={taskId} onClick={onClick}>
          Track
        </Button>
      </td>
      <td className={styles.tableData}>
        <div className={styles.buttonWrapper}>
          <NavLink className={styles.link} to='/member_success'>
            <Button className={styles.successButton}>Success</Button>
          </NavLink>
          <NavLink className={styles.link} to='/member_fail'>
            <Button className={styles.dangerousButton}>Fail</Button>
          </NavLink>
        </div>
      </td>
    </tr>
  );
};

MemberCurrentTasks.propTypes = {
  taskId: PropTypes.number,
  taskName: PropTypes.string,
  startDate: PropTypes.instanceOf(Date),
  deadLineDate: PropTypes.instanceOf(Date),
  setCurrentTask: PropTypes.func.isRequired,
  show: PropTypes.func.isRequired,
};

MemberCurrentTasks.defaultProps = {
  taskId: 0,
  taskName: '',
  startDate: new Date(),
  deadLineDate: new Date(),
};

export default MemberCurrentTasks;
