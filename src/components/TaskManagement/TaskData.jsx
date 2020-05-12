import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import dateToString from '../common/dateToString';
import styles from './TaskManagement.module.scss';
import Button from '../Button/Button';

const TaskData = ({ index, taskName, startDate, deadline, userId, taskId, setCurrentUser, setCurrentTask }) => {
  return (
    <tr key={index}>
      <td>{index}</td>
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
          <NavLink to='/task_page'>
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
          <NavLink to='/task_management'>
            <Button buttonText='Delete' className={styles.dangerousButton} dataId={userId} />
          </NavLink>
        </div>
      </td>
    </tr>
  );
};

// TaskData.propTypes = {
//   index: PropTypes.number,
//   firstName: PropTypes.string,
//   lastName: PropTypes.string,
//   direction: PropTypes.string,
//   education: PropTypes.string,
//   startDate: PropTypes.instanceOf(Date),
//   age: PropTypes.number,
//   userId: PropTypes.string,
//   setCurrentUser: PropTypes.func,
//   editMember: PropTypes.func,
//   deleteMember: PropTypes.func,
// };
// TaskData.defaultProps = {
//   index: 1,
//   firstName: 'Ivan',
//   lastName: 'Ivanov',
//   direction: 'Javascript',
//   education: 'PSU',
//   startDate: new Date('December 17, 1995 03:24:00'),
//   age: 28,
//   userId: '4iKBUOYjXypfQT9Uv9JA',
// };

export default TaskData;
