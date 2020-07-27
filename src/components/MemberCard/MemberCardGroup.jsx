import React from 'react';
import PropTypes from 'prop-types';
import styles from './MemberCard.module.scss';

const MemberCardGroup = ({ title, children, icon, className }) => {
  return (
    <>
      <h4 className={styles.cardTitle}>
        {icon}
        {title}
      </h4>
      <div className={`${className} ${styles.group}`}>{children}</div>
    </>
  );
};

MemberCardGroup.propTypes = {
  title: PropTypes.number.isRequired,
  children: PropTypes.node.isRequired,
  icon: PropTypes.node.isRequired,
  className: PropTypes.node.isRequired,
};

export default MemberCardGroup;
