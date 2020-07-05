import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import Button from '../Button/Button';

const NavButton = ({ className, buttonClassName, taskId, dataId, onClick, to, children }) => (
  <NavLink className={className} to={to}>
    <Button className={buttonClassName} taskId={taskId} dataId={dataId} onClick={onClick}>
      {children}
    </Button>
  </NavLink>
);

NavButton.propTypes = {
  className: PropTypes.string,
  buttonClassName: PropTypes.string,
  taskId: PropTypes.string,
  dataId: PropTypes.string,
  onClick: PropTypes.func,
  to: PropTypes.string,
  children: PropTypes.node,
};

NavButton.defaultProps = {
  className: '',
  buttonClassName: '',
  taskId: '',
  dataId: '',
  onClick: () => {},
  to: '',
  children: '',
};

export default NavButton;
