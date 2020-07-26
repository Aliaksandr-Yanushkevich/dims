import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { ToastContainer } from 'react-toastify';
import styles from './MemberCard.module.scss';
import Button from '../common/Button/Button';
import showToast from '../../helpers/showToast';
import Preloader from '../common/Preloader/Preloader';

const MemberCard = ({
  firstName,
  lastName,
  sex,
  mobilePhone,
  email,
  startDate,
  skype,
  birthDate,
  directionId,
  address,
  education,
  mathScore,
  universityAverageScore,
  hideMemberCard,
  message,
  isFetching,
}) => {
  if (message) {
    showToast(message);
  }
  if (isFetching) {
    return <Preloader />;
  }
  return (
    <>
      <ToastContainer />
      <div className={styles.wrapper}>
        <h1 className={styles.title}>Member Info</h1>

        <h4>General</h4>
        <div className={`${styles.general} ${styles.group}`}>
          <div>
            <h5 className={styles.cardTitle}>First Name</h5>
            <p>{firstName}</p>
          </div>
          <div>
            <h5 className={styles.cardTitle}>Last Name</h5>
            <p>{lastName}</p>
          </div>
          <div>
            <h5 className={styles.cardTitle}>Sex</h5>
            <p>{sex}</p>
          </div>
          <div>
            <h5 className={styles.cardTitle}>BirthDay</h5>
            <p>{birthDate}</p>
          </div>
        </div>

        <h4>Course Info</h4>
        <div className={`${styles.course} ${styles.group}`}>
          <div>
            <h5 className={styles.cardTitle}>Course Direction</h5>
            <p>{directionId}</p>
          </div>
          <div>
            <h5 className={styles.cardTitle}>Start Date</h5>
            <p>{startDate}</p>
          </div>
        </div>

        <h4>Contacts</h4>
        <div className={`${styles.contacts} ${styles.group}`}>
          <div>
            <h5 className={styles.cardTitle}>Phone Number</h5>
            <p>{mobilePhone}</p>
          </div>
          <div>
            <h5 className={styles.cardTitle}>Email</h5>
            <p>{email}</p>
          </div>
          <div>
            <h5 className={styles.cardTitle}>Skype</h5>
            <p>{skype}</p>
          </div>
          <div>
            <h5 className={styles.cardTitle}>Address</h5>
            <p>{address}</p>
          </div>
        </div>

        <h4>Education</h4>
        <div className={`${styles.education} ${styles.group}`}>
          <div>
            <h5 className={styles.cardTitle}>Education</h5>
            <p>{education}</p>
          </div>
          <div>
            <h5 className={styles.cardTitle}>Math Score</h5>
            <p>{mathScore}</p>
          </div>
          <div>
            <h5 className={styles.cardTitle}>University Average Score</h5>
            <p>{universityAverageScore}</p>
          </div>
        </div>

        <div className={styles.buttonWrapper}>
          <Button className={styles.defaultButton} id='backToGrid' onClick={hideMemberCard}>
            Back to grid
          </Button>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = ({ memberPage, app }) => {
  const {
    firstName,
    lastName,
    sex,
    mobilePhone,
    email,
    startDate,
    skype,
    birthDate,
    directionId,
    address,
    education,
    mathScore,
    universityAverageScore,
    message,
  } = memberPage;
  const { isFetching } = app;
  return {
    firstName,
    lastName,
    sex,
    mobilePhone,
    email,
    startDate,
    skype,
    birthDate,
    directionId,
    address,
    education,
    mathScore,
    universityAverageScore,
    message,
    isFetching,
  };
};

MemberCard.propTypes = {
  universityAverageScore: PropTypes.number,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  sex: PropTypes.string,
  mobilePhone: PropTypes.string,
  email: PropTypes.string,
  skype: PropTypes.string,
  address: PropTypes.string,
  education: PropTypes.string,
  mathScore: PropTypes.number,
  directionId: PropTypes.number,
  startDate: PropTypes.instanceOf(Date),
  birthDate: PropTypes.instanceOf(Date),
  hideMemberCard: PropTypes.func.isRequired,
  message: PropTypes.string,
  isFetching: PropTypes.bool.isRequired,
};

MemberCard.defaultProps = {
  universityAverageScore: '',
  firstName: '',
  lastName: '',
  sex: '',
  mobilePhone: '',
  email: '',
  skype: '',
  address: '',
  education: '',
  mathScore: '',
  directionId: '',
  startDate: '',
  birthDate: '',
  message: '',
};

export default connect(mapStateToProps)(MemberCard);
