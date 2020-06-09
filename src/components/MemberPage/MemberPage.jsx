import React from 'react';
import PropTypes from 'prop-types';
import ReactDom from 'react-dom';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { AvForm, AvField, AvGroup, AvFeedback } from 'availity-reactstrap-validation';
// import AvSelect, { AvSelectField } from '@availity/reactstrap-validation-select';
import Preloader from '../common/Preloader/Preloader';
import styles from './MemberPage.module.scss';
import firebaseApi from '../../api/firebaseApi';
import dateToStringForInput from '../../helpers/dateToStringForInput';
import generateID from '../../helpers/generateID';
import { latinLetterRegexp, phoneNumberRegexp, emailRegexp } from '../../constants';

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
      formIsValid: false,
      isFetching: false,
    };
    this.root = document.createElement('div');
    document.body.appendChild(this.root);
  }

  componentDidMount() {
    const { userId } = this.props;
    const directions = [];

    this.validateForm();

    if (userId && userId !== 'newMember') {
      this.setState({ isFetching: true });
      firebaseApi
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
    firebaseApi
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

    firebaseApi.createUser(userId, userInfo).catch((error) => {
      console.error(`User creation error: ${error}`);
    });
  };

  validateForm = () => {
    const {
      firstName,
      lastName,
      mobilePhone,
      address,
      education,
      skype,
      birthDate,
      mathScore,
      universityAverageScore,
      email,
    } = this.state;
    // magic numbers here are minimal/maximum length for input fields or other special requirements
    if (
      firstName.length &&
      firstName.length <= 140 &&
      latinLetterRegexp.test(firstName) &&
      lastName.length &&
      lastName.length <= 140 &&
      latinLetterRegexp.test(lastName) &&
      phoneNumberRegexp.test(mobilePhone) &&
      emailRegexp.test(email) &&
      skype.length &&
      skype.length <= 140 &&
      birthDate.length &&
      address.length &&
      address.length <= 140 &&
      education.length &&
      education.length <= 140 &&
      mathScore >= 0 &&
      mathScore <= 100 &&
      universityAverageScore >= 0 &&
      universityAverageScore <= 10
    ) {
      this.setState({ formIsValid: true });
    } else {
      this.setState({ formIsValid: false });
    }
  };

  onChange = (e) => {
    const { id, value } = e.currentTarget;
    let preparedValue = value;
    if (id === 'directionId' || id === 'mathScore') {
      preparedValue = Number(value);
    }
    this.setState({ [id]: preparedValue });
    this.validateForm();
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
      formIsValid,
    } = this.state;

    const directionOptions = directions
      ? directions.map((direction) => {
          return (
            <option key={direction.directionId} value={direction.directionId}>
              {direction.name}
            </option>
          );
        })
      : '';

    const genders = [
      { label: 'Male', value: 'male' },
      { label: 'Female', value: 'female' },
    ];

    const genderOptions = genders
      ? genders.map((gender) => (
          <option key={gender.value} value={gender.value}>
            {gender.label}
          </option>
        ))
      : '';

    if (isFetching) {
      return <Preloader />;
    }

    return ReactDom.createPortal(
      <div className={styles.wrapper}>
        <h1 className={styles.title}>{userId === 'newMember' ? 'Register Member' : 'Edit Member'}</h1>
        {/* <form>
          <FormField
            id='firstName'
            label='First Name:'
            onChange={this.onChange}
            value={firstName}
            placeholder='First Name'
          />

          <FormField
            id='lastName'
            label='Last Name:'
            onChange={this.onChange}
            value={lastName}
            placeholder='Last Name'
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
          />

          <FormField id='email' label='Email:' onChange={this.onChange} value={email} placeholder='Email' />

          <FormField id='skype' label='Skype:' onChange={this.onChange} value={skype} placeholder='Skype account' />

          <FormField id='birthDate' inputType='date' label='Birthday:' onChange={this.onChange} value={birthDate} />

          <FormField id='address' label='Address:' onChange={this.onChange} value={address} placeholder='City' />

          <FormField
            id='mathScore'
            inputType='number'
            min={0}
            max={100}
            label='Math score:'
            onChange={this.onChange}
            value={mathScore}
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
          />

          <FormField
            id='education'
            label='Education:'
            onChange={this.onChange}
            value={education}
            placeholder='University Name'
          />
          <FormField id='startDate' inputType='date' label='Start Date:' onChange={this.onChange} value={startDate} />
          <div className={styles.buttonWrapper}>
            <Button disabled={!formIsValid} className={styles.successButton} onClick={this.createUser}>
              {userId !== 'newMember' ? 'Save' : 'Create'}
            </Button>

            <Button onClick={hideMemberPage}>Back to grid</Button>
          </div>
        </form> */}
        <AvForm>
          <AvField
            className={styles.item}
            id='firstName'
            name='firstName'
            type='text'
            label='First Name:'
            placeholder='First Name'
            validate={{
              required: { value: true, errorMessage: 'Please enter a name' },
              pattern: {
                value: `${latinLetterRegexp}`,
                errorMessage: 'Your name must be composed only with latin letters',
              },
              minLength: { value: 2, errorMessage: 'Your name must be between 2 and 40 characters' },
              maxLength: { value: 40, errorMessage: 'Your name must be between 2 and 40 characters' },
            }}
          />

          <AvField
            className={styles.item}
            id='lastName'
            name='lastName'
            type='text'
            label='Last Name:'
            placeholder='Last Name'
            validate={{
              required: { value: true, errorMessage: 'Please enter a name' },
              pattern: {
                value: `${latinLetterRegexp}`,
                errorMessage: 'Your name must be composed only with latin letters',
              },
              minLength: { value: 2, errorMessage: 'Your name must be between 2 and 40 characters' },
              maxLength: { value: 40, errorMessage: 'Your name must be between 2 and 40 characters' },
            }}
          />

          <FormGroup className={styles.item}>
            <Label for='sex'>Sex:</Label>
            <Input type='select' id='sex' onChange={this.onChange} value={sex}>
              {genderOptions}
            </Input>
          </FormGroup>

          <FormGroup className={styles.item}>
            <Label for='directionId'>Direction:</Label>
            <Input type='select' id='directionId' onChange={this.onChange} value={directionId}>
              {directionOptions}
            </Input>
          </FormGroup>

          <AvField
            className={styles.item}
            id='mobilePhone'
            name='mobilePhone'
            type='text'
            label='Phone:'
            placeholder='Phone number'
            validate={{
              required: { value: true, errorMessage: 'Please enter a number' },
              pattern: {
                value: `${phoneNumberRegexp}`,
                errorMessage: 'Only numbers and + - ( ) symbols are allowed',
              },
              minLength: { value: 7, errorMessage: 'Phone number must have at least 7 characters' },
              maxLength: { value: 30, errorMessage: 'Phone number must have no more than 30 characters' },
            }}
          />

          <AvField
            className={styles.item}
            id='email'
            name='email'
            type='text'
            label='Email:'
            placeholder='Email'
            validate={{
              required: { value: true, errorMessage: 'Please enter an email' },
              pattern: {
                value: `${emailRegexp}`,
                errorMessage: 'You have entered an invalid email address',
              },
            }}
          />

          <AvField
            className={styles.item}
            id='skype'
            name='skype'
            type='text'
            label='Skype:'
            placeholder='Skype account'
            validate={{
              required: { value: true, errorMessage: 'Please enter a skype account' },
              maxLength: { value: 50, errorMessage: 'Skype account must have no more than 50 characters' },
            }}
          />

          <AvField id='birthDate' name='birthDate' label='Birthday:' type='date' required />

          <AvField
            className={styles.item}
            id='address'
            name='address'
            type='text'
            label='Address:'
            placeholder='City:'
            validate={{
              required: { value: true, errorMessage: 'Please enter your city' },
              maxLength: { value: 50, errorMessage: 'City must have no more than 50 characters' },
            }}
          />

          <AvField
            className={styles.item}
            id='mathScore'
            name='mathScore'
            type='number'
            label='Math score:'
            placeholder='Math test score'
            validate={{
              required: { value: true, errorMessage: 'Please enter your city' },
              min: { value: 0, errorMessage: 'Score must must be between 0 and 100' },
              max: { value: 100, errorMessage: 'Score must must be between 0 and 100' },
            }}
          />

          <AvField
            className={styles.item}
            id='universityAverageScore'
            name='universityAverageScore'
            type='number'
            label='Average score:'
            placeholder='Diploma average score'
            step={0.1}
            validate={{
              required: { value: true, errorMessage: 'Please enter your city' },
              min: { value: 0, errorMessage: 'Score must must be between 0 and 10' },
              max: { value: 10, errorMessage: 'Score must must be between 0 and 10' },
            }}
          />

          <AvField
            className={styles.item}
            id='education'
            name='education'
            type='text'
            label='Education:'
            placeholder='University Name:'
            validate={{
              required: { value: true, errorMessage: 'Please enter your university' },
              maxLength: { value: 50, errorMessage: 'University name must have no more than 50 characters' },
            }}
          />

          <AvField id='startDate' name='startDate' label='Start Date:' type='date' required />

          <div className={styles.buttonWrapper}>
            <Button className={styles.successButton} onClick={this.createUser}>
              {userId !== 'newMember' ? 'Save' : 'Create'}
            </Button>

            <Button onClick={hideMemberPage}>Back to grid</Button>
          </div>
        </AvForm>
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
