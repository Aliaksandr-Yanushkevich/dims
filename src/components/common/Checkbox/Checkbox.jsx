import React from 'react';
import PropTypes from 'prop-types';

const Checkbox = ({ id, name, checked, onChange, children }) => {
  return (
    <label htmlFor={id}>
      {children}
      <input id={id} name={name} type='checkbox' checked={checked} onChange={onChange} />
    </label>
  );
};

Checkbox.propTypes = {
  id: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string,
  checked: PropTypes.bool,
  children: PropTypes.node,
};

Checkbox.defaultProps = {
  name: '',
  checked: false,
  children: '',
};

export default Checkbox;
