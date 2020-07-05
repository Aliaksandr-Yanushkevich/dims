import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import Button from '../common/Button/Button';
import dateToString from '../../helpers/dateToString';
import styles from './Members.module.scss';
import TableData from '../common/TableData/TableData';
import getAge from '../../helpers/getAge';

const MemberData = ({
  index,
  firstName,
  lastName,
  birthDate,
  directionId,
  directions,
  education,
  startDate,
  userId,
  setCurrentUser,
  deleteUser,
  createUser,
  role,
}) => {
  const buttonWrappers = document.querySelectorAll(`.${styles.buttonWrapper}`);
  if (role === 'admin') {
    buttonWrappers.forEach((wrapper) => {
      wrapper.style.gridTemplateRows = '1fr 1fr';
    });
  } else {
    buttonWrappers.forEach((wrapper) => {
      wrapper.style.gridTemplateRows = '1fr';
    });
  }

  const age = getAge(birthDate);
  const direction = directions
    ? directions.filter((courseDirection) => {
        return courseDirection.directionId === directionId;
      })[0].name
    : null;

  return (
    <tr key={userId}>
      <TableData>{index}</TableData>
      <TableData>
        <NavLink className={styles.link} to='/members' data-id={userId} onClick={createUser}>
          {`${firstName} ${lastName}`}
        </NavLink>
      </TableData>
      <TableData>{direction}</TableData>
      <TableData>{education}</TableData>
      <TableData>{dateToString(startDate)}</TableData>
      <TableData>{age}</TableData>
      <TableData>
        <div className={styles.buttonWrapper}>
          <NavLink className={styles.link} to='/member_progress'>
            <Button className={styles.defaultButton} dataId={userId} onClick={setCurrentUser}>
              Progress
            </Button>
          </NavLink>
          <NavLink className={styles.link} to='/member_tasks'>
            <Button className={styles.defaultButton} dataId={userId} onClick={setCurrentUser}>
              Tasks
            </Button>
          </NavLink>
          {role === 'admin' && (
            <Button className={styles.defaultButton} dataId={userId} onClick={createUser}>
              Edit
            </Button>
          )}
          {role === 'admin' && (
            <Button className={styles.dangerousButton} dataId={userId} onClick={deleteUser}>
              Delete
            </Button>
          )}
        </div>
      </TableData>
    </tr>
  );
};

MemberData.propTypes = {
  index: PropTypes.number.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  directionId: PropTypes.number.isRequired,
  education: PropTypes.string.isRequired,
  startDate: PropTypes.instanceOf(Date).isRequired,
  birthDate: PropTypes.instanceOf(Date).isRequired,
  userId: PropTypes.string.isRequired,
  setCurrentUser: PropTypes.func.isRequired,
  deleteUser: PropTypes.func.isRequired,
  createUser: PropTypes.func.isRequired,
  role: PropTypes.string.isRequired,
};

export default MemberData;
