import React from 'react';
import PropTypes from 'prop-types';
import styles from './FormField.module.scss';
import { emailRegexp, latinLetterRegexp } from '../../constants';

class FormField extends React.Component {
  state = {
    touched: false,
    message: '',
  };

  onFocus = () => {
    this.setState({ touched: true });
  };

  checkRequirement = (expression, message) => {
    if (!expression) {
      this.setState({ message });
      return false;
    }
    this.setState({ message: null });
    return true;
  };

  validate = () => {
    const { touched } = this.state;
    const { id, required, minLength, maxLength, value, min, max } = this.props;
    if (touched) {
      if (!this.checkRequirement(!(required && !value.toString().length), 'Field is required')) {
        return;
      }
      if (id === 'login') {
        // regexp for validating email
        if (!this.checkRequirement(emailRegexp.test(value), 'You have entered an invalid email address')) {
          return;
        }
      }

      if (id === 'firstName' || id === 'lastName') {
        // regexp for validating latin letters
        if (
          !this.checkRequirement(
            latinLetterRegexp.test(value),
            'First name and last name  should consist of latin letters only',
          )
        ) {
          return;
        }
      }

      if (id === 'mathScore') {
        const message = Number(value) < 0 || Number(value) > 100 ? 'Score should be between 0 and 100' : '';
        if (!this.checkRequirement(value < min, message)) {
          return;
        }

        if (!this.checkRequirement(value > max, message)) {
          return;
        }
      }

      if (!this.checkRequirement(minLength <= value.length, `Min length should be ${minLength} symbols`)) {
        return;
      }

      if (!this.checkRequirement(maxLength >= value.length, `Max length should be ${maxLength} symbols`)) {
      }
    }
  };

  render() {
    const {
      id,
      name,
      required,
      inputType,
      label,
      onChange,
      value,
      placeholder,
      min,
      max,
      step,
      cols,
      rows,
    } = this.props;
    const { touched, message } = this.state;
    if (inputType === 'textarea') {
      return (
        <div>
          <div className={styles.textareaItem}>
            <label htmlFor={id}>{label}</label>
            <textarea
              name={name}
              id={id}
              cols={cols}
              rows={rows}
              value={value}
              onChange={onChange}
              onFocus={this.onFocus}
              onBlur={this.validate}
              required={required}
              className={message && touched ? styles.error : null}
              placeholder={placeholder}
            />
          </div>
          <p className={styles.message}>{message}</p>
        </div>
      );
    }
    return (
      <div className={styles.gridItem}>
        <div className={styles.item}>
          <label htmlFor={id}>{label}</label>
          <input
            id={id}
            type={inputType}
            value={value}
            onChange={onChange}
            onFocus={this.onFocus}
            onBlur={this.validate}
            className={message && touched ? styles.error : null}
            placeholder={placeholder}
            min={min}
            max={max}
            step={step}
            required={required}
          />
        </div>
        <p className={styles.message}>{message}</p>
      </div>
    );
  }
}

FormField.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  required: PropTypes.bool,
  minLength: PropTypes.number,
  maxLength: PropTypes.number,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number,
  inputType: PropTypes.string,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  cols: PropTypes.number,
  rows: PropTypes.number,
};

FormField.defaultProps = {
  id: '',
  name: '',
  required: true,
  inputType: 'text',
  minLength: 2,
  maxLength: 140,
  value: '',
  min: 0,
  max: 150,
  step: 1,
  placeholder: '',
  cols: 30,
  rows: 10,
};

export default FormField;
