import React from 'react';
import PropTypes from 'prop-types';
import ReactDom from 'react-dom';
import Preloader from '../common/Preloader/Preloader';
import Button from '../Button/Button';
import styles from './MemberPage.module.scss';
import FormField from '../FormField/FormField';
import Select from '../common/Select/Select';
import firebaseTrueApi from '../../api/firebaseTrueApi';
import directionsToOptions from '../../helpers/directionsToOptions';
import dateToStringForInput from '../../helpers/dateToStringForInput';
import generateID from '../../helpers/generateID';

class MemberPage extends React.Component {
  constructor() {
    super();
    this.state = {
      firstName: '',
      lastName: '',
      sex: 'male',
      mobilePhone: '',
      email: '',
      startDate: dateToStringForInput(new Date()),
      skype: '',
      birthDate: '',
      directionId: 0,
      address: '',
      education: '',
      mathScore: '',
      universityAverageScore: '',
      isFetching: false,
    };
    this.root = document.createElement('div');
    document.body.appendChild(this.root);
  }

  componentDidMount() {
    const { userId } = this.props;
    const directions = [];
    if (userId && userId !== 'newMember') {
      this.setState({ isFetching: true });
      firebaseTrueApi
        .getUserInfo(userId)
        .then((userInfo) => {
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
          } = userInfo.data();

          this.setState({
            firstName,
            lastName,
            sex,
            mobilePhone,
            email,
            startDate: dateToStringForInput(startDate.toDate()),
            skype,
            birthDate: dateToStringForInput(birthDate.toDate()),
            directionId,
            address,
            education,
            mathScore,
            universityAverageScore,
            isFetching: false,
          });
        })
        .catch((error) => {
          console.error(`Error receiving data: ${error}`);
        });
    }
    firebaseTrueApi
      .getDirections()
      .then((courseDirections) => {
        courseDirections.forEach((direction) => {
          const { directionId, name } = direction.data();
          directions.push({ directionId, name });
        });
      })
      .then(() => {
        this.setState({ directions });
      })
      .catch((error) => {
        console.error(`Error receiving data: ${error}`);
      });
  }

  componentWillUnmount() {
    document.body.removeChild(this.root);
  }

  createUser = () => {
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
    if (userId === 'newMember') {
      userId = generateID();
    }
    const preparedBirthDate = new Date(birthDate);
    const preparedstartDate = new Date(startDate);
    const userInfo = {
      userId,
      firstName,
      lastName,
      sex,
      mobilePhone,
      email,
      startDate: preparedstartDate,
      skype,
      birthDate: preparedBirthDate,
      directionId,
      address,
      education,
      mathScore,
      universityAverageScore,
    };

    firebaseTrueApi.createUser(userId, userInfo).catch((error) => {
      console.error(`User creation error: ${error}`);
    });
  };

  validateForm = (id, message) => {
    this.setState({ [`${id}IsValid`]: !message });
  };

  onChange = (e) => {
    const { id, value } = e.currentTarget;
    let preparedValue = value;
    if (id === 'directionId' || id === 'mathScore') {
      preparedValue = Number(value);
    }
    this.setState({ [id]: preparedValue });
  };

  render() {
    const { userId, hideMemberPage } = this.props;
    const {
      firstName,
      lastName,
      sex,
      directionId,
      mobilePhone,
      email,
      startDate,
      skype,
      birthDate,
      address,
      education,
      mathScore,
      universityAverageScore,
      isFetching,
      directions,
    } = this.state;

    const preparedDIrections = directions ? directionsToOptions(directions) : null;
    const preparedGenders = [
      { value: 'male', title: 'Male' },
      { value: 'female', title: 'Female' },
    ];

    if (isFetching) {
      return <Preloader />;
    }

    return ReactDom.createPortal(
      <div className={styles.wrapper}>
        <h1 className={styles.title}>{userId === 'newMember' ? 'Register Member' : 'Edit Member'}</h1>
        <form>
          <FormField
            id='firstName'
            label='First Name:'
            onChange={this.onChange}
            value={firstName}
            placeholder='First Name'
            validateForm={this.validateForm}
          />

          <FormField
            id='lastName'
            label='Last Name:'
            onChange={this.onChange}
            value={lastName}
            placeholder='Last Name'
            validateForm={this.validateForm}
          />

          <Select id='sex' name='Sex' onChange={this.onChange} value={sex} options={preparedGenders} />

          <Select
            id='directionId'
            name='Direction'
            onChange={this.onChange}
            value={directionId}
            options={preparedDIrections}
          />

          <FormField
            id='mobilePhone'
            label='Phone:'
            onChange={this.onChange}
            value={mobilePhone}
            placeholder='Phone number'
            validateForm={this.validateForm}
          />

          <FormField
            id='email'
            label='Email:'
            onChange={this.onChange}
            value={email}
            placeholder='Email'
            validateForm={this.validateForm}
          />

          <FormField
            id='skype'
            label='Skype:'
            onChange={this.onChange}
            value={skype}
            placeholder='Skype account'
            validateForm={this.validateForm}
          />

          <FormField
            id='birthDate'
            inputType='date'
            label='Birthday:'
            onChange={this.onChange}
            value={birthDate}
            validateForm={this.validateForm}
          />

          <FormField
            id='address'
            label='Address:'
            onChange={this.onChange}
            value={address}
            validateForm={this.validateForm}
            placeholder='City'
          />

          <FormField
            id='mathScore'
            inputType='number'
            min={0}
            max={100}
            label='Math score:'
            onChange={this.onChange}
            value={mathScore}
            validateForm={this.validateForm}
            placeholder='Math test score'
          />

          <FormField
            id='universityAverageScore'
            inputType='number'
            min={0}
            max={10}
            step={0.1}
            label='Average score:'
            onChange={this.onChange}
            value={universityAverageScore}
            placeholder='Diploma average score'
            validateForm={this.validateForm}
          />

          <FormField
            id='education'
            label='Education:'
            onChange={this.onChange}
            value={education}
            placeholder='University Name'
            validateForm={this.validateForm}
          />
          <FormField
            id='startDate'
            inputType='date'
            label='Start Date:'
            onChange={this.onChange}
            value={startDate}
            validateForm={this.validateForm}
          />
          <div className={styles.buttonWrapper}>
            <Button className={styles.successButton} onClick={this.createUser}>
              {userId !== 'newMember' ? 'Save' : 'Create'}
            </Button>

            <Button onClick={hideMemberPage}>Back to grid</Button>
          </div>
        </form>
      </div>,
      this.root,
    );
  }
}

MemberPage.propTypes = {
  userId: PropTypes.string.isRequired,
  hideMemberPage: PropTypes.func.isRequired,
};

export default MemberPage;
