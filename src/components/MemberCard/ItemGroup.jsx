import React from 'react';
import PropTypes from 'prop-types';
import styles from './MemberCard.module.scss';

const ItemGroup = ({ title, children, icon, className }) => {
  return (
    <>
      <h4 className={styles.groupTitle}>
        {icon}
        {title}
      </h4>
      <div className={`${className} ${styles.group}`}>{children}</div>
    </>
  );
};

ItemGroup.propTypes = {
  title: PropTypes.number.isRequired,
  children: PropTypes.node.isRequired,
  icon: PropTypes.node.isRequired,
  className: PropTypes.node.isRequired,
};

export default ItemGroup;
