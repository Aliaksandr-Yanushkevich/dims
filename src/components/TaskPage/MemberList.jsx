import React from 'react';
import PropTypes from 'prop-types';
import styles from './TaskPage.module.scss';

const MemberList = ({ members }) => {
  const memberNames = members.map(({ firstName, lastName, userId }) => (
    <li>
      <input type='checkbox' id={userId} />
      <label htmlFor={userId}>{`${firstName} ${lastName}`}</label>
    </li>
  ));
  return (
    <>
      <div className={styles.members}>
        <div className={styles.membersTitle}>Members</div>
        <div className={styles.membersItems}>
          <ul>{memberNames}</ul>
        </div>
      </div>
    </>
  );
};

MemberList.propTypes = {
  members: PropTypes.arrayOf(PropTypes.o).isRequired,
};

export default MemberList;
