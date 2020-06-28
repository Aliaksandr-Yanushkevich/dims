import React from 'react';
import PropTypes, { string } from 'prop-types';
import styles from './FormMessage.module.scss';

const FormMessage = ({ className, messageType, children }) => {
  const classes = `${className} ${messageType ? styles[messageType] : styles.message}`;
  return (
    <div className={classes}>
      <p>{children}</p>
    </div>
  );
};

FormMessage.propTypes = {
  messageType: string,
  children: PropTypes.node,
};

FormMessage.defaultProps = {
  messageType: null,
  children: null,
};

export default FormMessage;
