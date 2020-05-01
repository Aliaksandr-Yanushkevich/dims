import React from 'react';
const TableHeader = ({ titleArr }) => {
  return titleArr.map((key, index) => {
    return <th key={index}>{index === 0 ? '#' : key.toUpperCase()}</th>;
  });
};

export default TableHeader;
