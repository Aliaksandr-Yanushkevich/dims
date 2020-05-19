import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import dateToString from '../common/dateToString';
import styles from './MembersTasks.module.scss';
import Button from '../Button/Button';

const MemberCurrentTasks = ({ taskId, taskName, startDate, deadLineDate, setCurrentTask, showTaskTrack }) => {
  return (
    <tr key={`${taskId}${taskName}`}>
      <td>{taskId}</td>
      <td>{taskName}</td>
      <td>{dateToString(startDate)}</td>
      <td>{dateToString(deadLineDate)}</td>
      <td>Here should be task status</td>
      <td>
        <Button
          taskId={taskId}
          onClick={(e) => {
            setCurrentTask(e);
            showTaskTrack(true);
          }}
        >
          Track
        </Button>
      </td>
      <td>
        <div className={styles.buttonWrapper}>
          <NavLink to='/member_success'>
            <Button className={styles.successButton}>Success</Button>
          </NavLink>
          <NavLink to='/member_fail'>
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
  showTaskTrack: PropTypes.func.isRequired,
};

MemberCurrentTasks.defaultProps = {
  taskId: 0,
  taskName: '',
  startDate: new Date(),
  deadLineDate: new Date(),
};

export default MemberCurrentTasks;
