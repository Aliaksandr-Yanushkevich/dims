import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ id, dataId, taskId, dataName, className, onClick, disabled, children }) => (
  <button
    id={id}
    type='button'
    data-id={dataId}
    data-taskid={taskId}
    data-name={dataName}
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
  dataName: PropTypes.string,
  className: PropTypes.string,
  dataId: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  children: PropTypes.string.isRequired,
};

Button.defaultProps = {
  id: '',
  taskId: '',
  className: '',
  dataId: '',
  dataName: '',
  disabled: false,
};

export default Button;
