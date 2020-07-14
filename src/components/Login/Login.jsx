import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import AvForm from 'availity-reactstrap-validation/lib/AvForm';
import AvGroup from 'availity-reactstrap-validation/lib/AvGroup';
import AvField from 'availity-reactstrap-validation/lib/AvField';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { login, setRole } from '../../redux/reducers/authReducer';
import styles from './Login.module.scss';
import getUserFromSessionStorage from '../../helpers/getUserFromSessionStorage';
import fields from './loginField';
import SubmitButton from '../common/SubmitButton/SubmitButton';
import { setCurrentUser } from '../../redux/reducers/appReducer';

const Login = ({ isAuth, role, login, setRole, setCurrentUser, userId }) => {
  const isAdmin = role === 'admin';
  const isMentor = role === 'mentor';
  const isMember = role === 'member';
  const user = getUserFromSessionStorage();
  const formFields = fields.map(({ id, name, type, label, placeholder, regexp, errorMessage, required }) => {
    if (type === 'password') {
      return (
        <AvField
          key={id}
          id={id}
          name={name}
          type={type}
          label={label}
          placeholder={placeholder}
          validate={{
            required: { value: required, errorMessage: 'Field is required' },
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
          required: { value: required, errorMessage: 'Field is required' },
          pattern: {
            value: `${regexp}`,
            errorMessage,
          },
        }}
      />
    );
  });

  if (isAuth) {
    setCurrentUser(userId);
    if (isAdmin || isMentor) return <Redirect to='/members' />;
    if (isMember) return <Redirect to='/member_tasks' />;
  }

  if (user) {
    setRole(user);
  }

  if (isAuth) {
    if (isAdmin || isMentor) {
      return <Redirect to='/members' />;
    }

    if (isMember) {
      return <Redirect to='/member_tasks' />;
    }
  }

  return (
    <>
      <ToastContainer
        position='top-right'
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className={styles.wrapper}>
        <h1 className={styles.title}>Login</h1>

        <AvForm id='login' className={styles.form} onSubmit={login}>
          {formFields}
          <div className={styles.item}>
            <AvGroup>
              <AvField name='remember' label='Remember me' type='checkbox' />
            </AvGroup>
            <SubmitButton className={styles.defaultButton} form='login'>
              Login
            </SubmitButton>
          </div>
        </AvForm>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  const { userId, isAuth, firstName, lastName, role, email } = state.auth;
  return { userId, isAuth, firstName, lastName, role, email };
};

Login.propTypes = {
  isAuth: PropTypes.bool.isRequired,
  role: PropTypes.string,
  login: PropTypes.func.isRequired,
  setRole: PropTypes.func.isRequired,
  setCurrentUser: PropTypes.func.isRequired,
  userId: PropTypes.string,
};

Login.defaultProps = {
  role: null,
  userId: null,
};

export default connect(mapStateToProps, { login, setRole, setCurrentUser })(Login);
