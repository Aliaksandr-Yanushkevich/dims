import React from 'react';
import { NavLink } from 'react-router-dom';
import firebaseApi from '../../api/firebaseApi';
import styles from './Login.module.scss';
import Button from '../Button/Button';
import FormField from '../FormField/FormField';
import { emailRegexp } from '../../constants';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    remember: false,
    formIsValid: false,
  };

  login = () => {
    const { login, password } = this.state;
    firebaseApi.login(login, password);
  };

  onChange = (e) => {
    debugger;
    const { id, value, checked } = e.currentTarget;
    id === 'remember' ? this.setState({ [id]: checked }) : this.setState({ [id]: value });
    this.validateForm();
  };

  validateForm = () => {
    // magic numbers here are minimal/maximum length for input fields or other special requirements
    const { email, password } = this.state;
    if (emailRegexp.test(email) && password.length) {
      this.setState({ formIsValid: true });
    } else {
      this.setState({ formIsValid: false });
    }
  };

  render() {
    const { email, password, remember, formIsValid } = this.state;
    return (
      <div className={styles.wrapper}>
        <h1 className={styles.title}>Login</h1>
        <form action=''>
          <FormField id='email' label='Login' value={email} onChange={this.onChange} />
          <FormField inputType='password' id='password' label='Password' value={password} onChange={this.onChange} />
          <div className={styles.item}>
            <div className={styles.remember}>
              <label htmlFor='remember'>
                Remember me
                <input id='remember' type='checkbox' checked={remember} onChange={this.onChange} />
              </label>
            </div>
            <Button id='login' disabled={!formIsValid} onClick={this.login}>
              Login
            </Button>
          </div>
          <div className={styles.item}>
            Don&apos;t have an account yet?
            <NavLink to='/registration'>
              <Button id='register'>Register</Button>
            </NavLink>
          </div>
        </form>
      </div>
    );
  }
}

export default Login;
