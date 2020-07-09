import React from 'react';
import PropTypes from 'prop-types';
import checkRequirements from '../../../helpers/validators/checkRequirements';
import styles from './PasswordField.module.scss';
import { requiredMessage } from '../../../constants';
import FormMessage from '../FormMessage/FormMessage';

class PasswordField extends React.Component {
  state = {
    touched: false,
    message: null,
  };

  onFocus = () => {
    this.setState({ touched: true });
  };

  checkField = () => {
    const { value, regexp, errorMessage } = this.props;
    const { touched } = this.state;
    if (touched) {
      const fieldIsValid = checkRequirements(regexp, value);

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
      <div className={styles.inputGroup}>
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
        <FormMessage messageType='warning'>{message}</FormMessage>
      </div>
    );
  }
}

PasswordField.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  regexp: PropTypes.instanceOf(RegExp),
  errorMessage: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
};

PasswordField.defaultProps = {
  name: '',
  value: '',
  regexp: null,
  errorMessage: '',
};

export default PasswordField;
