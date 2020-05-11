import React from 'react';

const MemberName = ({ firstName, lastName, userId }) => {
  return (
    <li>
      <input type='checkbox' id={userId} />
      <label htmlFor={userId}>{`${firstName} ${lastName}`}</label>
    </li>
  );
};

export default MemberName;
