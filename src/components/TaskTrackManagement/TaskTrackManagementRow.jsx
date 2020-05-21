import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import Button from '../Button/Button';
import styles from './TaskTrackManagement.module.scss';

const TasksTracksManagementRow = ({ index, taskName, userId, taskId, setCurrentUser, setCurrentTask, show }) => {
  const onClick = (e) => {
    setCurrentUser(e);
    setCurrentTask(e);
    show('taskTrackPage', true);
  };
  return (
    <tr key={userId}>
      <td className={styles.tableData}>{index}</td>
      <td className={styles.tableData}>
        <NavLink
          className={styles.link}
          to='/task_track_management'
          data-id={userId}
          data-taskid={taskId}
          onClick={onClick}
        >
          {taskName}
        </NavLink>
      </td>
      <td className={styles.tableData}>Note text</td>
      <td className={styles.tableData}>Note date</td>
      <td className={styles.tableData}>
        <div className={styles.buttonWrapper}>
          <Button dataId={userId} taskId={taskId} onClick={onClick}>
            Edit
          </Button>
          <NavLink className={styles.link} to='/task_track_management'>
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
  show: PropTypes.func.isRequired,
};

TasksTracksManagementRow.defaultProps = {
  taskId: '',
};

export default TasksTracksManagementRow;
