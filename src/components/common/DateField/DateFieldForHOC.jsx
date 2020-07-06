import React from 'react';
import PropTypes from 'prop-types';
import checkRequirements from '../../../helpers/validators/checkRequirements';
import styles from './DateField.module.scss';
import { requiredMessage } from '../../../constants';
import FormMessage from '../FormMessage/FormMessage';

const DateField = (props) => {
  const { id, name, label, value, onChange, disabled, touched, message } = props;
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
};

DateField.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  name: PropTypes.string,
  value: PropTypes.string,
  regexp: PropTypes.string,
  errorMessage: PropTypes.string,
};

DateField.defaultProps = {
  name: '',
  value: '',
  onChange: () => {},
  regexp: null,
  errorMessage: null,
  disabled: false,
};

export default DateField;
