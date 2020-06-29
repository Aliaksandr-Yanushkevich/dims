import React from 'react';
import PropTypes from 'prop-types';
import styles from './FormMessage.module.scss';

const FormMessage = ({ className, messageType, children }) => {
  const classes = `${styles.message} ${styles[messageType]} ${className}`;
  return (
    <div className={classes}>
      <p>{children}</p>
    </div>
  );
};

FormMessage.propTypes = {
  messageType: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
};

FormMessage.defaultProps = {
  messageType: '',
  children: null,
  className: '',
};

export default FormMessage;
