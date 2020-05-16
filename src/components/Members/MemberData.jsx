import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import dateToString from '../common/dateToString';
import styles from './Members.module.scss';
import Button from '../Button/Button';

const MemberData = ({
  index,
  firstName,
  lastName,
  direction,
  education,
  startDate,
  age,
  userId,
  setCurrentUser,
  deleteMember,
  createMember,
}) => {
  return (
    <tr key={index}>
      <td>{index}</td>
      <td>{`${firstName} ${lastName}`}</td>
      <td>{direction}</td>
      <td>{education}</td>
      <td>{dateToString(startDate)}</td>
      <td>{age}</td>
      <td>
        <div className={styles.buttonWrapper}>
          <NavLink to='/member_progress'>
            <Button buttonText='Progress' dataId={userId} onClick={setCurrentUser} />
          </NavLink>
          <NavLink to='/member_tasks'>
            <Button buttonText='Tasks' dataId={userId} onClick={setCurrentUser} />
          </NavLink>
          <Button buttonText='Edit' dataId={userId} onClick={createMember} />
          <NavLink to='/member_delete'>
            <Button
              buttonText='Delete'
              dataId={userId}
              onClick={() => deleteMember(userId)}
              className={styles.dangerousButton}
            />
          </NavLink>
        </div>
      </td>
    </tr>
  );
};

MemberData.propTypes = {
  index: PropTypes.number,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  direction: PropTypes.string,
  education: PropTypes.string,
  startDate: PropTypes.instanceOf(Date),
  age: PropTypes.number,
  userId: PropTypes.string,
  setCurrentUser: PropTypes.func,
  editMember: PropTypes.func,
  deleteMember: PropTypes.func,
};
MemberData.defaultProps = {
  index: 1,
  firstName: 'Ivan',
  lastName: 'Ivanov',
  direction: 'Javascript',
  education: 'PSU',
  startDate: new Date('December 17, 1995 03:24:00'),
  age: 28,
  userId: '4iKBUOYjXypfQT9Uv9JA',
};

export default MemberData;
