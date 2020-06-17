import React from 'react';
import PropTypes from 'prop-types';
import styles from './TaskPage.module.scss';

const MemberList = ({ members, asignTask, usersWithTaskLocal }) => {
  const handleTask = (e) => {
    const { id, checked } = e.currentTarget;
    asignTask(id, checked);
  };
  const memberNames = members.map(({ firstName, lastName, userId }) => (
    <li key={userId}>
      <input
        type='checkbox'
        id={userId}
        onChange={handleTask}
        checked={usersWithTaskLocal ? usersWithTaskLocal.includes(userId) : false}
      />
      <label htmlFor={userId}>{`${firstName} ${lastName}`}</label>
    </li>
  ));
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

MemberList.propTypes = {
  members: PropTypes.arrayOf(PropTypes.object).isRequired,
  asignTask: PropTypes.func.isRequired,
  usersWithTaskLocal: PropTypes.arrayOf(PropTypes.string),
};

MemberList.defaultProps = {
  usersWithTaskLocal: [],
};

export default MemberList;
