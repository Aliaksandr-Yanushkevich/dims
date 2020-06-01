import React from 'react';
import PropTypes from 'prop-types';
import dateToString from '../../helpers/dateToString';
import styles from './MembersTasks.module.scss';
import Button from '../Button/Button';
import TableData from '../common/TableData/TableData';
import firebaseTrueApi from '../../api/firebaseTrueApi';

const MemberCurrentTasks = ({
  index,
  userTaskId,
  taskName,
  startDate,
  deadlineDate,
  stateName,
  trackTask,
  stateId,
}) => {
  const succesedTask = (e) => {
    e.persist();
    const currentTaskId = e.target.dataset.taskid;
    firebaseTrueApi.completeTask(currentTaskId, 'success');
  };

  const failedTask = (e) => {
    e.persist();
    const currentTaskId = e.target.dataset.taskid;
    firebaseTrueApi.completeTask(currentTaskId, 'fail');
  };
  return (
    <tr key={userTaskId}>
      <TableData>{index + 1}</TableData>
      <TableData>{taskName}</TableData>
      <TableData>{dateToString(startDate)}</TableData>
      <TableData>{dateToString(deadlineDate)}</TableData>
      <TableData>{stateName}</TableData>
      <TableData>
        <Button taskId={userTaskId} dataId={taskName} onClick={trackTask}>
          Track
        </Button>
      </TableData>
      <TableData>
        <div className={styles.buttonWrapper}>
          <Button className={styles.successButton} taskId={stateId} onClick={succesedTask}>
            Success
          </Button>

          <Button className={styles.dangerousButton} taskId={stateId} onClick={failedTask}>
            Fail
          </Button>
        </div>
      </TableData>
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
};

export default MemberCurrentTasks;
