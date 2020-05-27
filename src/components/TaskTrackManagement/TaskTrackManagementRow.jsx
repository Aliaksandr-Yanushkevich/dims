import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import Button from '../Button/Button';
import styles from './TaskTrackManagement.module.scss';
import TableData from '../common/TableData/TableData';

const TasksTracksManagementRow = ({ index, taskName, userId, taskId, editTask }) => {
  return (
    <tr key={userId}>
      <TableData>{index}</TableData>
      <TableData>
        <NavLink
          className={styles.link}
          to='/task_track_management'
          data-id={userId}
          data-taskid={taskId}
          onClick={editTask}
        >
          {taskName}
        </NavLink>
      </TableData>
      <TableData>Note text</TableData>
      <TableData>Note date</TableData>
      <TableData>
        <div className={styles.buttonWrapper}>
          <Button dataId={userId} taskId={taskId} onClick={editTask}>
            Edit
          </Button>
          <NavLink className={styles.link} to='/task_track_management'>
            <Button className={styles.dangerousButton} dataId={userId}>
              Delete
            </Button>
          </NavLink>
        </div>
      </TableData>
    </tr>
  );
};

TasksTracksManagementRow.propTypes = {
  index: PropTypes.number.isRequired,
  taskName: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  taskId: PropTypes.string,
  editTask: PropTypes.func.isRequired,
};

TasksTracksManagementRow.defaultProps = {
  taskId: '',
};

export default TasksTracksManagementRow;
