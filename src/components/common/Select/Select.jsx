import React from 'react';
import PropTypes from 'prop-types';
import styles from './Select.module.scss';

// props.options should be an array of objects {value: xxx, title: yyy}
const Select = ({ id, name, label, onChange, value, options }) => {
  const optionsArray = options
    ? options.map((option) => {
        return (
          <option key={option.title} value={option.value}>
            {option.title}
          </option>
        );
      })
    : null;
  return (
    <div className={styles.item}>
      <label htmlFor={id}>{label}</label>
      <select id={id} name={name} onChange={onChange} value={value}>
        {optionsArray}
      </select>
    </div>
  );
};

Select.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  options: PropTypes.oneOfType([PropTypes.string, PropTypes.array]).isRequired,
};

export default Select;
