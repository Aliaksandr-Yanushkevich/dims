import React from 'react';
import PropTypes from 'prop-types';
import Button from '../common/Button/Button';
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
  const isAdmin = role === 'admin';
  const isMentor = role === 'mentor';
  const isMember = role === 'member';
  const rateTask = (e) => {
    e.persist();
    const {
      target: {
        dataset: { taskid: currentTaskId },
        innerText,
      },
    } = e;
    firebaseApi.completeTask(currentTaskId, innerText);
  };

  return (
    <tr key={userTaskId}>
      <TableData>{index + 1}</TableData>
      <TableData>{taskName}</TableData>
      <TableData>{dateToString(startDate)}</TableData>
      <TableData>{dateToString(deadlineDate)}</TableData>
      <TableData>{stateName}</TableData>
      {isMember && (
        <TableData>
          <Button className={styles.defaultButton} taskId={userTaskId} dataId={taskName} onClick={trackTask}>
            Track
          </Button>
        </TableData>
      )}
      {(isAdmin || isMentor) && (
        <TableData>
          <div className={styles.buttonWrapper}>
            <Button className={styles.successButton} taskId={stateId} onClick={rateTask}>
              Success
            </Button>

            <Button className={styles.dangerousButton} taskId={stateId} onClick={rateTask}>
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
