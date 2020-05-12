import React from 'react';
import { NavLink } from 'react-router-dom';
import Button from '../Button/Button';
import styles from './TaskTrackManagement.module.scss';

const TasksTracksManagementRow = ({ index, taskName, userId, taskId, setCurrentUser, setCurrentTask }) => {
  return (
    <tr key={index}>
      <td>{index}</td>
      <td>
        <NavLink
          to='/task_track'
          data-id={userId}
          data-taskid={taskId}
          onClick={(e) => {
            setCurrentUser(e);
            setCurrentTask(e);
          }}
        >
          {taskName}
        </NavLink>
      </td>
      <td>Note text</td>
      <td>Note date</td>
      <td>
        <div className={styles.buttonWrapper}>
          <NavLink to='/task_track'>
            <Button
              buttonText='Edit'
              dataId={userId}
              taskId={taskId}
              onClick={(e) => {
                setCurrentUser(e);
                setCurrentTask(e);
              }}
            />
          </NavLink>
          <NavLink to='/task_track_management'>
            <Button buttonText='Delete' className={styles.dangerousButton} dataId={userId} />
          </NavLink>
        </div>
      </td>
    </tr>
  );
};

export default TasksTracksManagementRow;
