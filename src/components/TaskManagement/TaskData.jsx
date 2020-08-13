import React from 'react';
import PropTypes from 'prop-types';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '../common/Button/Button';
import styles from './TaskManagement.module.scss';
import TableData from '../common/TableData/TableData';

const TaskData = ({ index, taskName, startDate, deadline, taskId, newTask, deleteTask, showTask }) => (
  <tr key={`${index}${taskName}`}>
    <TableData className={styles.taskManagementIndex}>{index + 1}</TableData>
    <TableData className={styles.taskManagementTaskName}>
      <p className={styles.link} data-taskid={taskId} onClick={showTask}>
        {taskName}
      </p>
    </TableData>
    <TableData className={styles.taskManagementStartDate}>{startDate}</TableData>
    <TableData className={styles.taskManagementDeadline}>{deadline}</TableData>
    <TableData className={styles.taskManagementPanel}>
      <div className={styles.buttonWrapper}>
        <Button className={styles.defaultButton} taskId={taskId} onClick={newTask}>
          <p className={styles.taskManagementButtonText}>Edit</p>
          <FontAwesomeIcon icon={faEdit} className={styles.taskManagementButtonIcon} size='lg' />
        </Button>

        <Button className={styles.dangerousButton} taskId={taskId} onClick={deleteTask}>
          <p className={styles.taskManagementButtonText}>Delete</p>
          <FontAwesomeIcon icon={faTrashAlt} className={styles.taskManagementButtonIcon} size='lg' />
        </Button>
      </div>
    </TableData>
  </tr>
);

TaskData.propTypes = {
  index: PropTypes.number,
  taskName: PropTypes.string,
  deadline: PropTypes.string,
  taskId: PropTypes.string,
  startDate: PropTypes.string,
  deleteTask: PropTypes.func.isRequired,
  newTask: PropTypes.func.isRequired,
  showTask: PropTypes.func.isRequired,
};

TaskData.defaultProps = {
  index: 1,
  startDate: '',
  deadline: '',
  taskId: '',
  taskName: '',
};

export default TaskData;
