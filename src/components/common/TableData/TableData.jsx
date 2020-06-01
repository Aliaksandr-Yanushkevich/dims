import React from 'react';
import PropTypes from 'prop-types';
import styles from './TableData.module.scss';

const TableData = ({ children }) => {
  return <td className={styles.tableData}>{children}</td>;
};

TableData.propTypes = {
  children: PropTypes.node,
};
TableData.defaultProps = {
  children: null,
};

export default TableData;
