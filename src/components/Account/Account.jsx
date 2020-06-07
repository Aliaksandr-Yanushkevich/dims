import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Account.module.scss';
import Button from '../Button/Button';
import FormField from '../FormField/FormField';
import firebaseApi from '../../api/firebaseApi';

class Account extends React.Component {
  state = {
    oldPassword: '',
    password: '',
    repeatedPassword: '',
    formIsValid: false,
    message: null,
  };

  updatePassword = () => {
    const { email } = this.props;
    const { oldPassword, password, repeatedPassword } = this.state;
    if (password === repeatedPassword) {
      firebaseApi
        .login(email, oldPassword)
        .then(() => {
          firebaseApi.updatePassword(password);
        })
        .then(() => {
          console.log('Password was successfully changed');
        })
        .catch((error) => console.error('Password change failure', error));
    }
  };

  onChange = (e) => {
    const { id, value, checked } = e.currentTarget;
    id === 'remember' ? this.setState({ [`${id}`]: checked }) : this.setState({ [`${id}`]: value });
    this.validateForm();
  };

  validateForm = () => {
    // magic numbers here are minimal/maximum length for input fields or other special requirements
    const { password, repeatedPassword } = this.state;
    if (password.length >= 4 && password.length <= 30 && password === repeatedPassword) {
      this.setState({ formIsValid: true });
    } else {
      this.setState({ formIsValid: false });
    }
  };

  render() {
    const { firstName, lastName, role } = this.props;
    const { oldPassword, password, repeatedPassword, formIsValid } = this.state;
    return (
      <div className={styles.wrapper}>
        <h1 className={styles.title}>{`${firstName} ${lastName} account`}</h1>
        <p>{`Role: ${role}`}</p>
        <form action=''>
          <FormField
            minLength={4}
            maxLength={30}
            inputType='password'
            id='oldPassword'
            label='Old password:'
            value={oldPassword}
            onChange={this.onChange}
            validateForm={this.validateForm}
          />
          <FormField
            minLength={4}
            maxLength={30}
            inputType='password'
            id='password'
            label='Password:'
            value={password}
            onChange={this.onChange}
            validateForm={this.validateForm}
          />
          <FormField
            minLength={4}
            maxLength={30}
            inputType='password'
            id='repeatedPassword'
            label='Repeate password:'
            value={repeatedPassword}
            onChange={this.onChange}
            validateForm={this.validateForm}
          />
          <div className={styles.buttonWrapper}>
            <Button disabled={!formIsValid} onClick={this.updatePassword}>
              Change
            </Button>
            <NavLink to={role === 'admin' || role === 'admin' ? '/members' : '/member_tasks'}>
              <Button>Back to grid</Button>
            </NavLink>
          </div>
        </form>
      </div>
    );
  }
}

export default Account;
