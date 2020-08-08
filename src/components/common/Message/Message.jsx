import React from 'react';
import PropTypes from 'prop-types';
import styles from './Message.module.scss';

const Message = ({ text, icon }) => {
  return (
    <div className={styles.message}>
      <div className={styles.icon}>{icon}</div>
      <p>{text}</p>
    </div>
  );
};

Message.propTypes = {
  icon: PropTypes.node.isRequired,
  text: PropTypes.string.isRequired,
};

export default Message;
