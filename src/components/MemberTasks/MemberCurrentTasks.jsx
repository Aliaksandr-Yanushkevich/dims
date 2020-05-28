import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import dateToString from '../../helpers/dateToString';
import styles from './MembersTasks.module.scss';
import Button from '../Button/Button';
import TableData from '../common/TableData/TableData';

const MemberCurrentTasks = ({ taskId, taskName, startDate, deadLineDate, editTask }) => {
  return (
    <tr key={`${taskId}${taskName}`}>
      <TableData>{taskId}</TableData>
      <TableData>{taskName}</TableData>
      <TableData>{dateToString(startDate)}</TableData>
      <TableData>{dateToString(deadLineDate)}</TableData>
      <TableData>Here should be task status</TableData>
      <TableData>
        <Button taskId={taskId} onClick={editTask}>
          Track
        </Button>
      </TableData>
      <TableData>
        <div className={styles.buttonWrapper}>
          <NavLink className={styles.link} to='/member_success'>
            <Button className={styles.successButton}>Success</Button>
          </NavLink>
          <NavLink className={styles.link} to='/member_fail'>
            <Button className={styles.dangerousButton}>Fail</Button>
          </NavLink>
        </div>
      </TableData>
    </tr>
  );
};

MemberCurrentTasks.propTypes = {
  taskId: PropTypes.number,
  taskName: PropTypes.string,
  startDate: PropTypes.instanceOf(Date),
  deadLineDate: PropTypes.instanceOf(Date),
  editTask: PropTypes.func.isRequired,
};

MemberCurrentTasks.defaultProps = {
  taskId: 0,
  taskName: '',
  startDate: new Date(),
  deadLineDate: new Date(),
};

export default MemberCurrentTasks;
