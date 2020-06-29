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
import FormMessage from '../common/FormMessage/FormMessage';
import validateLoginForm from '../../helpers/validators/validateLoginForm';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    remember: false,
    isAuth: false,
    message: '',
    messageType: null,
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
    const isValid = validateLoginForm(email);

    if (isValid.formIsValid) {
      firebaseApi.login(email, password, remember).then((result) => {
        const { role, userId, firstName, lastName, message, messageType } = result;

        if (Object.keys(result).includes('message')) {
          this.setState({ message, messageType });
        }
        setUser(userId, role, firstName, lastName, email);
        this.setState({ isAuth: true, role });
      });
    } else {
      const { message, messageType } = isValid;
      this.setState({ message, messageType });
    }
  };

  onChange = (e) => {
    const { id, value, checked } = e.currentTarget;
    this.setState({ message: '', messageType: null });
    if (id === 'remember') {
      this.setState({ [id]: checked });
    } else {
      this.setState({ [id]: value });
    }
  };

  render() {
    const { email, password, remember, isAuth, role, message, messageType } = this.state;

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
        </form>

        <FormMessage className={styles.customMessage} messageType={messageType}>
          {message}
        </FormMessage>

        <div className={styles.item}>
          <div className={styles.remember}>
            <Checkbox id='remember' name='remember' checked={remember} onChange={this.onChange}>
              Remember me
            </Checkbox>
          </div>
          <Button onClick={this.login}>Login</Button>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  setUser: PropTypes.func.isRequired,
};

export default Login;
