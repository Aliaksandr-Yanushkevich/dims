import React from 'react';
import styles from './Login.module.scss';
import Button from '../Button/Button';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login: null,
      password: null,
    };
  }

  onChange = (e) => {
    const { id, value } = e.currentTarget;
    switch (id) {
      case 'login':
        this.setState({ login: value });
        break;
      case 'password':
        this.setState({ password: value });
        break;
      default:
        break;
    }
  };

  render() {
    const { login, password } = this.state;
    return (
      <div className={styles.wrapper}>
        <h1>Login</h1>
        <div className={styles.item}>
          <label htmlFor='login'>Login</label>
          <input id='login' type='text' value={login} onChange={this.onChange} />
        </div>
        <div className={styles.item}>
          <label htmlFor='password'>Password</label>
          <input id='password' type='password' value={password} onChange={this.onChange} />
        </div>
        <div className={styles.item}>
          <div className={styles.remember}>
            <input id='remember' type='checkbox' />
            <label htmlFor='remember'>Remember me</label>
          </div>
          <Button className={styles.sussessButton} buttonText='Login' />
        </div>
      </div>
    );
  }
}

export default Login;
