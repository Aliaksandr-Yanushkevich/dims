import React from 'react';
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

  validate = () => {
    const { touched } = this.state;
    const { id, required, minLength, maxLength, value, validateForm, min, max } = this.props;
    if (touched) {
      if (required && value.length === 0) {
        const message = 'Field is required';
        validateForm(id, message);
        this.setState({ message });
        return;
      }
      if (id === 'login') {
        // regexp for validating email
        const message = 'You have entered an invalid email address';
        if (emailRegexp.test(value)) {
          validateForm(id, message);
          this.setState({ message });
          return;
        }
      }

      if (id === 'firstName' || id === 'lastName') {
        // regexp for validating latin letters
        const message = 'First name and last name  should consist of latin letters only';
        if (!latinLetterRegexp.test(value)) {
          validateForm(id, message);
          this.setState({ message });
          return;
        }
      }

      if (id === 'age') {
        const message = value < 0 ? 'Age should be positive number' : 'You look much younger';
        if (value < min) {
          validateForm(id, message);
          this.setState({ message });
          return;
        }
        if (value > max) {
          validateForm(id, message);
          this.setState({ message });
          return;
        }
      }

      if (value.length < minLength) {
        const message = `Min length should be ${minLength} symbols`;
        validateForm(id, message);
        this.setState({ message });
        return;
      }
      if (value.length > maxLength) {
        const message = `Max length should be ${maxLength} symbols`;
        validateForm(id, message);
        this.setState({ message });
        return;
      }
      validateForm(id, null);
      this.setState({ message: null });
    }
  };

  render() {
    const {
      id,
      name,
      required,
      minLength,
      maxLength,
      inputType,
      label,
      onChange,
      value,
      placeholder,
      min,
      max,
    } = this.props;
    const { touched, message } = this.state;
    if (inputType === 'textarea') {
      return (
        <>
          <div className={styles.textareaItem}>
            <label htmlFor={id}>{label}</label>
            <textarea
              name={name}
              id={id}
              cols='30'
              rows='10'
              value={value}
              onChange={onChange}
              onFocus={this.onFocus}
              onBlur={this.validate}
              required
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
          />
        </div>
        <p className={styles.message}>{message}</p>
      </>
    );
  }
}

export default FormField;
