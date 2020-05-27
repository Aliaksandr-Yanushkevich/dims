import React from 'react';
import { NavLink } from 'react-router-dom';
import firebaseApi from '../../api/firebaseApi';
import styles from './Login.module.scss';
import Button from '../Button/Button';
import FormField from '../FormField/FormField';

class Login extends React.Component {
  state = {
    login: '',
    password: '',
    remember: false,
    loginIsValid: false,
    passwordIsValid: false,
  };

  login = () => {
    const { login, password } = this.state;
    firebaseApi.login(login, password);
  };

  onChange = (e) => {
    const { id, value, checked } = e.currentTarget;
    id === 'remember' ? this.setState({ [id]: checked }) : this.setState({ [id]: value });
  };

  validateForm = (id, message) => {
    this.setState({ [`${id}IsValid`]: !message });
  };

  render() {
    const { login, password, remember, loginIsValid, passwordIsValid } = this.state;
    return (
      <div className={styles.wrapper}>
        <h1 className={styles.title}>Login</h1>
        <form action=''>
          <FormField id='login' label='Login' value={login} onChange={this.onChange} validateForm={this.validateForm} />
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
          <div className={styles.item}>
            <div className={styles.remember}>
              <label htmlFor='remember'>
                Remember me
                <input id='remember' type='checkbox' checked={remember} onChange={this.onChange} />
              </label>
            </div>
            <Button disabled={!(loginIsValid && passwordIsValid)} onClick={this.login}>
              Login
            </Button>
          </div>
          <div className={styles.item}>
            Don&apos;t have an account yet?
            <NavLink to='/registration'>
              <Button>Register</Button>
            </NavLink>
          </div>
        </form>
      </div>
    );
  }
}

export default Login;
