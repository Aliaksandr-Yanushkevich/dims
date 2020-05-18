import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import dateToString from '../common/dateToString';
import styles from './MembersTasks.module.scss';
import Button from '../Button/Button';

const MemberCurrentTasks = ({ taskId, taskName, startDate, deadLineDate }) => (
  <tr key={taskId}>
    <td>{taskId}</td>
    <td>{taskName}</td>
    <td>{dateToString(startDate)}</td>
    <td>{dateToString(deadLineDate)}</td>
    <td>Here should be task status</td>
    <td>
      <NavLink to='/member_track'>
        <Button buttonText='Track' />
      </NavLink>
    </td>
    <td>
      <div className={styles.buttonWrapper}>
        <NavLink to='/member_success'>
          <Button buttonText='Success' className={styles.successButton} />
        </NavLink>
        <NavLink to='/member_fail'>
          <Button buttonText='Fail' className={styles.dangerousButton} />
        </NavLink>
      </div>
    </td>
  </tr>
);

MemberCurrentTasks.propTypes = {
  taskId: PropTypes.string,
  taskName: PropTypes.string,
  startDate: PropTypes.instanceOf(Date),
  deadLineDate: PropTypes.instanceOf(Date),
};

export default MemberCurrentTasks;
