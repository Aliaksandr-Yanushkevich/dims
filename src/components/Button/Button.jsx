import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ buttonText, dataId, className, onClick }) => (
  <button type='button' data-id={dataId} className={className} onClick={onClick}>
    {buttonText}
  </button>
);

Button.propTypes = {
  buttonText: PropTypes.string,
  className: PropTypes.string,
  dataId: PropTypes.string,
  onClick: PropTypes.func,
};

Button.defaultProps = {
  buttonText: 'Task',
  className: 'successButton',
  dataId: '4iKBUOYjXypfQT9Uv9JA',
};

export default Button;
