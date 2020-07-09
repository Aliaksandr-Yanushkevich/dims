import React from 'react';
import PropTypes from 'prop-types';
import checkRequirements from '../../../helpers/validators/checkRequirements';
import styles from './TextField.module.scss';
import { requiredMessage } from '../../../constants';
import FormMessage from '../FormMessage/FormMessage';

class TextField extends React.Component {
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
    const { id, name, label, placeholder, onChange, value, disabled } = this.props;
    const { touched, message } = this.state;

    return (
      <div className={styles.inputGroup}>
        <div className={styles.item}>
          <label htmlFor={id}>{label}</label>
          <input
            id={id}
            name={name}
            type='text'
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            onFocus={this.onFocus}
            onBlur={this.checkField}
            className={message && touched ? styles.error : null}
            required
            disabled={disabled}
          />
        </div>
        <FormMessage messageType='warning'>{message}</FormMessage>
      </div>
    );
  }
}

TextField.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  value: PropTypes.string,
  regexp: PropTypes.instanceOf(RegExp),
  errorMessage: PropTypes.string,
};

TextField.defaultProps = {
  name: '',
  placeholder: '',
  disabled: false,
  value: '',
  regexp: null,
  errorMessage: null,
};

export default TextField;
