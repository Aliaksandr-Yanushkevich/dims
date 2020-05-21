import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ id, buttonType, dataId, taskId, className, onClick, disabled, children }) => (
  <button
    id={id}
    type={buttonType}
    data-id={dataId}
    data-taskid={taskId}
    className={className}
    onClick={onClick}
    disabled={disabled}
  >
    {children}
  </button>
);

Button.propTypes = {
  id: PropTypes.string,
  taskId: PropTypes.string,
  className: PropTypes.string,
  dataId: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  children: PropTypes.string.isRequired,
  buttonType: PropTypes.string,
};

Button.defaultProps = {
  id: '',
  buttonType: 'button',
  taskId: '',
  className: '',
  dataId: '',
  disabled: false,
};

export default Button;
