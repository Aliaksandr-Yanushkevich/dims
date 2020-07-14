import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AvForm from 'availity-reactstrap-validation/lib/AvForm';
import AvField from 'availity-reactstrap-validation/lib/AvField';
import { ToastContainer } from 'react-toastify';
import styles from './Account.module.scss';
import firebaseApi from '../../api/firebaseApi';
import Button from '../common/Button/Button';
import fields from './accountFields';
import SubmitButton from '../common/SubmitButton/SubmitButton';
import showToast from '../../helpers/showToast';

const Account = ({ firstName, lastName, role, hideAccountPage, email }) => {
  const updatePassword = (event, errors, values) => {
    if (!errors.length) {
      const { oldPassword, password, repeatedPassword } = values;

      firebaseApi.updatePassword(email, oldPassword, password, repeatedPassword).then((result) => {
        showToast(result);
      });
    }
  };

  const formFields = fields.map(({ id, name, type, label, placeholder, regexp, errorMessage }) => {
    if (id === 'oldPassword') {
      return (
        <AvField
          key={id}
          id={id}
          name={name}
          type={type}
          label={label}
          placeholder={placeholder}
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
        name={name}
        type={type}
        label={label}
        placeholder={placeholder}
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

        <AvForm id='changePassword' className={styles.form} onSubmit={updatePassword}>
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
};

const mapStateToProps = (state) => {
  const { firstName, lastName, role, email } = state.auth;
  return { firstName, lastName, role, email };
};

Account.propTypes = {
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  role: PropTypes.string,
  email: PropTypes.string,
  hideAccountPage: PropTypes.func.isRequired,
};

Account.defaultProps = {
  firstName: '',
  lastName: '',
  role: '',
  email: '',
};

export default connect(mapStateToProps, {})(Account);
