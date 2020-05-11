import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import firebaseApi from '../../api/firebaseApi';
import Preloader from '../common/Preloader/Preloader';
import Button from '../Button/Button';
import styles from './MemberPage.module.scss';

class MemberPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      oldData: null,
      newData: {
        firstName: null,
        lastName: null,
        age: null,
        education: null,
        direction: 'Javascript',
        startDate: null,
      },
    };
  }

  componentDidMount() {
    const { userId } = this.props;
    if (userId && userId !== 'newMember') {
      firebaseApi.getMemberData(userId).then((memberData) => {
        this.setState({ oldData: memberData, newData: memberData });
      });
    }
  }

  createMember = (memberData) => {
    firebaseApi.createMember(memberData).catch(() => {
      throw new Error('Member creation error');
    });
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
    //  comparing two objects and return different
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
    const { newData } = this.state;
    const { firstName, lastName, age, education, direction, startDate } = newData;

    return (
      <>
        <form action=''>
          <h1>Register Member</h1>
          <p>
            <label for='firstname'>First Name: </label>
            <input
              id='firstName'
              type='text'
              placeholder='Firt Name'
              required
              onChange={this.onChange}
              value={firstName}
            />
          </p>
          <p>
            <label for='lastName'>Last Name: </label>
            <input
              id='lastName'
              type='text'
              placeholder='Last Name'
              required
              onChange={this.onChange}
              value={lastName}
            />
          </p>
          <p>
            <label for='age'>Age: </label>
            <input id='age' type='text' placeholder='Age' required onChange={this.onChange} value={age} />
          </p>
          <p>
            <label for='education'>Education: </label>
            <input
              id='education'
              type='text'
              placeholder='University Name'
              required
              onChange={this.onChange}
              value={education}
            />
          </p>
          <p>
            <label for='direction'>Direction: </label>
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
          </p>
          <p>
            <label for='startDate'>Start Date: </label>
            <input id='startDate' type='date' required onChange={this.onChange} value={startDate} />
          </p>
        </form>
        {userId !== 'newMember' ? (
          <Button
            className={styles.successButton}
            buttonText='Save'
            onClick={() => this.updateMember(userId, this.calculateDataDifference())}
          />
        ) : (
          <Button
            className={styles.successButton}
            buttonText='Create'
            onClick={() => this.createMember(this.state.newData)}
          />
        )}

        <NavLink to='/members'>
          <Button buttonText='Back to grid' />
        </NavLink>
      </>
    );
  }
}

// MemberPage.propTypes = {};

// MemberPage.defaultProps = {};

export default MemberPage;
