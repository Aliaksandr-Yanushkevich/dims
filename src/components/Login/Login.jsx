import React from 'react';
import { NavLink, Redirect } from 'react-router-dom';
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
    isAuth: false,
  };

  componentDidMount() {
    const user = JSON.parse(sessionStorage.getItem('user'));
    if (user) {
      const { role } = user;
      this.setState({ role, isAuth: true });
    }
  }

  login = () => {
    const { setUser } = this.props;
    const { email, password, remember } = this.state;
    firebaseApi.login(email, password).then(() => {
      firebaseApi.getRole(email).then((result) => {
        const { role, userId, firstName, lastName, email } = result;
        setUser(userId, role, firstName, lastName, email);
        this.setState({ isAuth: true, role });
        if (remember) {
          const user = JSON.stringify(result);
          sessionStorage.setItem('user', user);
        }
      });
    });
  };

  onChange = (e) => {
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
    const { email, password, remember, formIsValid, isAuth, role } = this.state;

    if (isAuth) {
      if (role === 'admin' || role === 'mentor') return <Redirect to='/members' />;
      if (role === 'member') return <Redirect to='/member_tasks' />;
    }

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
