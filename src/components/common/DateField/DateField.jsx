import React from 'react';
import PropTypes from 'prop-types';
import checkRequirements from '../../../helpers/validators/checkRequirements';
import styles from './DateField.module.scss';
import { requiredMessage } from '../../../constants';
import FormMessage from '../FormMessage/FormMessage';

class DateField extends React.Component {
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
    const { id, name, label, value, onChange, disabled } = this.props;
    const { touched, message } = this.state;
    return (
      <div className={styles.inputGroup}>
        <div className={styles.item}>
          <label htmlFor={id}>{label}</label>
          <input
            id={id}
            name={name}
            type='date'
            onFocus={this.onFocus}
            onBlur={this.checkField}
            onChange={onChange}
            value={value}
            className={message && touched ? styles.error : null}
            disabled={disabled}
            required
          />
        </div>
        <FormMessage messageType='warning'>{message}</FormMessage>
      </div>
    );
  }
}

DateField.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  name: PropTypes.string,
  value: PropTypes.string,
  regexp: PropTypes.string,
  errorMessage: PropTypes.string,
};

DateField.defaultProps = {
  name: '',
  value: '',
  regexp: null,
  errorMessage: null,
  disabled: false,
};

export default DateField;
