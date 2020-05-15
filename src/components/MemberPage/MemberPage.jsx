import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import firebaseApi from '../../api/firebaseApi';
import Preloader from '../common/Preloader/Preloader';
import Button from '../Button/Button';
import styles from './MemberPage.module.scss';
import FormField from '../../utils/validators/FormField';

class MemberPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      oldData: null,
      newData: {
        firstName: '',
        lastName: '',
        age: '',
        education: '',
        direction: 'Javascript',
        startDate: '',
      },
      isFetching: false,
      firstNameIsValid: false,
      lastNameIsValid: false,
      ageIsValid: false,
      educationIsValid: false,
    };
  }

  componentDidMount() {
    const { userId } = this.props;
    if (userId && userId !== 'newMember') {
      this.setState({ isFetching: true });
      firebaseApi.getMemberData(userId).then((memberData) => {
        this.setState({ oldData: memberData, newData: memberData, isFetching: false });
      });
    }
  }

  createMember = (memberData) => {
    firebaseApi.createMember(memberData).catch(() => {
      throw new Error('Member creation error');
    });
  };

  validateForm = (id, message) => {
    const valid = message ? false : true;
    switch (id) {
      case 'firstName':
        this.setState({ firstNameIsValid: valid });
        break;
      case 'lastName':
        this.setState({ lastNameIsValid: valid });
        break;
      case 'age':
        this.setState({ ageIsValid: valid });
        break;
      case 'education':
        this.setState({ educationIsValid: valid });
        break;
      default:
        break;
    }
  };

  updateMember = (userId, updatedData) => {
    if (updatedData && Object.keys(updatedData).length > 0) {
      firebaseApi
        .updateMember(userId, updatedData)
        .then(() => console.log('updated successfully'))
        .catch(() => {
          throw new Error('Member updating error');
        });
    }
  };

  calculateDataDifference = () => {
    //  compare two objects and return different
    const { oldData, newData } = this.state;
    const serverData = [...Object.entries(oldData)];
    const updatedData = [...Object.entries(newData)];
    const dataDifference = updatedData.filter((value, index) => !serverData[index].includes(value[1]));
    const result = [];
    for (let i = 0; i < dataDifference.length; i += 1) {
      result.push({ [dataDifference[i][0]]: dataDifference[i][1] });
    }
    if (result.length > 0) {
      return Object.assign(...result);
    }
  };

  onChange = (e) => {
    const { id, value } = e.currentTarget;
    switch (id) {
      case 'firstName':
        this.setState({ newData: { ...this.state.newData, firstName: value } });
        break;
      case 'lastName':
        this.setState({ newData: { ...this.state.newData, lastName: value } });
        break;
      case 'age':
        this.setState({ newData: { ...this.state.newData, age: value } });
        break;
      case 'education':
        this.setState({ newData: { ...this.state.newData, education: value } });
        break;
      case 'direction':
        console.log(value);
        this.setState({ newData: { ...this.state.newData, direction: value } });
        break;
      case 'startDate':
        this.setState({ newData: { ...this.state.newData, startDate: value } });
        break;
      default:
        break;
    }
  };

  render() {
    const { userId } = this.props;
    const { newData, isFetching, firstNameIsValid, lastNameIsValid, ageIsValid, educationIsValid } = this.state;
    const { firstName, lastName, age, education, direction, startDate } = newData;
    if (isFetching) {
      return <Preloader />;
    }
    return (
      <div className={styles.wrapper}>
        {userId === 'newMember' ? <h1>Register Member</h1> : <h1>Edit Member</h1>}
        <form action=''>
          <FormField
            id='firstName'
            required
            minLength={2}
            maxLength={40}
            inputType='text'
            label='First Name:'
            onChange={this.onChange}
            value={firstName}
            placeholder='First Name'
            validateForm={this.validateForm}
          />
          <FormField
            id='lastName'
            required
            minLength={2}
            maxLength={40}
            inputType='text'
            label='Last Name:'
            onChange={this.onChange}
            value={lastName}
            placeholder='Last Name'
            validateForm={this.validateForm}
          />
          <FormField
            id='age'
            required
            min={0}
            max={150}
            inputType='number'
            label='Age:'
            onChange={this.onChange}
            value={age}
            placeholder='Age'
            validateForm={this.validateForm}
          />
          <FormField
            id='education'
            required
            inputType='text'
            label='Education:'
            onChange={this.onChange}
            value={education}
            placeholder='University Name'
            validateForm={this.validateForm}
            maxLength={40}
          />
          <div className={styles.item}>
            <label htmlFor='direction'>Direction: </label>
            <select
              id='direction'
              name='direction'
              placeholder='Choose direction'
              onChange={this.onChange}
              value={direction}
            >
              <option value='Javascript'>Javascript</option>
              <option value='Java'>Java</option>
              <option value='Salesforce'>Salesforce</option>
              <option value='.Net'>.Net</option>
            </select>
          </div>
          <FormField
            id='startDate'
            required
            inputType='date'
            label='Start Date:'
            onChange={this.onChange}
            value={startDate}
            validateForm={this.validateForm}
          />
        </form>
        <div className={styles.buttonWrapper}>
          {userId !== 'newMember' ? (
            <Button
              className={styles.successButton}
              buttonText='Save'
              onClick={() => this.updateMember(userId, this.calculateDataDifference())}
              disabled={!(firstNameIsValid && lastNameIsValid && ageIsValid && educationIsValid)}
            />
          ) : (
            <Button
              className={styles.successButton}
              buttonText='Create'
              onClick={() => this.createMember(this.state.newData)}
              disabled={!(firstNameIsValid && lastNameIsValid && ageIsValid && educationIsValid)}
            />
          )}

          <NavLink to='/members'>
            <Button buttonText='Back to grid' />
          </NavLink>
        </div>
      </div>
    );
  }
}

// MemberPage.propTypes = {};

// MemberPage.defaultProps = {};

export default MemberPage;
