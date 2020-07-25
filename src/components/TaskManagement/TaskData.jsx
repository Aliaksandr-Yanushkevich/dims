import React from 'react';
import PropTypes from 'prop-types';
import Button from '../common/Button/Button';
import styles from './TaskManagement.module.scss';
import TableData from '../common/TableData/TableData';

const TaskData = ({ index, taskName, startDate, deadline, taskId, newTask, deleteTask, showTask }) => (
  <tr key={`${index}${taskName}`}>
    <TableData>{index + 1}</TableData>
    <TableData>
      <p className={styles.link} data-taskid={taskId} onClick={showTask}>
        {taskName}
      </p>
    </TableData>
    <TableData>{startDate}</TableData>
    <TableData>{deadline}</TableData>
    <TableData>
      <div className={styles.buttonWrapper}>
        <Button className={styles.defaultButton} taskId={taskId} onClick={newTask}>
          Edit
        </Button>

        <Button className={styles.dangerousButton} taskId={taskId} onClick={deleteTask}>
          Delete
        </Button>
      </div>
    </TableData>
  </tr>
);

TaskData.propTypes = {
  index: PropTypes.number,
  taskName: PropTypes.string,
  deadline: PropTypes.string,
  taskId: PropTypes.string,
  startDate: PropTypes.string,
  deleteTask: PropTypes.func.isRequired,
  newTask: PropTypes.func.isRequired,
  showTask: PropTypes.func.isRequired,
};

TaskData.defaultProps = {
  index: 1,
  startDate: '',
  deadline: '',
  taskId: '',
  taskName: '',
};

export default TaskData;
