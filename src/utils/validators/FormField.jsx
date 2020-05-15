import React from 'react';
import styles from './FormValid.module.scss';

class FormField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      touched: false,
      message: null,
    };
  }

  onFocus = () => {
    this.setState({ touched: true });
  };

  // onChange = (e) => {
  //   const value = e.currentTarget.value;
  //   this.setState({ value });
  // };

  validate = () => {
    const { touched } = this.state;
    const { id, required, minLength, maxLength, value, validateForm } = this.props;
    if (touched) {
      if (required && touched && value.length === 0) {
        const message = 'Field is required';
        validateForm(id, message);
        this.setState({ message });
        return;
      }
      if (id === 'login') {
        // regexp for validating email
        const message = 'You have entered an invalid email address';
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
          validateForm(id, null);
          this.setState({ message: null });
          return;
        }
        validateForm(id, message);
        this.setState({ message });
        return;
      }

      if (touched && value.length < minLength) {
        const message = `Min length should be ${minLength} symbols`;
        validateForm(id, message);
        this.setState({ message });
        return;
      }
      if (touched && value.length > maxLength) {
        const message = `Max length should be ${maxLength} symbols`;
        validateForm(id, message);
        this.setState({ message });
        return;
      }
    }
    validateForm(id, null);
    this.setState({ message: null });
  };

  render() {
    const { id, required, minLength, maxLength, inputType, label, onChange, value } = this.props;
    const { touched, message } = this.state;
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
          />
        </div>
        <p className={styles.message}>{message}</p>
      </>
    );
  }
}

export default FormField;
