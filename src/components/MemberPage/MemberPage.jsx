import React from 'react';
import PropTypes from 'prop-types';
import ReactDom from 'react-dom';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { AvForm, AvField, AvGroup, AvFeedback, AvRadio, AvRadioGroup } from 'availity-reactstrap-validation';
// import AvSelect, { AvSelectField } from '@availity/reactstrap-validation-select';
import Preloader from '../common/Preloader/Preloader';
import styles from './MemberPage.module.scss';
import firebaseApi from '../../api/firebaseApi';
import dateToStringForInput from '../../helpers/dateToStringForInput';
import generateID from '../../helpers/generateID';
import {
  latinLetterRegexp,
  phoneNumberRegexp,
  emailRegexp,
  numberRange0To100,
  userNameRegexp,
  addresseRegexp,
  numberRange0To10,
} from '../../constants';
import directionsToOptions from '../../helpers/directionsToOptions';

class MemberPage extends React.Component {
  constructor() {
    super();
    this.state = {
      firstName: '',
      lastName: '',
      sex: '',
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
    debugger;
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

    const fields = [
      {
        id: 'firstName',
        value: firstName,
        name: 'firstName',
        type: 'text',
        label: 'First Name:',
        placeholder: 'First Name',
        regexp: latinLetterRegexp,
        errorMessage: 'Field must be composed only with latin letters',
      },
      {
        id: 'lastName',
        value: lastName,
        name: 'lastName',
        type: 'text',
        label: 'Last Name:',
        placeholder: 'Last Name',
        regexp: latinLetterRegexp,
        errorMessage: 'Field must be composed only with latin letters',
      },
      {
        id: 'mobilePhone',
        value: mobilePhone,
        name: 'mobilePhone',
        type: 'text',
        label: 'Phone:',
        placeholder: 'Phone number',
        regexp: phoneNumberRegexp,
        errorMessage: 'Only numbers and + - ( ) symbols are allowed',
      },
      {
        id: 'email',
        value: email,
        name: 'email',
        type: 'text',
        label: 'Email:',
        placeholder: 'Email',
        regexp: emailRegexp,
        errorMessage: 'You have entered an invalid email address',
      },
      {
        id: 'skype',
        value: skype,
        name: 'skype',
        type: 'text',
        label: 'Skype:',
        placeholder: 'Skype account',
        regexp: userNameRegexp,
        errorMessage: 'The username must be letters, numbers, hyphens, and underscores',
      },
      {
        id: 'address',
        value: address,
        name: 'address',
        type: 'text',
        label: 'Address:',
        placeholder: 'Address',
        regexp: addresseRegexp,
        errorMessage: 'Characters & (% # $ ^) are not allowed',
      },
      {
        id: 'mathScore',
        value: mathScore,
        name: 'address',
        type: 'number',
        label: 'Math score:',
        placeholder: 'Math test score',
        regexp: numberRange0To100,
        errorMessage: 'Test mark must be between 0 and 100',
      },
      {
        id: 'universityAverageScore',
        value: universityAverageScore,
        name: 'universityAverageScore',
        type: 'number',
        label: 'Average score:',
        placeholder: 'Diploma average score',
        regexp: numberRange0To10,
        errorMessage: 'Average score must be between 0 and 10',
      },
      {
        id: 'education',
        value: education,
        name: 'education',
        type: 'text',
        label: 'Education:',
        placeholder: 'University Name:',
        regexp: latinLetterRegexp,
        errorMessage: 'Field must be composed only with latin letters',
      },
      {
        id: 'sex',
        value: sex,
        name: 'sex',
        type: 'radio',
        label: 'Sex:',
        options: [
          { label: 'Male', value: 'male' },
          { label: 'Female', value: 'female' },
        ],
      },
      {
        id: 'directionId',
        value: directionId,
        name: 'directionId',
        type: 'radio',
        label: 'Direction:',
        options: directionsToOptions(directions),
      },
      { id: 'startDate', value: startDate, name: 'startDate', type: 'date', label: 'Start Date:' },
      { id: 'birthDate', value: birthDate, name: 'birthDate', type: 'date', label: 'Birthday:' },
    ];

    const formFields = fields.map(({ id, value, name, type, label, placeholder, regexp, errorMessage, options }) => {
      if (type === 'radio') {
        return (
          <AvRadioGroup id={id} name={name} label={label} required value={value} onChange={this.onChange}>
            {options &&
              options.map((option) => {
                return <AvRadio label={option.label} value={option.value} />;
              })}
          </AvRadioGroup>
        );
      }

      if (type === 'date') {
        return <AvField name={name} label={label} type={type} />;
      }

      return (
        <AvField
          id={id}
          value={value}
          name={name}
          type={type}
          label={label}
          placeholder={placeholder}
          onChange={this.onChange}
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

    return ReactDom.createPortal(
      <div className={styles.wrapper}>
        <h1 className={styles.title}>{userId === 'newMember' ? 'Register Member' : 'Edit Member'}</h1>
        <AvForm>
          {/* <AvField
            // className={styles.item}
            id='firstName'
            value={firstName}
            onChange={this.onChange}
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

          <AvField id='startDate' name='startDate' label='Start Date:' type='date' required /> */}
          {formFields}
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
