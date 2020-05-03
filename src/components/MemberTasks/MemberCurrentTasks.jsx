import React from 'react';
import style from './MembersTasks.module.scss';

const MemberCurrentTasks = ({ taskId, taskName, startDate, deadLineDate }) => {
  return (
    <tr key={taskId}>
      <td>{taskId}</td>
      <td>{taskName}</td>
      <td>
        {startDate.getDate() < 10 ? `0${startDate.getDate()}` : startDate.getDate()}.
        {startDate.getMonth() < 9 ? `0${startDate.getMonth() + 1}` : startDate.getMonth() + 1}.{startDate.getFullYear()}
      </td>
      <td>
        {deadLineDate.getDate() < 10 ? `0${deadLineDate.getDate()}` : deadLineDate.getDate()}.
        {deadLineDate.getMonth() < 9 ? `0${deadLineDate.getMonth() + 1}` : deadLineDate.getMonth() + 1}.
        {deadLineDate.getFullYear()}
      </td>
      <td>Here should be task status</td>
      <td>
        <button>Track</button>
      </td>
      <td>
        <div className={style.buttonWrapper}>
          <button className={style.successButton}>Success</button>
          <button className={style.dangerousButton}>Fail</button>
        </div>
      </td>
    </tr>
  );
};

export default MemberCurrentTasks;
