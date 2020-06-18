import React from 'react';
import ReactDom from 'react-dom';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import AvForm from 'availity-reactstrap-validation/lib/AvForm';
import AvField from 'availity-reactstrap-validation/lib/AvField';
import styles from './Account.module.scss';
import firebaseApi from '../../api/firebaseApi';
import { passwordRegexp } from '../../constants';

class Account extends React.Component {
  constructor() {
    super();
    this.state = {
      oldPassword: '',
      password: '',
      repeatedPassword: '',
    };
    this.root = document.createElement('div');
    document.body.appendChild(this.root);
  }

  componentWillUnmount() {
    document.body.removeChild(this.root);
  }

  updatePassword = (event, errors) => {
    if (!errors.length) {
      const { email } = this.props;
      const { oldPassword, password } = this.state;

      firebaseApi
        .login(email, oldPassword)
        .then(() => {
          firebaseApi.updatePassword(password);
        })
        .then(() => {
          console.log('Password was successfully changed');
        })
        .catch(({ message }) => {
          console.error({ message });
        });
    }
  };

  onChange = (e) => {
    const { id, value } = e.currentTarget;
    this.setState({ [`${id}`]: value });
  };

  render() {
    const { firstName, lastName, role, hideAccountPage } = this.props;
    const { oldPassword, password, repeatedPassword } = this.state;
    const fields = [
      {
        id: 'oldPassword',
        value: oldPassword,
        name: 'oldPassword',
        type: 'password',
        label: 'Old password:',
        placeholder: 'Old password',
      },
      {
        id: 'password',
        value: password,
        name: 'password',
        type: 'password',
        label: 'Password:',
        placeholder: 'Password:',
        regexp: passwordRegexp,
        errorMessage:
          'Password must be a minimum of eight characters and contain lowercase letters, uppercase letters and numbers',
      },
      {
        id: 'repeatedPassword',
        value: repeatedPassword,
        name: 'repeatedPassword',
        type: 'password',
        label: 'Repeate password:',
        placeholder: 'Repeate password',
        regexp: `/^${password}$/`,
        errorMessage: 'Password mismatch',
      },
    ];

    const formFields = fields.map(({ id, value, name, type, label, placeholder, regexp, errorMessage }) => {
      if (id === 'oldPassword') {
        return (
          <AvField
            key={id}
            id={id}
            value={value}
            name={name}
            type={type}
            label={label}
            placeholder={placeholder}
            onChange={this.onChange}
            validate={{
              required: { value: true, errorMessage: 'Field is required' },
            }}
          />
        );
      }
      return (
        <AvField
          key={id}
          id={id}
          value={value}
          name={name}
          type={type}
          label={label}
          placeholder={placeholder}
          onChange={this.onChange}
          validate={{
            required: { value: true, errorMessage: 'Field is required' },
            pattern: {
              value: `${regexp}`,
              errorMessage,
            },
          }}
        />
      );
    });

    return ReactDom.createPortal(
      <div className={styles.wrapper}>
        <h1 className={styles.title}>Account</h1>
        <p>{`Name: ${firstName} ${lastName}`}</p>
        <p>{`Role: ${role}`}</p>
        <AvForm className={styles.form} onSubmit={this.updatePassword}>
          {formFields}

          <div className={styles.buttonWrapper}>
            <Button className={styles.successButton} id='change'>
              Change
            </Button>

            <Button className={styles.defaultButton} id='backToGrid' onClick={hideAccountPage}>
              Back to grid
            </Button>
          </div>
        </AvForm>
      </div>,
      this.root,
    );
  }
}

Account.propTypes = {
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  role: PropTypes.string,
  email: PropTypes.string,
  hideAccountPage: PropTypes.func,
};

Account.defaultProps = {
  firstName: '',
  lastName: '',
  role: '',
  email: '',
  hideAccountPage: () => {},
};

export default Account;
