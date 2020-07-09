import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ dataId, taskId, dataName, className, onClick, form, disabled, children }) => (
  <button
    type='button'
    data-id={dataId}
    data-taskid={taskId}
    data-name={dataName}
    className={className}
    onClick={onClick}
    form={form}
    disabled={disabled}
  >
    {children}
  </button>
);

Button.propTypes = {
  taskId: PropTypes.string,
  dataName: PropTypes.string,
  className: PropTypes.string,
  dataId: PropTypes.string,
  onClick: PropTypes.func,
  form: PropTypes.string,
  disabled: PropTypes.bool,
  children: PropTypes.string.isRequired,
};

Button.defaultProps = {
  taskId: '',
  className: '',
  dataId: '',
  dataName: '',
  onClick: () => {},
  form: '',
  disabled: false,
};

export default Button;
