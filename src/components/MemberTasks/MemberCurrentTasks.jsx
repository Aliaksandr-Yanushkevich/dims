import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import dateToString from '../../helpers/dateToString';
import styles from './MembersTasks.module.scss';
import TableData from '../common/TableData/TableData';
import firebaseApi from '../../api/firebaseApi';

const MemberCurrentTasks = ({
  index,
  userTaskId,
  taskName,
  startDate,
  deadlineDate,
  stateName,
  trackTask,
  stateId,
  role,
}) => {
  const succesedTask = (e) => {
    e.persist();
    const currentTaskId = e.target.dataset.taskid;
    firebaseApi.completeTask(currentTaskId, 'success');
  };

  const failedTask = (e) => {
    e.persist();
    const currentTaskId = e.target.dataset.taskid;
    firebaseApi.completeTask(currentTaskId, 'fail');
  };
  return (
    <tr key={userTaskId}>
      <TableData>{index + 1}</TableData>
      <TableData>{taskName}</TableData>
      <TableData>{dateToString(startDate)}</TableData>
      <TableData>{dateToString(deadlineDate)}</TableData>
      <TableData>{stateName}</TableData>
      <TableData>
        <Button data-taskid={userTaskId} data-id={taskName} onClick={trackTask}>
          Track
        </Button>
      </TableData>
      {(role === 'admin' || role === 'mentor') && (
        <TableData>
          <div className={styles.buttonWrapper}>
            <Button className={styles.successButton} data-taskid={stateId} onClick={succesedTask}>
              Success
            </Button>

            <Button className={styles.dangerousButton} data-taskid={stateId} onClick={failedTask}>
              Fail
            </Button>
          </div>
        </TableData>
      )}
    </tr>
  );
};

MemberCurrentTasks.propTypes = {
  stateName: PropTypes.string.isRequired,
  trackTask: PropTypes.func.isRequired,
  stateId: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  userTaskId: PropTypes.string.isRequired,
  taskName: PropTypes.string.isRequired,
  startDate: PropTypes.instanceOf(Date).isRequired,
  deadlineDate: PropTypes.instanceOf(Date).isRequired,
  role: PropTypes.string,
};

MemberCurrentTasks.defaultProps = {
  role: '',
};

export default MemberCurrentTasks;
