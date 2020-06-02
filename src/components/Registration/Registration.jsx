import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Registration.module.scss';
import Button from '../Button/Button';
import FormField from '../FormField/FormField';
import firebaseApi from '../../api/firebaseApi';
import { emailRegexp } from '../../constants';

class Registration extends React.Component {
  state = {
    email: '',
    password: '',
    repeatedPassword: '',
    formIsValid: false,
  };

  register = () => {
    const { email, password } = this.state;
    firebaseApi.register(email, password);
  };

  onChange = (e) => {
    const { id, value, checked } = e.currentTarget;
    id === 'remember' ? this.setState({ [`${id}`]: checked }) : this.setState({ [`${id}`]: value });
    this.validateForm();
  };

  validateForm = () => {
    // magic numbers here are minimal/maximum length for input fields or other special requirements
    const { email, password, repeatedPassword } = this.state;
    if (emailRegexp.test(email) && password.length >= 4 && password.length <= 30 && password === repeatedPassword) {
      this.setState({ formIsValid: true });
    } else {
      this.setState({ formIsValid: false });
    }
  };

  render() {
    const { email, password, repeatedPassword, formIsValid } = this.state;
    return (
      <div className={styles.wrapper}>
        <h1 className={styles.title}>Registration</h1>
        <form action=''>
          <FormField id='email' label='Email' value={email} onChange={this.onChange} validateForm={this.validateForm} />
          <FormField
            minLength={4}
            maxLength={30}
            inputType='password'
            id='password'
            label='Password'
            value={password}
            onChange={this.onChange}
            validateForm={this.validateForm}
          />
          <FormField
            minLength={4}
            maxLength={30}
            inputType='password'
            id='repeatedPassword'
            label='Repeate password'
            value={repeatedPassword}
            onChange={this.onChange}
            validateForm={this.validateForm}
          />
          <div className={styles.item}>
            {/* <Button disabled={!(loginIsValid && passwordIsValid && paswordsMatch)}>Register</Button> */}
            <Button disabled={!formIsValid} onClick={this.register}>
              Register
            </Button>
          </div>
          <div className={styles.item}>
            Already have a profile?
            <NavLink className={styles.link} to='/login'>
              Login
            </NavLink>
          </div>
        </form>
      </div>
    );
  }
}

export default Registration;
