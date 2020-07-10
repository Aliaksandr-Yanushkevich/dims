import React from 'react';
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

export default TableHeader;
