import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import AvForm from 'availity-reactstrap-validation/lib/AvForm';
import AvGroup from 'availity-reactstrap-validation/lib/AvGroup';
import AvField from 'availity-reactstrap-validation/lib/AvField';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import firebaseApi from '../../api/firebaseApi';
import styles from './Login.module.scss';
import getUserFromSessionStorage from '../../helpers/getUserFromSessionStorage';
import fields from './loginField';
import SubmitButton from '../common/SubmitButton/SubmitButton';
import showToast from '../../helpers/showToast';

class Login extends React.Component {
  state = {
    isAuth: false,
  };

  componentDidMount() {
    const user = getUserFromSessionStorage();
    if (user) {
      const { role } = user;
      this.setState({ role, isAuth: true });
    }
  }

  login = (event, errors, values) => {
    const { setUser } = this.props;
    const { email, password, remember } = values;
    if (!errors.length) {
      firebaseApi.login(email, password, remember).then((result) => {
        const { message, role, userId, firstName, lastName } = result;
        if (message) {
          showToast(result);
        } else {
          setUser(userId, role, firstName, lastName, email);
          this.setState({ isAuth: true, role });
        }
      });
    }
  };

  render() {
    const { isAuth, role } = this.state;
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
      if (role === 'admin' || role === 'mentor') {
        return <Redirect to='/members' />;
      }

      if (role === 'member') {
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

          <AvForm id='login' className={styles.form} onSubmit={this.login}>
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
  }
}

Login.propTypes = {
  setUser: PropTypes.func.isRequired,
};

export default Login;
