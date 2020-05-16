import React from 'react';
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
    <tr key={index}>
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
            buttonText='Edit'
            dataId={userId}
            taskId={taskId}
            onClick={(e) => {
              setCurrentUser(e);
              setCurrentTask(e);
              showTaskTrack(true);
            }}
          />

          <NavLink to='/task_track_management'>
            <Button buttonText='Delete' className={styles.dangerousButton} dataId={userId} />
          </NavLink>
        </div>
      </td>
    </tr>
  );
};

export default TasksTracksManagementRow;
