import React from 'react';
import styles from './TableHeader.module.scss';

const TableHeader = ({ titleArray }) => {
  return titleArray.map((title, index) => {
    return (
      <th className={styles.tableHeader} key={`${index.toString()}${title}`}>
        {title}
      </th>
    );
  });
};

export default TableHeader;
