import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { Button } from 'reactstrap';
import AvForm from 'availity-reactstrap-validation/lib/AvForm';
import AvGroup from 'availity-reactstrap-validation/lib/AvGroup';
import AvField from 'availity-reactstrap-validation/lib/AvField';
import firebaseApi from '../../api/firebaseApi';
import styles from './Login.module.scss';
import { emailRegexp } from '../../constants';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    remember: false,
    isAuth: false,
  };

  componentDidMount() {
    const user = JSON.parse(sessionStorage.getItem('user'));
    if (user) {
      const { role } = user;
      this.setState({ role, isAuth: true });
    }
  }

  login = (event, errors) => {
    if (!errors.length) {
      const { setUser } = this.props;
      const { email, password, remember } = this.state;
      firebaseApi
        .login(email, password)
        .then(() => {
          firebaseApi.getRole(email).then((result) => {
            const { role, userId, firstName, lastName } = result;
            setUser(userId, role, firstName, lastName, email);
            this.setState({ isAuth: true, role });
            if (remember) {
              const user = JSON.stringify(result);
              sessionStorage.setItem('user', user);
            }
          });
        })
        .catch(({ message }) => {
          console.error(message);
        });
    }
  };

  onChange = (e) => {
    const { id, value, checked } = e.currentTarget;
    id === 'remember' ? this.setState({ [id]: checked }) : this.setState({ [id]: value });
  };

  render() {
    const { email, password, isAuth, role, remember } = this.state;
    const fields = [
      {
        id: 'email',
        value: email,
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
        value: password,
        name: 'password',
        type: 'password',
        label: 'Password:',
        placeholder: 'Password',
        reguired: true,
      },
    ];

    const formFields = fields.map(({ id, value, name, type, label, placeholder, regexp, errorMessage, required }) => {
      if (type === 'password') {
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
              required: { value: required, errorMessage: 'Field is required' },
            }}
          />
        );
      }

      return (
        <AvField
          id={id}
          value={value}
          name={name}
          type={type}
          label={label}
          placeholder={placeholder}
          onChange={this.onChange}
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
      if (role === 'admin' || role === 'mentor') return <Redirect to='/members' />;
      if (role === 'member') return <Redirect to='/member_tasks' />;
    }

    return (
      <div className={styles.wrapper}>
        <h1 className={styles.title}>Login</h1>

        <AvForm onSubmit={this.login}>
          {formFields}
          <div className={styles.item}>
            <AvGroup>
              <AvField name='remember' label='Remember me' type='checkbox' onChange={this.onChange} value={remember} />
            </AvGroup>
            <Button className={styles.defaultButton} id='login'>
              Login
            </Button>
          </div>
        </AvForm>
      </div>
    );
  }
}

Login.propTypes = {
  setUser: PropTypes.func.isRequired,
};

export default Login;
