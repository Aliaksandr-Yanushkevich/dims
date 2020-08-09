import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine, faTasks, faUserEdit, faUserTimes } from '@fortawesome/free-solid-svg-icons';
import Button from '../common/Button/Button';
import dateToString from '../../helpers/dateToString';
import styles from './Members.module.scss';
import TableData from '../common/TableData/TableData';
import getAge from '../../helpers/getAge';
import NavButton from '../common/NavButton/NavButton';
import getDirectionIcon from '../../helpers/getDirectionIcon';

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
    const { id } = e.target.closest('button').dataset;
    setCurrentUser(id);
  };
  const direction =
    directions && directionId !== undefined
      ? directions.find((courseDirection) => {
          return courseDirection.directionId === directionId;
        }).name
      : null;
  const directionIcon = getDirectionIcon(direction);

  return (
    <tr key={userId}>
      <TableData className={styles.memberIndex}>{index}</TableData>
      <TableData className={styles.memberName}>
        <div className={styles.link} data-id={userId} onClick={showMember}>
          <p>{firstName}</p>
          <p>{lastName}</p>
        </div>
      </TableData>
      <TableData className={styles.memberDirection}>
        <p className={styles.directionText}>{direction}</p>
        <div className={styles.directionIcon}>{directionIcon}</div>
      </TableData>
      <TableData className={styles.memberEducation}>{education}</TableData>
      <TableData className={styles.memberStartDate}>{dateToString(startDate)}</TableData>
      <TableData className={styles.memberAge}>{age}</TableData>
      <TableData className={styles.memberButtons}>
        <div className={styles.buttonWrapper} ref={buttonWrapper}>
          <NavButton
            className={styles.link}
            to='/member_progress'
            buttonClassName={styles.defaultButton}
            dataId={userId}
            onClick={setUser}
          >
            <p className={styles.membersButtonText}>Progress</p>
            <FontAwesomeIcon icon={faChartLine} className={styles.membersButtonIcon} size='lg' />
          </NavButton>

          <NavButton
            className={styles.link}
            to='/member_tasks'
            buttonClassName={styles.defaultButton}
            dataId={userId}
            onClick={setUser}
          >
            <p className={styles.membersButtonText}>Tasks</p>
            <FontAwesomeIcon icon={faTasks} className={styles.membersButtonIcon} size='lg' />
          </NavButton>
          {isAdmin && (
            <>
              <Button className={styles.defaultButton} dataId={userId} onClick={createUser}>
                <p className={styles.membersButtonText}>Edit</p>
                <FontAwesomeIcon icon={faUserEdit} className={styles.membersButtonIcon} size='lg' />
              </Button>

              <Button className={styles.dangerousButton} dataId={userId} onClick={deleteUser}>
                <p className={styles.membersButtonText}>Delete</p>
                <FontAwesomeIcon icon={faUserTimes} className={styles.membersButtonIcon} size='lg' />
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
