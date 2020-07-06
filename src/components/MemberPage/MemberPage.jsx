import React from 'react';
import PropTypes from 'prop-types';
import { AvForm, AvField, AvRadio, AvRadioGroup } from 'availity-reactstrap-validation';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Preloader from '../common/Preloader/Preloader';
import styles from './MemberPage.module.scss';
import firebaseApi from '../../api/firebaseApi';
import dateToStringForInput from '../../helpers/dateToStringForInput';
import generateID from '../../helpers/generateID';
import memberPageFields from './memberPageFields';
import Button from '../common/Button/Button';
import { genders } from '../../constants';
import SubmitButton from '../common/SubmitButton/SubmitButton';
import showToast from '../../helpers/showToast';

class MemberPage extends React.Component {
  state = {
    firstName: '',
    lastName: '',
    sex: '',
    mobilePhone: '',
    email: '',
    startDate: dateToStringForInput(new Date()),
    skype: '',
    birthDate: '',
    directionId: '',
    address: '',
    education: '',
    mathScore: '',
    universityAverageScore: '',
    isFetching: false,
  };

  componentDidMount() {
    const { userId } = this.props;

    if (userId && userId !== 'newMember') {
      this.setState({ isFetching: true });
      firebaseApi.getUserInfo(userId).then((userInfo) => {
        const { startDate, birthDate } = userInfo;
        this.setState({
          ...userInfo,
          startDate: dateToStringForInput(startDate.toDate()),
          birthDate: dateToStringForInput(birthDate.toDate()),
          isFetching: false,
        });
      });
    }

    firebaseApi.getDirections().then((directions) => {
      this.setState({ directions });
    });
  }

  createUser = (event, errors) => {
    if (!errors.length) {
      let { userId } = this.props;
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
      } = this.state;

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

      if (userId === 'newMember') {
        userId = generateID();
        firebaseApi.createUser(userId, { ...userInfo, userId }).then((result) => {
          showToast(result);
        });
      } else {
        firebaseApi.updateUser(userId, userInfo).then((result) => {
          showToast(result);
        });
      }
    }
  };

  disableChangingEmail = (name) => {
    const { userId } = this.props;
    if (userId !== 'newMember' && name === 'email') {
      return true;
    }
    return false;
  };

  onChange = (e) => {
    const { name, value } = e.currentTarget;
    this.setState(() => ({ [name]: value }));
  };

  render() {
    const { userId, hideMemberPage } = this.props;
    const { sex, directions, directionId, isFetching } = this.state;

    const defaultValues = { directionId, sex };
    const preparedGenders = genders.map((gender) => {
      const { label, value } = gender;
      return <AvRadio key={label} label={label} value={value} onChange={this.onChange} />;
    });
    const preparedDirections = directions
      ? directions.map((direction) => {
          const { name, directionId } = direction;
          return <AvRadio key={directionId} label={name} value={directionId} onChange={this.onChange} />;
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
          <AvField name={name} label={label} type={type} onChange={this.onChange} value={this.state[name]} required />
        );
      }

      return (
        <AvField
          id={id}
          value={this.state[name]}
          name={name}
          type={type}
          step={step}
          label={label}
          placeholder={placeholder}
          onChange={this.onChange}
          disabled={this.disableChangingEmail(name)}
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
          <AvForm id='createMember' model={defaultValues} onSubmit={this.createUser}>
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
  }
}

MemberPage.propTypes = {
  userId: PropTypes.string.isRequired,
  hideMemberPage: PropTypes.func.isRequired,
};

export default MemberPage;
