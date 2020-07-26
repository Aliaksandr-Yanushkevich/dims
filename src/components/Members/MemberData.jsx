import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import Button from '../common/Button/Button';
import dateToString from '../../helpers/dateToString';
import styles from './Members.module.scss';
import TableData from '../common/TableData/TableData';
import getAge from '../../helpers/getAge';
import NavButton from '../common/NavButton/NavButton';

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
  showMember,
  role,
}) => {
  const isAdmin = role === 'admin';
  const buttonWrapper = useRef(null);

  if (buttonWrapper.current) {
    if (isAdmin) {
      buttonWrapper.current.style.gridTemplateRows = '1fr 1fr';
    } else {
      buttonWrapper.current.style.gridTemplateRows = '1fr';
    }
  }

  const age = getAge(birthDate);
  const setUser = (e) => {
    // need persist ???
    const { id } = e.target.dataset;
    setCurrentUser(id);
  };
  const direction = directions
    ? directions.find((courseDirection) => {
        return courseDirection.directionId === directionId;
      }).name
    : null;

  return (
    <tr key={userId}>
      <TableData>{index}</TableData>
      <TableData>
        <p className={styles.link} data-id={userId} onClick={showMember}>
          {`${firstName} ${lastName}`}
        </p>
      </TableData>
      <TableData>{direction}</TableData>
      <TableData>{education}</TableData>
      <TableData>{dateToString(startDate)}</TableData>
      <TableData>{age}</TableData>
      <TableData>
        <div className={styles.buttonWrapper} ref={buttonWrapper}>
          <NavButton
            className={styles.link}
            to='/member_progress'
            buttonClassName={styles.defaultButton}
            dataId={userId}
            onClick={setUser}
          >
            Progress
          </NavButton>

          <NavButton
            className={styles.link}
            to='/member_tasks'
            buttonClassName={styles.defaultButton}
            dataId={userId}
            onClick={setUser}
          >
            Tasks
          </NavButton>
          {isAdmin && (
            <>
              <Button className={styles.defaultButton} dataId={userId} onClick={createUser}>
                Edit
              </Button>

              <Button className={styles.dangerousButton} dataId={userId} onClick={deleteUser}>
                Delete
              </Button>
            </>
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
  showMember: PropTypes.func.isRequired,
  role: PropTypes.string.isRequired,
  directions: PropTypes.arrayOf(PropTypes.shape({ subProp: PropTypes.string })),
};

MemberData.defaultProps = {
  directions: [{}],
};

export default MemberData;
