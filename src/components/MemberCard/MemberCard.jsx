import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { ToastContainer } from 'react-toastify';
import { faAddressCard, faInfoCircle, faLaptopCode, faMailBulk, faUniversity } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './MemberCard.module.scss';
import Button from '../common/Button/Button';
import showToast from '../../helpers/showToast';
import Preloader from '../common/Preloader/Preloader';
import MemberCardBlock from './MemberCardBlock';
import ItemGroup from './ItemGroup';

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
  directions,
}) => {
  const direction = directions
    ? directions
        .filter((courseDirection) => {
          return courseDirection.directionId === Number(directionId);
        })
        .find((course) => course).name
    : null;

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
        <h1 className={styles.title}>
          <FontAwesomeIcon icon={faAddressCard} className={styles.icon} />
          Member Info
        </h1>
        <ItemGroup
          title='General'
          icon={<FontAwesomeIcon icon={faInfoCircle} className={styles.icon} />}
          className={styles.general}
        >
          <MemberCardBlock title='First Name' data={firstName} />
          <MemberCardBlock title='Last Name' data={lastName} />
          <MemberCardBlock title='Sex' data={sex} />
          <MemberCardBlock title='BirthDay' data={birthDate} />
        </ItemGroup>

        <ItemGroup
          title='Course Info'
          icon={<FontAwesomeIcon icon={faLaptopCode} className={styles.icon} />}
          className={styles.course}
        >
          <MemberCardBlock title='Course Direction' data={direction} />
          <MemberCardBlock title='Start Date' data={startDate} />
        </ItemGroup>

        <ItemGroup
          title='Contacts'
          icon={<FontAwesomeIcon icon={faMailBulk} className={styles.icon} />}
          className={styles.contacts}
        >
          <MemberCardBlock title='Phone Number' data={mobilePhone} />
          <MemberCardBlock title='Email' data={email} />
          <MemberCardBlock title='Skype' data={skype} />
          <MemberCardBlock title='Address' data={address} />
        </ItemGroup>

        <ItemGroup
          title='Education'
          icon={<FontAwesomeIcon icon={faUniversity} className={styles.icon} />}
          className={styles.education}
        >
          <MemberCardBlock title='Education' data={education} />
          <MemberCardBlock title='Math Score' data={mathScore} />
          <MemberCardBlock title='University Average Score' data={universityAverageScore} />
        </ItemGroup>

        <div className={styles.buttonWrapper}>
          <Button className={styles.defaultButton} id='backToGrid' onClick={hideMemberCard}>
            Back to grid
          </Button>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = ({ memberPage, app, members }) => {
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
  const { directions } = members;
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
    directions,
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
  directions: PropTypes.arrayOf(
    PropTypes.shape({
      directionId: PropTypes.string.isRequired,
      name: PropTypes.number.isRequired,
    }),
  ),
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
  directions: null,
};

export default connect(mapStateToProps)(MemberCard);
