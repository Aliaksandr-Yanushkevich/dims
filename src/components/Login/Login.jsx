import React from 'react';
import styles from './Login.module.scss';
import Button from '../Button/Button';
import FormField from '../../utils/validators/FormField';

class Login extends React.Component {
  state = {
    login: '',
    password: '',
    remember: false,
    loginIsValid: false,
    passwordIsValid: false,
  };

  onChange = (e) => {
    const { id, value, checked } = e.currentTarget;
    switch (id) {
      case 'login':
        this.setState({ login: value });
        break;
      case 'password':
        this.setState({ password: value });
        break;
      case 'remember':
        this.setState({ remember: checked });
        break;
      default:
        break;
    }
  };

  validateForm = (id, message) => {
    switch (id) {
      case 'login':
        this.setState({ loginIsValid: !message });
        break;
      case 'password':
        this.setState({ passwordIsValid: !message });
        break;
      default:
        break;
    }
  };

  render() {
    const { login, password, remember, loginIsValid, passwordIsValid } = this.state;
    return (
      <div className={styles.wrapper}>
        <h1 className='title'>Login</h1>
        <form action=''>
          <FormField
            required
            inputType='text'
            id='login'
            label='Login'
            value={login}
            onChange={this.onChange}
            validateForm={this.validateForm}
          />
          <FormField
            required
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
            <Button disabled={!(loginIsValid && passwordIsValid)}>Login</Button>
          </div>
        </form>
      </div>
    );
  }
}

export default Login;
