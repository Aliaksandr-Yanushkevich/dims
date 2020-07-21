import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import generateID from '../../helpers/generateID';
import styles from './TaskPage.module.scss';
import { setUsersWithTask, setUserTasks } from '../../redux/reducers/taskPageReducer';

const MemberList = ({
  members,
  usersWithTaskLocal,
  userTasks,
  usersWithTaskFromDB,
  taskId,
  setUserTasks,
  setUsersWithTask,
}) => {
  const asignTask = (e) => {
    const { id, checked } = e.currentTarget;
    const stateId = generateID();
    const userTaskId = generateID();
    let memberTasks = userTasks;
    if (checked) {
      if (!usersWithTaskFromDB.includes(id)) {
        memberTasks = [...memberTasks, { id, taskId, stateId, userTaskId }];
      }
      setUsersWithTask([...usersWithTaskLocal, id]);
    } else {
      memberTasks = memberTasks.filter((member) => member.id !== id);
      setUsersWithTask(usersWithTaskLocal.filter((memberId) => memberId !== id));
    }
    setUserTasks(memberTasks);
  };

  const memberNames = members
    ? members.map(({ firstName, lastName, userId }) => (
        <li key={userId}>
          <input
            type='checkbox'
            id={userId}
            onChange={asignTask}
            checked={usersWithTaskLocal ? usersWithTaskLocal.includes(userId) : false}
          />
          <label htmlFor={userId}>{`${firstName} ${lastName}`}</label>
        </li>
      ))
    : null;
  return (
    <>
      <div className={styles.members}>
        <div className={styles.membersTitle}>Members:</div>
        <div className={styles.membersItems}>
          <ul>{memberNames}</ul>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  // destructure can not be used here because naming conflict between members reducer and members field
  const { userTasks, usersWithTaskFromDB, taskId, usersWithTaskLocal } = state.taskPage;
  const { members } = state.members;
  return { userTasks, usersWithTaskFromDB, taskId, members, usersWithTaskLocal };
};

MemberList.propTypes = {
  members: PropTypes.arrayOf(PropTypes.shape({ subProp: PropTypes.string })).isRequired,
  usersWithTaskLocal: PropTypes.arrayOf(PropTypes.string),
  userTasks: PropTypes.arrayOf(PropTypes.shape({ subProp: PropTypes.string })),
  usersWithTaskFromDB: PropTypes.arrayOf(PropTypes.string),
  taskId: PropTypes.string,
  setUserTasks: PropTypes.func.isRequired,
  setUsersWithTask: PropTypes.func.isRequired,
};

MemberList.defaultProps = {
  usersWithTaskLocal: [],
  taskId: '',
  usersWithTaskFromDB: [],
  userTasks: [],
};

export default connect(mapStateToProps, { setUserTasks, setUsersWithTask })(MemberList);
