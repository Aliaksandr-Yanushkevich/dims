import React from 'react';
import PropTypes from 'prop-types';
import styles from './Select.module.scss';

// props.options should be an array of objects {value: xxx, title: yyy}
const Select = ({ id, name, onChange, value, options }) => {
  const optionsArray = options ? options.map((option) => <option value={option.value}>{option.title}</option>) : null;
  return (
    <div className={styles.item}>
      <label htmlFor={id}>{`${name}:`}</label>
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
  value: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Select;
