import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { AvForm, AvField, AvRadio, AvRadioGroup } from 'availity-reactstrap-validation';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Preloader from '../common/Preloader/Preloader';
import styles from './MemberPage.module.scss';
import firebaseApi from '../../api/firebaseApi';
import generateID from '../../helpers/generateID';
import memberPageFields from './memberPageFields';
import Button from '../common/Button/Button';
import { genders } from '../../constants';
import SubmitButton from '../common/SubmitButton/SubmitButton';
import showToast from '../../helpers/showToast';
import { onChangeValue } from '../../redux/reducers/memberPageIndex';
import createPattern from '../../helpers/createPattern';

const MemberPage = (props) => {
  const createUser = (event, errors) => {
    if (!errors.length) {
      const {
        userId,
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
      } = props;

      const userInfo = {
        userId,
        firstName,
        lastName,
        sex,
        mobilePhone,
        email,
        startDate: new Date(startDate),
        skype,
        birthDate: new Date(birthDate),
        directionId: Number(directionId),
        address,
        education,
        mathScore: Number(mathScore),
        universityAverageScore: Number(universityAverageScore),
      };

      let { currentUserId } = props;

      if (currentUserId === 'newMember') {
        currentUserId = generateID();
        firebaseApi.createUser(currentUserId, { ...userInfo, userId: currentUserId }).then((result) => {
          showToast(result);
        });
      } else {
        firebaseApi.updateUser(currentUserId, userInfo).then((result) => {
          showToast(result);
        });
      }
    }
  };

  const disableChangingEmail = (name) => {
    const { currentUserId } = props;
    if (currentUserId !== 'newMember' && name === 'email') {
      return true;
    }
    return false;
  };

  const onChange = (e) => {
    const { onChangeValue } = props;
    const { name, value } = e.currentTarget;
    onChangeValue(name, value);
  };

  const { currentUserId, hideMemberPage, directions, isFetching } = props;
  const preparedGenders = genders.map((gender) => {
    const { label, value } = gender;
    return <AvRadio key={label} label={label} value={value} onChange={onChange} />;
  });
  const preparedDirections = directions
    ? directions.map((direction) => {
        const { name, directionId } = direction;
        return <AvRadio key={directionId} label={name} value={directionId.toString()} onChange={onChange} />;
      })
    : null;

  const fields = memberPageFields.map(({ id, name, type, label, placeholder, regexp, errorMessage, step }) => {
    if (type === 'radio') {
      return (
        <AvRadioGroup key={id} inline id={id} name={name} value={props[name]} label={label} required>
          {name === 'directionId' && preparedDirections}
          {name === 'sex' && preparedGenders}
        </AvRadioGroup>
      );
    }

    if (type === 'date') {
      return (
        <AvField key={id} name={name} label={label} type={type} onChange={onChange} value={props[name]} required />
      );
    }

    return (
      <AvField
        key={id}
        id={id}
        value={props[name]}
        name={name}
        type={type}
        step={step}
        label={label}
        placeholder={placeholder}
        onChange={onChange}
        disabled={disableChangingEmail(name)}
        validate={{
          required: { value: true, errorMessage: 'Field is required' },
          pattern: createPattern(regexp, errorMessage),
        }}
      />
    );
  });

  if (isFetching) {
    return <Preloader />;
  }

  return (
    <>
      <ToastContainer />
      <div className={styles.wrapper}>
        <h1 className={styles.title}>{currentUserId === 'newMember' ? 'Register Member' : 'Edit Member'}</h1>
        <AvForm id='createMember' onSubmit={createUser}>
          {fields}
        </AvForm>
        <div className={styles.buttonWrapper}>
          <SubmitButton className={styles.successButton} form='createMember'>
            {currentUserId !== 'newMember' ? 'Save' : 'Create'}
          </SubmitButton>

          <Button onClick={hideMemberPage}>Back to grid</Button>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = ({ memberPage, members, app }) => {
  const {
    userId,
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
  } = memberPage;

  const { directions } = members;
  const { currentUserId, isFetching } = app;

  return {
    userId,
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
    directions,
    currentUserId,
    isFetching,
  };
};

MemberPage.propTypes = {
  userId: PropTypes.string,
  hideMemberPage: PropTypes.func.isRequired,
  onChangeValue: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  currentUserId: PropTypes.string,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  sex: PropTypes.string,
  mobilePhone: PropTypes.string,
  email: PropTypes.string,
  startDate: PropTypes.string,
  skype: PropTypes.string,
  birthDate: PropTypes.string,
  directionId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  address: PropTypes.string,
  education: PropTypes.string,
  mathScore: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  universityAverageScore: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  directions: PropTypes.arrayOf(
    PropTypes.shape({
      directionId: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

MemberPage.defaultProps = {
  userId: '',
  currentUserId: '',
  firstName: '',
  lastName: '',
  sex: '',
  mobilePhone: '',
  email: '',
  startDate: '',
  skype: '',
  birthDate: '',
  directionId: null,
  address: '',
  education: '',
  mathScore: null,
  universityAverageScore: null,
};

export default connect(mapStateToProps, { onChangeValue })(MemberPage);
