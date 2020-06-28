import React from 'react';
import PropTypes from 'prop-types';
import checkRequirements from '../../../helpers/validators/checkRequirements';
import styles from './DateField.module.scss';
import { requiredMessage } from '../../../constants';

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
    const { id, name, label, value, onChange } = this.props;
    const { touched, message } = this.state;
    return (
      <div className={styles.gridItem}>
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
            required
          />
        </div>
        <p className={styles.message}>{message}</p>
      </div>
    );
  }
}

DateField.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
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
};

export default DateField;
