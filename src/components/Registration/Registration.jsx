import React from 'react';
import { NavLink } from 'react-router-dom';
import firebaseApi from '../../api/firebaseApi';
import styles from './Registration.module.scss';
import Button from '../Button/Button';
import FormField from '../FormField/FormField';

class Registration extends React.Component {
  state = {
    email: '',
    password: '',
    repeatedPassword: '',
    emailIsValid: false,
    passwordIsValid: false,
    paswordsMatch: false,
  };

  register = () => {
    const { email, password } = this.state;
    firebaseApi.register(email, password);
  };

  onChange = (e) => {
    const { id, value, checked } = e.currentTarget;
    id === 'remember' ? this.setState({ [`${id}`]: checked }) : this.setState({ [`${id}`]: value });
  };

  validateForm = (id, message) => {
    this.setState({ [`${id}IsValid`]: !message });
  };

  render() {
    const { email, password, paswordsMatch, loginIsValid, passwordIsValid } = this.state;
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
            value={password}
            onChange={this.onChange}
            validateForm={this.validateForm}
          />
          <div className={styles.item}>
            {/* <Button disabled={!(loginIsValid && passwordIsValid && paswordsMatch)}>Register</Button> */}
            <Button onClick={this.register}>Register</Button>
          </div>
          <div className={styles.item}>
            Do you already have a profile?
            <NavLink to='/login'>Login</NavLink>
          </div>
        </form>
      </div>
    );
  }
}

export default Registration;
