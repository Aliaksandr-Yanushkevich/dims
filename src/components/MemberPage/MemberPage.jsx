import React from 'react';
import PropTypes from 'prop-types';
import firebaseApi from '../../api/firebaseApi';
import Preloader from '../common/Preloader/Preloader';
import Button from '../Button/Button';
import styles from './MemberPage.module.scss';
import FormField from '../FormField/FormField';
import Select from '../common/Select/Select';
import { directions } from '../../constants';

class MemberPage extends React.Component {
  state = {
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

  componentDidMount() {
    const { userId } = this.props;
    if (userId && userId !== 'newMember') {
      this.setState({ isFetching: true });
      firebaseApi
        .getMemberData(userId)
        .then((memberData) => {
          this.setState({ oldData: memberData, newData: memberData, isFetching: false });
        })
        .catch((error) => console.error(`Error receiving data: ${error}`));
    }
  }

  createMember = (memberData) => {
    firebaseApi.createMember(memberData).catch((error) => {
      console.error(`Member creation error: ${error}`);
    });
  };

  validateForm = (id, message) => {
    this.setState({ [`${id}IsValid`]: !message });
  };

  updateMember = (userId, updatedData) => {
    if (updatedData && Object.keys(updatedData).length > 0) {
      firebaseApi
        .updateMember(userId, updatedData)
        .then(() => console.log('updated successfully'))
        .catch((error) => {
          console.error(`Member updating error: ${error}`);
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
      return { ...result };
      // return Object.assign(...result);
    }
    return undefined;
  };

  onChange = (e) => {
    const { id, value } = e.currentTarget;
    this.setState(({ newData }) => {
      const updatedData = { ...newData };
      updatedData[id] = value;
      return { newData: updatedData };
    });
  };

  render() {
    const { userId, hideMemberPage } = this.props;
    const { newData, isFetching, firstNameIsValid, lastNameIsValid, ageIsValid, educationIsValid } = this.state;
    const { firstName, lastName, age, education, direction, startDate } = newData;
    if (isFetching) {
      return <Preloader />;
    }
    const updateUser = () => {
      this.updateMember(userId, this.calculateDataDifference());
    };
    const createUser = () => {
      this.createMember(newData);
    };
    return (
      <div className={styles.wrapper}>
        {userId === 'newMember' ? (
          <h1 className={styles.title}>Register Member</h1>
        ) : (
          <h1 className={styles.title}>Edit Member</h1>
        )}
        <form action=''>
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
          <FormField
            id='age'
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
            label='Education:'
            onChange={this.onChange}
            value={education}
            placeholder='University Name'
            validateForm={this.validateForm}
          />
          <div className={styles.item}>
            <Select id='direction' name='direction' onChange={this.onChange} value={direction} options={directions} />
          </div>
          <FormField
            id='startDate'
            inputType='date'
            label='Start Date:'
            onChange={this.onChange}
            value={startDate}
            validateForm={this.validateForm}
          />
          <div className={styles.buttonWrapper}>
            {userId !== 'newMember' ? (
              <Button
                className={styles.successButton}
                onClick={updateUser}
                disabled={!(firstNameIsValid && lastNameIsValid && ageIsValid && educationIsValid)}
              >
                Save
              </Button>
            ) : (
              <Button
                className={styles.successButton}
                onClick={createUser}
                disabled={!(firstNameIsValid && lastNameIsValid && ageIsValid && educationIsValid)}
              >
                Create
              </Button>
            )}
            <Button onClick={hideMemberPage}>Back to grid</Button>
          </div>
        </form>
      </div>
    );
  }
}

MemberPage.propTypes = {
  userId: PropTypes.string.isRequired,
  hideMemberPage: PropTypes.func.isRequired,
};

export default MemberPage;
