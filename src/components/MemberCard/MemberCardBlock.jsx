import React from 'react';
import PropTypes from 'prop-types';
import styles from './MemberCard.module.scss';

const MemberCardBlock = ({ title, data }) => {
  return (
    <>
      <div>
        <h6 className={styles.cardTitle}>{title}</h6>
        <p>{data}</p>
      </div>
    </>
  );
};

MemberCardBlock.propTypes = {
  title: PropTypes.number.isRequired,
  data: PropTypes.string.isRequired,
};

export default MemberCardBlock;
