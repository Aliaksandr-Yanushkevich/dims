import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './TaskManagement.module.scss';
import Button from '../Button/Button';

const TaskData = ({ index, taskName, startDate, deadline, userId, taskId, setCurrentUser, setCurrentTask, show }) => {
  const onClick = (e) => {
    setCurrentUser(e);
    setCurrentTask(e);
    show('taskPage', true);
  };
  return (
    <tr key={`${index}${taskName}`}>
      <td className={styles.tableData}>{index + 1}</td>
      <td className={styles.tableData}>
        <NavLink className={styles.link} to='/task_management' data-id={userId} data-taskid={taskId} onClick={onClick}>
          {taskName}
        </NavLink>
      </td>
      <td className={styles.tableData}>{startDate}</td>
      <td className={styles.tableData}>{deadline}</td>
      <td className={styles.tableData}>
        <div className={styles.buttonWrapper}>
          <Button dataId={userId} taskId={taskId} onClick={onClick}>
            Edit
          </Button>

          <NavLink className={styles.link} to='/task_management'>
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
  show: PropTypes.func.isRequired,
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
