import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import styles from './Account.module.scss';
import Button from '../Button/Button';
import firebaseApi from '../../api/firebaseApi';
import PasswordField from '../common/PasswordField/PasswordField';
import { passwordRegexp } from '../../constants';
import validateAccountForm from '../../helpers/validators/validateAccountForm';

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
    const { oldPassword, password, repeatedPassword, formIsValid } = this.state;

    this.validateForm();

    if (formIsValid) {
      firebaseApi.updatePassword(email, oldPassword, password, repeatedPassword).then(({ message }) => {
        this.setState({ message });
      });
    }
  };

  onChange = (e) => {
    const { name, value } = e.currentTarget;
    const { message } = this.state;
    if (message) {
      this.setState({ message: null });
    }
    this.setState({ [name]: value });
  };

  validateForm = () => {
    const { password, repeatedPassword } = this.state;
    const formIsValid = validateAccountForm(password, repeatedPassword);
    this.setState(formIsValid);
  };

  render() {
    const { firstName, lastName, role } = this.props;
    const { oldPassword, password, repeatedPassword, message } = this.state;
    const fields = [
      {
        id: 'oldPassword',
        name: 'oldPassword',
        label: 'Old password:',
        value: oldPassword,
      },
      {
        id: 'password',
        name: 'password',
        label: 'Password:',
        value: password,
        regexp: passwordRegexp,
        errorMessage:
          'Password must be a minimum of eight characters and contain lowercase letters, uppercase letters and numbers',
      },
      {
        id: 'repeatedPassword',
        name: 'repeatedPassword',
        label: 'Repeate password:',
        value: repeatedPassword,
        regexp: passwordRegexp,
        errorMessage:
          'Password must be a minimum of eight characters and contain lowercase letters, uppercase letters and numbers',
      },
    ];
    const formFields = fields.map((field) => {
      const { id, name, label, value, regexp, errorMessage } = field;
      return (
        <PasswordField
          key={id}
          id={id}
          label={label}
          onChange={this.onChange}
          name={name}
          value={value}
          regexp={regexp}
          errorMessage={errorMessage}
        />
      );
    });

    return (
      <div className={styles.wrapper}>
        <h1 className={styles.title}>Account</h1>
        <p>{`Name: ${firstName} ${lastName}`}</p>
        <p>{`Role: ${role}`}</p>
        <form>
          {formFields}
          <div className={styles.message}>
            <p className={styles.formMessage}>{message}</p>
          </div>
          <div className={styles.buttonWrapper}>
            <Button onClick={this.updatePassword}>Change</Button>
            <NavLink to={role === 'admin' || role === 'mentor' ? '/members' : '/member_tasks'}>
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
