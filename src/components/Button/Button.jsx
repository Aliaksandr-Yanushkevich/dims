import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ id, buttonText, dataId, className, onClick }) => (
  <button id={id} type='button' data-id={dataId} className={className} onClick={onClick}>
    {buttonText}
  </button>
);

Button.propTypes = {
  id: PropTypes.string,
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
