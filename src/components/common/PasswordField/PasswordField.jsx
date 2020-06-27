import React from 'react';
import PropTypes from 'prop-types';
import checkRequirements from '../../../helpers/checkRequirements';
import styles from './PasswordField.module.scss';
import { passwordRegexp, requiredMessage } from '../../../constants';

class PasswordField extends React.Component {
  state = {
    touched: false,
    message: null,
  };

  onFocus = () => {
    this.setState({ touched: true });
  };

  checkField = () => {
    const { value } = this.props;
    const { touched } = this.state;
    if (touched) {
      const fieldIsValid = checkRequirements(passwordRegexp, value);
      const errorMessage =
        'Password must be a minimum of eight characters and contain lowercase letters, uppercase letters and numbers';

      if (!value.length) {
        this.setState({ message: requiredMessage });
      } else if (!fieldIsValid) {
        this.setState({ message: errorMessage });
      } else {
        this.setState({ message: null });
      }
    }
  };

  render() {
    const { id, name, label, onChange, value } = this.props;
    const { touched, message } = this.state;

    return (
      <div className={styles.gridItem}>
        <div className={styles.item}>
          <label htmlFor={id}>{label}</label>
          <input
            id={id}
            name={name}
            type='password'
            value={value}
            onChange={onChange}
            onFocus={this.onFocus}
            onBlur={this.checkField}
            className={message && touched ? styles.error : null}
            required
          />
        </div>
        <p className={styles.message}>{message}</p>
      </div>
    );
  }
}

PasswordField.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string,
  value: PropTypes.string,
};

PasswordField.defaultProps = {
  name: '',
  value: '',
};

export default PasswordField;
