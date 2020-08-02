import React from 'react';
import PropTypes from 'prop-types';

const TableData = ({ children, className }) => <td className={className}>{children}</td>;

TableData.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

TableData.defaultProps = {
  children: null,
  className: '',
};

export default TableData;
