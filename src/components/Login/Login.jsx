import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import firebaseApi from '../../api/firebaseApi';
import styles from './Login.module.scss';
import Button from '../Button/Button';
import { emailRegexp } from '../../constants';
import getUserFromSessionStorage from '../../helpers/getUserFromSessionStorage';
import TextField from '../common/TextField/TextField';
import PasswordField from '../common/PasswordField/PasswordField';
import Checkbox from '../common/Checkbox/Checkbox';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    remember: false,
    formIsValid: false,
    isAuth: false,
    message: '',
  };

  componentDidMount() {
    const user = getUserFromSessionStorage();
    if (user) {
      const { role } = user;
      this.setState({ role, isAuth: true });
    }
  }

  login = () => {
    const { setUser } = this.props;
    const { email, password, remember } = this.state;

    firebaseApi.login(email, password, remember).then((result) => {
      const { role, userId, firstName, lastName } = result;
      setUser(userId, role, firstName, lastName, email);
      this.setState({ isAuth: true, role });
    });
  };

  onChange = (e) => {
    const { id, value, checked } = e.currentTarget;
    if (id === 'remember') {
      this.setState({ [id]: checked });
    } else {
      this.setState({ [id]: value });
    }

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
    const { email, password, remember, formIsValid, isAuth, role, message } = this.state;

    if (isAuth) {
      if (role === 'admin' || role === 'mentor') {
        return <Redirect to='/members' />;
      }

      if (role === 'member') {
        return <Redirect to='/member_tasks' />;
      }
    }

    return (
      <div className={styles.wrapper}>
        <h1 className={styles.title}>Login</h1>
        <form>
          <TextField
            id='email'
            name='email'
            label='Email:'
            value={email}
            onChange={this.onChange}
            regexp={emailRegexp}
            errorMessage='Email is invalid'
          />
          <PasswordField id='password' name='password' label='Password:' value={password} onChange={this.onChange} />
          <div className={styles.item}>
            <div className={styles.remember}>
              <Checkbox id='remember' name='remember' checked={remember} onChange={this.onChange}>
                Remember me
              </Checkbox>
            </div>
            <Button id='login' disabled={!formIsValid} onClick={this.login}>
              Login
            </Button>
          </div>
        </form>
        <div className={styles.message}>
          <p>{message}</p>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  setUser: PropTypes.func.isRequired,
};

export default Login;
