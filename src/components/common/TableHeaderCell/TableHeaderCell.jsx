import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileSignature, faGraduationCap, faStarHalfAlt, faTasks, faUser } from '@fortawesome/free-solid-svg-icons';
import styles from '../../Members/Members.module.scss';

const TableHeaderCell = ({ title, className }) => {
  if (title === 'direction') {
    return (
      <th className={className} key={`${className}${title}`}>
        <p className={styles.tableHeaderText}>{title}</p>
        <FontAwesomeIcon icon={faGraduationCap} className={styles.tableHeaderIcon} />
      </th>
    );
  }
  if (title === 'full name') {
    return (
      <th className={className} key={`${className}${title}`}>
        <p className={styles.tableHeaderText}>{title}</p>
        <FontAwesomeIcon icon={faUser} className={styles.tableHeaderIcon} />
      </th>
    );
  }
  if (title === 'name') {
    return (
      <th className={className} key={`${className}${title}`}>
        <p className={styles.tableHeaderText}>{title}</p>
        <FontAwesomeIcon icon={faTasks} className={styles.tableHeaderIcon} size='lg' />
      </th>
    );
  }
  if (title === 'status') {
    return (
      <th className={className} key={`${className}${title}`}>
        <p className={styles.tableHeaderText}>{title}</p>
        <FontAwesomeIcon icon={faStarHalfAlt} className={styles.tableHeaderIcon} size='lg' />
      </th>
    );
  }
  if (title === 'mark task') {
    return (
      <th className={className} key={`${className}${title}`}>
        <p className={styles.tableHeaderText}>{title}</p>
        <FontAwesomeIcon icon={faFileSignature} className={styles.tableHeaderIcon} size='lg' />
      </th>
    );
  }
  return (
    <th className={className} key={`${className}${title}`}>
      {title}
    </th>
  );
};

TableHeaderCell.propTypes = {
  title: PropTypes.string.isRequired,
  className: PropTypes.string,
};

TableHeaderCell.defaultProps = {
  className: '',
};

export default TableHeaderCell;
