import React from 'react';
import PropTypes from 'prop-types';
import style from './MembersTasks.module.scss';

const MemberCurrentTasks = ({ taskId, taskName, startDate, deadLineDate }) => {
  return (
    <tr key={taskId}>
      <td>{taskId}</td>
      <td>{taskName}</td>
      <td>
        {startDate.getDate() < 10 ? `0${startDate.getDate()}` : startDate.getDate()}
        {startDate.getMonth() < 9 ? `0${startDate.getMonth() + 1}` : startDate.getMonth() + 1}
        {startDate.getFullYear()}
      </td>
      <td>
        {deadLineDate.getDate() < 10 ? `0${deadLineDate.getDate()}` : deadLineDate.getDate()}
        {'.'}
        {deadLineDate.getMonth() < 9 ? `0${deadLineDate.getMonth() + 1}` : deadLineDate.getMonth() + 1}
        {'.'}
        {deadLineDate.getFullYear()}
      </td>
      <td>Here should be task status</td>
      <td>
        <button type='button'>Track</button>
      </td>
      <td>
        <div className={style.buttonWrapper}>
          <button type='button' className={style.successButton}>
            Success
          </button>
          <button type='button' className={style.dangerousButton}>
            Fail
          </button>
        </div>
      </td>
    </tr>
  );
};

MemberCurrentTasks.propTypes = {
  taskId: PropTypes.string,
  taskName: PropTypes.string,
  startDate: PropTypes.instanceOf(Date),
  deadLineDate: PropTypes.instanceOf(Date),
};

MemberCurrentTasks.defaultProps = {
  taskId: 1,
  taskName: 'Task',
  startDate: new Date('December 17, 1995 03:24:00'),
  deadLineDate: new Date('December 18, 1995 03:24:00'),
};

export default MemberCurrentTasks;
