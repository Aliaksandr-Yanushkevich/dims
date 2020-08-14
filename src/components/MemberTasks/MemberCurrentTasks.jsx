import React from 'react';
import PropTypes from 'prop-types';
import { ToastContainer } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faCheckCircle, faStickyNote, faTimes, faWindowClose } from '@fortawesome/free-solid-svg-icons';
import Button from '../common/Button/Button';
import dateToString from '../../helpers/dateToString';
import styles from './MembersTasks.module.scss';
import TableData from '../common/TableData/TableData';
import firebaseApi from '../../api/firebaseApi';
import showToast from '../../helpers/showToast';

const MemberCurrentTasks = ({
  index,
  taskId,
  userTaskId,
  taskName,
  startDate,
  deadlineDate,
  stateName,
  trackTask,
  stateId,
  role,
  showTask,
}) => {
  const isAdmin = role === 'admin';
  const isMentor = role === 'mentor';
  const isMember = role === 'member';
  const completeTask = (e) => {
    e.persist();
    const currentTaskId = e.target.closest('button').dataset.taskid;
    rateTask(currentTaskId, 'Success');
  };

  const rejectTask = (e) => {
    e.persist();
    const currentTaskId = e.target.closest('button').dataset.taskid;
    rateTask(currentTaskId, 'Fail');
  };

  const rateTask = (currentTaskId, status) => {
    firebaseApi.completeTask(currentTaskId, status).then((result) => {
      if (result) {
        showToast(result);
      }
    });
  };

  return (
    <>
      <ToastContainer />
      <tr key={userTaskId}>
        <TableData className={styles.memberTaskIndex}>{index + 1}</TableData>
        <TableData>
          <p className={styles.link} data-taskid={taskId} onClick={showTask}>
            {taskName}
          </p>
        </TableData>
        <TableData className={styles.memberTaskStart}>{dateToString(startDate)}</TableData>
        <TableData className={styles.memberTaskDeadline}>{dateToString(deadlineDate)}</TableData>
        <TableData className={styles.memberTaskStatus}>
          <p className={styles.memberTaskText}>{stateName}</p>
          {stateName === 'Success' && (
            <FontAwesomeIcon icon={faCheckCircle} className={styles.memberTaskIcon} size='2x' color='#227447' />
          )}
          {stateName === 'Fail' && (
            <FontAwesomeIcon icon={faWindowClose} className={styles.memberTaskIcon} size='2x' color='#d04b31' />
          )}
        </TableData>
        {isMember && (
          <TableData className={styles.memberTaskTrack}>
            <Button className={styles.defaultButton} taskId={userTaskId} dataId={taskName} onClick={trackTask}>
              <p className={styles.memberTaskButtonText}>Track</p>
              <FontAwesomeIcon icon={faStickyNote} className={styles.memberTaskButtonIcon} size='lg' />
            </Button>
          </TableData>
        )}
        {(isAdmin || isMentor) && (
          <TableData className={styles.memberTaskManage}>
            <div className={styles.buttonWrapper}>
              <Button
                className={`${styles.successButton} ${styles.leftButton}`}
                taskId={stateId}
                onClick={completeTask}
              >
                <p className={styles.memberTaskButtonText}>Success</p>
                <FontAwesomeIcon icon={faCheck} className={styles.memberTaskButtonIcon} size='lg' />
              </Button>

              <Button className={styles.dangerousButton} taskId={stateId} onClick={rejectTask}>
                <p className={styles.memberTaskButtonText}>Fail</p>
                <FontAwesomeIcon icon={faTimes} className={styles.memberTaskButtonIcon} size='lg' />
              </Button>
            </div>
          </TableData>
        )}
      </tr>
    </>
  );
};

MemberCurrentTasks.propTypes = {
  taskId: PropTypes.string.isRequired,
  stateName: PropTypes.string.isRequired,
  trackTask: PropTypes.func.isRequired,
  stateId: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  userTaskId: PropTypes.string.isRequired,
  taskName: PropTypes.string.isRequired,
  startDate: PropTypes.instanceOf(Date).isRequired,
  deadlineDate: PropTypes.instanceOf(Date).isRequired,
  role: PropTypes.string,
  showTask: PropTypes.func.isRequired,
};

MemberCurrentTasks.defaultProps = {
  role: '',
};

export default MemberCurrentTasks;
