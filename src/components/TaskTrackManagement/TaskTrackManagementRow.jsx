import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import Button from '../common/Button/Button';
import styles from './TaskTrackManagement.module.scss';
import TableData from '../common/TableData/TableData';

const TasksTracksManagementRow = ({
  index,
  taskTrackId,
  taskName,
  trackNote,
  editTask,
  trackDate,
  userTaskId,
  deleteNote,
}) => (
  <tr key={taskTrackId}>
    <TableData className={styles.taskTrackManagementIndex}>{index}</TableData>
    <TableData className={styles.taskTrackManagementName}>
      <NavLink className={styles.link} to='/task_track_management' data-taskid={taskTrackId} onClick={editTask}>
        {taskName}
      </NavLink>
    </TableData>
    <TableData className={styles.taskTrackManagementNote}>{trackNote}</TableData>
    <TableData className={styles.taskTrackManagementDate}>{trackDate}</TableData>
    <TableData className={styles.taskTrackManagementPanel}>
      <div className={styles.buttonWrapper}>
        <Button
          className={styles.defaultButton}
          taskId={taskTrackId}
          dataName={taskName}
          dataId={userTaskId}
          onClick={editTask}
        >
          <p className={styles.taskTrackManagementButtonText}>Edit</p>
          <FontAwesomeIcon icon={faEdit} className={styles.taskTrackManagementButtonIcon} size='lg' />
        </Button>

        <Button className={styles.dangerousButton} taskId={taskTrackId} onClick={deleteNote}>
          <p className={styles.taskTrackManagementButtonText}>Delete</p>
          <FontAwesomeIcon icon={faTrashAlt} className={styles.taskTrackManagementButtonIcon} size='lg' />
        </Button>
      </div>
    </TableData>
  </tr>
);

TasksTracksManagementRow.propTypes = {
  index: PropTypes.number.isRequired,
  userTaskId: PropTypes.string.isRequired,
  taskName: PropTypes.string.isRequired,
  editTask: PropTypes.func.isRequired,
  taskTrackId: PropTypes.string.isRequired,
  trackNote: PropTypes.string.isRequired,
  trackDate: PropTypes.string.isRequired,
  deleteNote: PropTypes.func.isRequired,
};

export default TasksTracksManagementRow;
