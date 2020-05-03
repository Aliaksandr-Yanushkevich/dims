import React from 'react';

const TableHeader = ({ titleArr }) => {
  return titleArr.map((el, index) => {
    return <th key={index}>{el}</th>;
  });
};

export default TableHeader;
