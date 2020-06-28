import React from 'react';
import PropTypes from 'prop-types';
import checkRequirements from '../../../helpers/validators/checkRequirements';
import styles from './NumberField.module.scss';
import { requiredMessage } from '../../../constants';
import FormMessage from '../FormMessage/FormMessage';

class NumberField extends React.Component {
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

      if (!value) {
        this.setState({ message: requiredMessage });
      } else if (!fieldIsValid) {
        this.setState({ message: errorMessage });
      } else {
        this.setState({ message: null });
      }
    }
  };

  render() {
    const { id, name, label, value, onChange, step } = this.props;
    const { touched, message } = this.state;

    return (
      <div className={styles.inputGroup}>
        <div className={styles.item}>
          <label htmlFor={id}>{label}</label>
          <input
            id={id}
            name={name}
            type='number'
            value={value}
            onChange={onChange}
            step={step}
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

NumberField.propTypes = {
  id: PropTypes.string.isRequired,
  step: PropTypes.number,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  regexp: PropTypes.instanceOf(RegExp),
  errorMessage: PropTypes.string,
};

NumberField.defaultProps = {
  name: '',
  value: '',
  step: 1,
  regexp: null,
  errorMessage: null,
};

export default NumberField;
