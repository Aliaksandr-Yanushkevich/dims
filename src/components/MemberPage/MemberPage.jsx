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
import { onChangeValue } from '../../redux/reducers/memberPageReducer';

const MemberPage = (props) => {
  const createUser = (event, errors) => {
    if (!errors.length) {
      let {
        currentUserId,
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
        currentUserId,
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

      if (currentUserId === 'newMember') {
        currentUserId = generateID();
        firebaseApi.createUser(currentUserId, { ...userInfo, currentUserId }).then((result) => {
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
    const { userId } = props;
    if (userId !== 'newMember' && name === 'email') {
      return true;
    }
    return false;
  };

  const onChange = (e) => {
    const { onChangeValue } = props;
    const { name, value } = e.currentTarget;
    onChangeValue(name, value);
  };

  const { userId, hideMemberPage, sex, directions, directionId, isFetching } = props;

  const defaultValues = { directionId, sex };
  const preparedGenders = genders.map((gender) => {
    const { label, value } = gender;
    return <AvRadio key={label} label={label} value={value} onChange={onChange} />;
  });
  const preparedDirections = directions
    ? directions.map((direction) => {
        const { name, directionId } = direction;
        return <AvRadio key={directionId} label={name} value={directionId} onChange={onChange} />;
      })
    : null;

  const fields = memberPageFields.map(({ id, name, type, label, placeholder, regexp, errorMessage, step }) => {
    if (type === 'radio') {
      return (
        <AvRadioGroup key={id} inline id={id} name={name} label={label} required>
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
          pattern: {
            value: `${regexp}`,
            errorMessage,
          },
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
        <h1 className={styles.title}>{userId === 'newMember' ? 'Register Member' : 'Edit Member'}</h1>
        <AvForm id='createMember' model={defaultValues} onSubmit={createUser}>
          {fields}
        </AvForm>
        <div className={styles.buttonWrapper}>
          <SubmitButton className={styles.successButton} form='createMember'>
            {userId !== 'newMember' ? 'Save' : 'Create'}
          </SubmitButton>

          <Button onClick={hideMemberPage}>Back to grid</Button>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
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
  } = state.memberPage;

  const { directions } = state.members;
  const { currentUserId } = state.app;

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
    directions,
    currentUserId,
  };
};

MemberPage.propTypes = {
  userId: PropTypes.string.isRequired,
  hideMemberPage: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { onChangeValue })(MemberPage);
