import React from 'react';
import PropTypes from 'prop-types';
import styles from './FormField.module.scss';
import { emailRegexp, latinLetterRegexp } from '../../constants';

class FormField extends React.Component {
  state = {
    touched: false,
    message: null,
  };

  componentDidMount() {
    this.validate();
  }

  onFocus = () => {
    this.setState({ touched: true });
  };

  validation = (id, message) => {
    const { validateForm } = this.props;
    validateForm(id, message);
    this.setState({ message });
  };

  validate = () => {
    const { touched } = this.state;
    const { id, required, minLength, maxLength, value, min, max } = this.props;
    if (touched) {
      if (required && value.length === 0) {
        const message = 'Field is required';
        this.validation(id, message);
        return;
      }
      if (id === 'login') {
        // regexp for validating email
        const message = 'You have entered an invalid email address';
        if (!emailRegexp.test(value)) {
          this.validation(id, message);
          return;
        }
      }

      if (id === 'firstName' || id === 'lastName') {
        // regexp for validating latin letters
        const message = 'First name and last name  should consist of latin letters only';
        if (!latinLetterRegexp.test(value)) {
          this.validation(id, message);
          return;
        }
      }

      if (id === 'age') {
        const message = value < 0 ? 'Age should be positive number' : 'You look much younger';
        if (value < min) {
          this.validation(id, message);
          return;
        }
        if (value > max) {
          this.validation(id, message);
          return;
        }
      }

      if (value.length < minLength) {
        const message = `Min length should be ${minLength} symbols`;
        this.validation(id, message);
        return;
      }
      if (value.length > maxLength) {
        const message = `Max length should be ${maxLength} symbols`;
        this.validation(id, message);
        return;
      }
      this.validation(id, null);
    }
  };

  render() {
    const { id, name, required, inputType, label, onChange, value, placeholder, min, max, cols, rows } = this.props;
    const { touched, message } = this.state;
    if (inputType === 'textarea') {
      return (
        <>
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
        </>
      );
    }
    return (
      <>
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
            required={required}
          />
        </div>
        <p className={styles.message}>{message}</p>
      </>
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
  validateForm: PropTypes.func.isRequired,
  min: PropTypes.number,
  max: PropTypes.number,
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
  placeholder: '',
  cols: 30,
  rows: 10,
};

export default FormField;
