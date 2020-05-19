import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import Button from '../Button/Button';
import styles from './TaskTrackManagement.module.scss';

const TasksTracksManagementRow = ({
  index,
  taskName,
  userId,
  taskId,
  setCurrentUser,
  setCurrentTask,
  showTaskTrack,
}) => {
  return (
    <tr key={userId}>
      <td>{index}</td>
      <td>
        <NavLink
          to='/task_track_management'
          data-id={userId}
          data-taskid={taskId}
          onClick={(e) => {
            setCurrentUser(e);
            setCurrentTask(e);
            showTaskTrack(true);
          }}
        >
          {taskName}
        </NavLink>
      </td>
      <td>Note text</td>
      <td>Note date</td>
      <td>
        <div className={styles.buttonWrapper}>
          <Button
            dataId={userId}
            taskId={taskId}
            onClick={(e) => {
              setCurrentUser(e);
              setCurrentTask(e);
              showTaskTrack(true);
            }}
          >
            Edit
          </Button>
          <NavLink to='/task_track_management'>
            <Button className={styles.dangerousButton} dataId={userId}>
              Delete
            </Button>
          </NavLink>
        </div>
      </td>
    </tr>
  );
};

TasksTracksManagementRow.propTypes = {
  index: PropTypes.number.isRequired,
  taskName: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  taskId: PropTypes.string,
  setCurrentUser: PropTypes.func.isRequired,
  setCurrentTask: PropTypes.func.isRequired,
  showTaskTrack: PropTypes.func.isRequired,
};

TasksTracksManagementRow.defaultProps = {
  taskId: '',
};

export default TasksTracksManagementRow;
