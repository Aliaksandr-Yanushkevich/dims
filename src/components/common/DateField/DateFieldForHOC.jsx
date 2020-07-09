import React from 'react';
import PropTypes from 'prop-types';
import styles from './DateField.module.scss';
import FormMessage from '../FormMessage/FormMessage';

const DateFieldForHOC = (props) => {
  const { id, name, label, value, onChange, disabled, onFocus, checkField, state } = props;
  const { touched, message } = state;

  return (
    <div className={styles.inputGroup}>
      <div className={styles.item}>
        <label htmlFor={id}>{label}</label>
        <input
          id={id}
          name={name}
          type='date'
          onFocus={onFocus}
          onBlur={checkField}
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

DateFieldForHOC.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  name: PropTypes.string,
  value: PropTypes.string,
  regexp: PropTypes.string,
  errorMessage: PropTypes.string,
};

DateFieldForHOC.defaultProps = {
  name: '',
  value: '',
  onChange: () => {},
  regexp: null,
  errorMessage: null,
  disabled: false,
};

export default DateFieldForHOC;
