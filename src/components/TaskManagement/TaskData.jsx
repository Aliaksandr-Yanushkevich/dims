import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './TaskManagement.module.scss';
import Button from '../Button/Button';
import TableData from '../common/TableData/TableData';

const TaskData = ({ index, taskName, startDate, deadline, taskId, newTask, deleteTask }) => {
  return (
    <tr key={`${index}${taskName}`}>
      <TableData>{index + 1}</TableData>
      <TableData>
        <NavLink className={styles.link} to='/task_management' data-taskid={taskId} onClick={newTask}>
          {taskName}
        </NavLink>
      </TableData>
      <TableData>{startDate}</TableData>
      <TableData>{deadline}</TableData>
      <TableData>
        <div className={styles.buttonWrapper}>
          <Button taskId={taskId} onClick={newTask}>
            Edit
          </Button>

          <NavLink className={styles.link} to='/task_management'>
            <Button className={styles.dangerousButton} taskId={taskId} onClick={deleteTask}>
              Delete
            </Button>
          </NavLink>
        </div>
      </TableData>
    </tr>
  );
};

TaskData.propTypes = {
  index: PropTypes.number,
  taskName: PropTypes.string,
  deadline: PropTypes.instanceOf(Date),
  taskId: PropTypes.number,
  setCurrentTask: PropTypes.func.isRequired,
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
