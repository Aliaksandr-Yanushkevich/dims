import React from 'react';
import PropTypes from 'prop-types';
import styles from './TableHeader.module.scss';

const TableHeader = ({ titleArray }) => (
  <thead>
    <tr>
      {titleArray.map((title, index) => (
        <th className={styles.tableHeader} key={`${index.toString()}${title}`}>
          {title}
        </th>
      ))}
    </tr>
  </thead>
);

TableHeader.propTypes = {
  titleArray: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default TableHeader;
