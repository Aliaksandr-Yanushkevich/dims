import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './TaskManagement.module.scss';
import Button from '../Button/Button';

const TaskData = ({
  index,
  taskName,
  startDate,
  deadline,
  userId,
  taskId,
  setCurrentUser,
  setCurrentTask,
  showTask,
}) => {
  return (
    <tr key={`${index}${taskName}`}>
      <td>{index + 1}</td>
      <td>
        <NavLink
          to='/task_page'
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
      <td>{startDate}</td>
      <td>{deadline}</td>
      <td>
        <div className={styles.buttonWrapper}>
          <Button
            dataId={userId}
            taskId={taskId}
            onClick={(e) => {
              setCurrentUser(e);
              setCurrentTask(e);
              showTask(true);
            }}
          >
            Edit
          </Button>

          <NavLink to='/task_management'>
            <Button className={styles.dangerousButton} dataId={userId}>
              Delete
            </Button>
          </NavLink>
        </div>
      </td>
    </tr>
  );
};

TaskData.propTypes = {
  index: PropTypes.number,
  taskName: PropTypes.string,
  deadline: PropTypes.instanceOf(Date),
  taskId: PropTypes.number,
  setCurrentTask: PropTypes.func.isRequired,
  showTask: PropTypes.func.isRequired,
  startDate: PropTypes.instanceOf(Date),
  userId: PropTypes.string,
  setCurrentUser: PropTypes.func.isRequired,
};
TaskData.defaultProps = {
  index: 1,
  startDate: new Date('December 17, 1995 03:24:00'),
  deadline: new Date('December 18, 1995 03:24:00'),
  userId: '',
  taskId: 0,
  taskName: '',
};

export default TaskData;
