import React from 'react';
import PropTypes from 'prop-types';
import checkRequirements from '../../../helpers/validators/checkRequirements';
import styles from './TextAreaField.module.scss';
import { requiredMessage } from '../../../constants';
import FormMessage from '../FormMessage/FormMessage';

class TextAreaField extends React.Component {
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
    const { id, name, label, value, onChange, cols, rows, placeholder } = this.props;
    const { touched, message } = this.state;

    return (
      <div className={styles.inputGroup}>
        <div className={styles.textareaItem}>
          <label htmlFor={id}>{label}</label>
          <textarea
            id={id}
            name={name}
            cols={cols}
            rows={rows}
            value={value}
            onChange={onChange}
            onFocus={this.onFocus}
            onBlur={this.checkField}
            required
            className={message && touched ? styles.error : null}
            placeholder={placeholder}
          />
        </div>
        <FormMessage messageType='warning'>{message}</FormMessage>
      </div>
    );
  }
}

TextAreaField.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  cols: PropTypes.number,
  rows: PropTypes.number,
  placeholder: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  regexp: PropTypes.instanceOf(RegExp),
  errorMessage: PropTypes.string,
};

TextAreaField.defaultProps = {
  name: '',
  value: '',
  regexp: null,
  errorMessage: null,
  cols: 30,
  rows: 10,
  placeholder: '',
};

export default TextAreaField;
