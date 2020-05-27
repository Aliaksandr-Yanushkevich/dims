import React from 'react';
import PropTypes from 'prop-types';
import ReactDom from 'react-dom';
import firebaseApi from '../../api/firebaseApi';
import Preloader from '../common/Preloader/Preloader';
import Button from '../Button/Button';
import styles from './MemberPage.module.scss';
import FormField from '../FormField/FormField';
import Select from '../common/Select/Select';
import { directions } from '../../constants';

class MemberPage extends React.Component {
  constructor() {
    super();
    this.root = document.createElement('div');
    document.body.appendChild(this.root);
  }

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
        .catch((error) => {
          console.error(`Error receiving data: ${error}`);
        });
    }
  }

  componentWillUnmount() {
    document.body.removeChild(this.root);
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
    if (updatedData && Object.keys(updatedData).length) {
      firebaseApi
        .updateMember(userId, updatedData)
        .then(() => console.log('updated successfully'))
        .catch((error) => {
          console.error(`Member updating error: ${error}`);
        });
    }
  };

  calculateDataDifference = (oldData, newData) => {
    //  compare two objects and return different
    const serverData = [...Object.entries(oldData)];
    const updatedData = [...Object.entries(newData)];
    const dataDifference = updatedData.filter((value, index) => !serverData[index].includes(value[1]));
    const result = [];
    debugger;
    for (let i = 0; i < dataDifference.length; i += 1) {
      result.push({ [dataDifference[i][0]]: dataDifference[i][1] });
    }
    if (result.length) {
      return { ...result };
    }
    return null;
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
    const {
      newData,
      oldData,
      isFetching,
      firstNameIsValid,
      lastNameIsValid,
      ageIsValid,
      educationIsValid,
    } = this.state;
    const { firstName, lastName, age, education, direction, startDate } = newData;
    if (isFetching) {
      return <Preloader />;
    }
    const updateUser = () => {
      this.updateMember(userId, this.calculateDataDifference(oldData, newData));
    };
    const createUser = () => {
      this.createMember(newData);
    };
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
            <Button
              className={styles.successButton}
              onClick={userId !== 'newMember' ? updateUser : createUser}
              disabled={!(firstNameIsValid && lastNameIsValid && ageIsValid && educationIsValid)}
            >
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
