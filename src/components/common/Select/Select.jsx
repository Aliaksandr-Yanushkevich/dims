import React from 'react';
import PropTypes from 'prop-types';

const Select = ({ id, name, onChange, value, options }) => {
  const optionsArray = options.map((option) => <option value={option}>{option}</option>);
  return (
    <>
      <label htmlFor={id}>{`${name}:`}</label>
      <select id={id} name={name} onChange={onChange} value={value}>
        {optionsArray}
      </select>
    </>
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
