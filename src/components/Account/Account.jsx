import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import styles from './Account.module.scss';
import Button from '../Button/Button';
import firebaseApi from '../../api/firebaseApi';
import PasswordField from '../common/PasswordField/PasswordField';
import validateAccountForm from '../../helpers/validators/validateAccountForm';
import fields from './accountFields';
import FormMessage from '../common/FormMessage/FormMessage';

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

    const isValid = validateAccountForm(password, repeatedPassword);

    if (isValid.formIsValid) {
      firebaseApi.updatePassword(email, oldPassword, password, repeatedPassword).then(({ message }) => {
        this.setState({ message });
      });
    } else {
      const { message, messageType } = isValid;
      this.setState({ message, messageType });
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

  render() {
    const { firstName, lastName, role } = this.props;
    const { message, messageType } = this.state;

    const formFields = fields.map((field) => {
      const { id, name, label, regexp, errorMessage } = field;
      return (
        <PasswordField
          key={id}
          id={id}
          label={label}
          onChange={this.onChange}
          name={name}
          value={this.state[name]}
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

        <form>{formFields}</form>

        <FormMessage className={styles.customMessage} messageType={messageType}>
          {message}
        </FormMessage>
        <div className={styles.buttonWrapper}>
          <Button onClick={this.updatePassword}>Change</Button>
          <NavLink to={role === 'admin' || role === 'mentor' ? '/members' : '/member_tasks'}>
            <Button id='backToGrid'>Back to grid</Button>
          </NavLink>
        </div>
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
