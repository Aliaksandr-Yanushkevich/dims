import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { Button } from 'reactstrap';
import AvForm from 'availity-reactstrap-validation/lib/AvForm';
import AvGroup from 'availity-reactstrap-validation/lib/AvGroup';
import AvField from 'availity-reactstrap-validation/lib/AvField';
import styles from './Login.module.scss';
import { emailRegexp } from '../../constants';
import { login } from '../../redux/reducers/authReducer';

const Login = ({ isAuth, role, login }) => {
  if (isAuth) {
    if (role === 'admin' || role === 'mentor') return <Redirect to='/members' />;
    if (role === 'member') return <Redirect to='/member_tasks' />;
  }

  const fields = [
    {
      id: 'email',
      name: 'email',
      type: 'text',
      label: 'Email:',
      placeholder: 'Email',
      regexp: emailRegexp,
      errorMessage: 'You have entered an invalid email address',
      reguired: true,
    },
    {
      id: 'password',
      name: 'password',
      type: 'password',
      label: 'Password:',
      placeholder: 'Password',
      reguired: true,
    },
  ];

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

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Login</h1>

      <AvForm className={styles.form} onSubmit={login}>
        {formFields}
        <div className={styles.item}>
          <AvGroup>
            <AvField name='remember' label='Remember me' type='checkbox' />
          </AvGroup>
          <Button className={styles.defaultButton} id='login'>
            Login
          </Button>
        </div>
      </AvForm>
    </div>
  );
};

const mapStateToProps = (state) => {
  const { userId, isAuth, firstName, lastName, role, email } = state.auth;
  return { userId, isAuth, firstName, lastName, role, email };
};

Login.propTypes = {
  setUser: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { login })(Login);
