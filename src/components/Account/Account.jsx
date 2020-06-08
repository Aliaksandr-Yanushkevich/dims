import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { Button } from 'reactstrap';
import styles from './Account.module.scss';
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
    if (oldPassword === password) {
      this.setState({ message: 'Old and new password match. Enter another password and try again' });
    } else if (password === repeatedPassword) {
      firebaseApi
        .login(email, oldPassword)
        .then(() => {
          firebaseApi.updatePassword(password);
        })
        .then(() => {
          this.setState({ message: '' });
          console.log('Password was successfully changed');
        })
        .catch(({ message }) => this.setState({ message }));
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
    if (password.length >= 6 && password.length <= 30 && password === repeatedPassword) {
      this.setState({ formIsValid: true });
    } else {
      this.setState({ formIsValid: false });
    }
  };

  render() {
    const { firstName, lastName, role } = this.props;
    const { oldPassword, password, repeatedPassword, formIsValid, message } = this.state;
    return (
      <div className={styles.wrapper}>
        <h1 className={styles.title}>Account</h1>
        <p>{`Name: ${firstName} ${lastName}`}</p>
        <p>{`Role: ${role}`}</p>
        <form>
          <FormField
            minLength={6}
            maxLength={30}
            inputType='password'
            id='oldPassword'
            label='Old password:'
            value={oldPassword}
            onChange={this.onChange}
            validateForm={this.validateForm}
          />
          <FormField
            minLength={6}
            maxLength={30}
            inputType='password'
            id='password'
            label='Password:'
            value={password}
            onChange={this.onChange}
            validateForm={this.validateForm}
          />
          <FormField
            minLength={6}
            maxLength={30}
            inputType='password'
            id='repeatedPassword'
            label='Repeate password:'
            value={repeatedPassword}
            onChange={this.onChange}
            validateForm={this.validateForm}
          />
          <div className={styles.message}>
            <p>{message}</p>
          </div>
          <div className={styles.buttonWrapper}>
            <Button id='change' disabled={!formIsValid} onClick={this.updatePassword}>
              Change
            </Button>
            <NavLink to={role === 'admin' || role === 'admin' ? '/members' : '/member_tasks'}>
              <Button id='backToGrid'>Back to grid</Button>
            </NavLink>
          </div>
        </form>
      </div>
    );
  }
}

Account.propTypes = {
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  role: PropTypes.string,
  email: PropTypes.string,
};

Account.defaultProps = {
  firstName: '',
  lastName: '',
  role: '',
  email: '',
};

export default Account;
