import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ id, buttonText, dataId, taskId, className, onClick, disabled }) => (
  <button
    id={id}
    type='button'
    data-id={dataId}
    data-taskid={taskId}
    className={className}
    onClick={onClick}
    disabled={disabled}
  >
    {buttonText}
  </button>
);

Button.propTypes = {
  id: PropTypes.string,
  taskId: PropTypes.string,
  buttonText: PropTypes.string,
  className: PropTypes.string,
  dataId: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
};

Button.defaultProps = {
  id: '',
  taskId: '',
  buttonText: '',
  className: '',
  dataId: '',
  onClick: () => {},
  disabled: false,
};

export default Button;
