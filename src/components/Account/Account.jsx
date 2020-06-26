import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import styles from './Account.module.scss';
import Button from '../Button/Button';
import FormField from '../FormField/FormField';
import firebaseApi from '../../api/firebaseApi';

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
    const { oldPassword, password, repeatedPassword } = this.state;

    firebaseApi.updatePassword(email, oldPassword, password, repeatedPassword).then(({ message }) => {
      this.setState({ message });
    });
  };

  isPasswordValid = (password, repeatedPassword, minLength, maxLength) => {
    if (password.length >= minLength && password.length <= maxLength && password === repeatedPassword) {
      return true;
    }
    return false;
  };

  onChange = (e) => {
    const { name, value } = e.currentTarget;
    const { message } = this.state;
    if (message) {
      this.setState({ message: null });
    }
    this.setState({ [name]: value });
    this.validateForm();
  };

  validateForm = () => {
    const { password, repeatedPassword } = this.state;
    // magic numbers here are minimal/maximum length for password
    if (this.isPasswordValid(password, repeatedPassword, 6, 30)) {
      this.setState({ formIsValid: true });
    } else {
      this.setState({ formIsValid: false });
    }
  };

  render() {
    const { firstName, lastName, role } = this.props;
    const { oldPassword, password, repeatedPassword, formIsValid, message } = this.state;
    const fields = [
      {
        minLength: 6,
        maxLength: 30,
        inputType: 'password',
        id: 'oldPassword',
        name: 'oldPassword',
        label: 'Old password:',
        value: oldPassword,
      },
      {
        minLength: 6,
        maxLength: 30,
        inputType: 'password',
        id: 'password',
        name: 'password',
        label: 'Password:',
        value: password,
      },
      {
        minLength: 6,
        maxLength: 30,
        inputType: 'password',
        id: 'repeatedPassword',
        name: 'repeatedPassword',
        label: 'Repeate password:',
        value: repeatedPassword,
      },
    ];
    const formFields = fields.map((field) => {
      const { minLength, maxLength, inputType, id, name, label, value } = field;
      return (
        <FormField
          key={id}
          minLength={minLength}
          maxLength={maxLength}
          inputType={inputType}
          id={id}
          name={name}
          label={label}
          value={value}
          onChange={this.onChange}
          validateForm={this.validateForm}
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
            <p>{message}</p>
          </div>
          <div className={styles.buttonWrapper}>
            <Button id='change' disabled={!formIsValid} onClick={this.updatePassword}>
              Change
            </Button>
            <NavLink to={role === 'admin' || role === 'admin' ? '/members' : '/member_tasks'}>
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
