import React from 'react';
const TableHeader = ({ titleArr }) => {
  return titleArr.map((key, index) => {
    return <th key={index}>{key.toUpperCase()}</th>;
  });
};

export default TableHeader;
