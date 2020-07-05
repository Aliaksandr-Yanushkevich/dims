import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
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
    <TableData>{index}</TableData>
    <TableData>
      <NavLink className={styles.link} to='/task_track_management' data-taskid={taskTrackId} onClick={editTask}>
        {taskName}
      </NavLink>
    </TableData>
    <TableData>{trackNote}</TableData>
    <TableData>{trackDate}</TableData>
    <TableData>
      <div className={styles.buttonWrapper}>
        <Button
          className={styles.defaultButton}
          taskId={taskTrackId}
          dataName={taskName}
          dataId={userTaskId}
          onClick={editTask}
        >
          Edit
        </Button>
        <NavLink className={styles.link} to='/task_track_management'>
          <Button className={styles.dangerousButton} taskId={taskTrackId} onClick={deleteNote}>
            Delete
          </Button>
        </NavLink>
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
