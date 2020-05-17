import React from 'react';

const TableHeader = ({ titleArray }) => {
  return titleArray.map((title, index) => {
    return <th key={`${index.toString()}${title}`}>{title}</th>;
  });
};

export default TableHeader;
