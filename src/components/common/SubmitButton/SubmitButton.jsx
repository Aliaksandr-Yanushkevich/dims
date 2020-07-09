import React from 'react';
import PropTypes from 'prop-types';

const SubmitButton = ({ className, disabled, form, children }) => (
  <button type='submit' className={className} disabled={disabled} form={form}>
    {children}
  </button>
);

SubmitButton.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  form: PropTypes.string,
  children: PropTypes.string.isRequired,
};

SubmitButton.defaultProps = {
  className: '',
  disabled: false,
  form: '',
};

export default SubmitButton;
