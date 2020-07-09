import React from 'react';
import styles from './TableHeader.module.scss';

const TableHeader = ({ titleArray }) =>
  titleArray.map((title, index) => (
    <th className={styles.tableHeader} key={`${index.toString()}${title}`}>
      {title}
    </th>
  ));

export default TableHeader;
