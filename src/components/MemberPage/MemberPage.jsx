import React from 'react';
import PropTypes from 'prop-types';
import ReactDom from 'react-dom';
import { Button } from 'reactstrap';
import { AvForm, AvField, AvRadio, AvRadioGroup } from 'availity-reactstrap-validation';
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
      directionId: '',
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
      if (userId === 'newMember') {
        userId = generateID();
      }
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

      firebaseApi.createUser(userId, userInfo).catch((error) => {
        console.error(`User creation error: ${error}`);
      });
      console.log('submitted!');
    }
  };

  onChange = (e) => {
    const { id } = e.currentTarget;
    const { value } = e.target;

    if (id.includes('sex')) {
      this.setState(() => ({ sex: value }));
    } else if (id.includes('directionId')) {
      this.setState(() => ({ directionId: value }));
    } else {
      this.setState(() => ({ [id]: value }));
    }
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
        errorMessage: 'Only numbers and + - symbols are allowed',
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
        name: 'mathScore',
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
        step: 0.1,
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

    const formFields = fields.map(
      ({ id, value, name, type, label, placeholder, regexp, errorMessage, options = [], step }) => {
        if (type === 'radio') {
          return (
            <AvRadioGroup key={id} inline id={id} name={name} label={label} required>
              {options.map((option) => {
                console.log(option.value === sex);
                return (
                  <AvRadio
                    key={label}
                    label={option.label}
                    value={option.value}
                    onChange={this.onChange}
                    // doesn't work. After rendering checkboxes are not checked
                    checked={id === 'sex' ? option.value === sex : false}
                  />
                );
              })}
            </AvRadioGroup>
          );
        }

        if (type === 'date') {
          return <AvField name={name} label={label} type={type} onChange={this.onChange} value={value} required />;
        }

        return (
          <AvField
            id={id}
            value={value}
            name={name}
            type={type}
            step={step}
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
      },
    );

    if (isFetching) {
      return <Preloader />;
    }

    return ReactDom.createPortal(
      <div className={styles.wrapper}>
        <h1 className={styles.title}>{userId === 'newMember' ? 'Register Member' : 'Edit Member'}</h1>
        <AvForm onSubmit={this.createUser}>
          {formFields}
          <div className={styles.buttonWrapper}>
            <Button className={styles.successButton}>{userId !== 'newMember' ? 'Save' : 'Create'}</Button>

            <Button className={styles.defaultButton} onClick={hideMemberPage}>
              Back to grid
            </Button>
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
