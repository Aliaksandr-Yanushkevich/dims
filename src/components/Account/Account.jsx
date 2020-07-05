import React from 'react';
import PropTypes from 'prop-types';
import AvForm from 'availity-reactstrap-validation/lib/AvForm';
import AvField from 'availity-reactstrap-validation/lib/AvField';
import styles from './Account.module.scss';
import firebaseApi from '../../api/firebaseApi';
import Button from '../common/Button/Button';
import fields from './accountFields';
import SubmitButton from '../common/SubmitButton/SubmitButton';
import showToast from '../../helpers/showToast';
import { ToastContainer } from 'react-toastify';

class Account extends React.Component {
  updatePassword = (event, errors, values) => {
    if (!errors.length) {
      const { email } = this.props;
      const { oldPassword, password, repeatedPassword } = values;

      firebaseApi.updatePassword(email, oldPassword, password, repeatedPassword).then((result) => {
        showToast(result);
      });
    }
  };

  render() {
    const { firstName, lastName, role, hideAccountPage } = this.props;

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

    return (
      <>
        <ToastContainer />
        <div className={styles.wrapper}>
          <h1 className={styles.title}>Account</h1>
          <p>{`Name: ${firstName} ${lastName}`}</p>
          <p>{`Role: ${role}`}</p>

          <AvForm id='changePassword' className={styles.form} onSubmit={this.updatePassword}>
            {formFields}
          </AvForm>
          <div className={styles.buttonWrapper}>
            <SubmitButton className={styles.successButton} form='changePassword'>
              Change
            </SubmitButton>

            <Button className={styles.defaultButton} id='backToGrid' onClick={hideAccountPage}>
              Back to grid
            </Button>
          </div>
        </div>
      </>
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
