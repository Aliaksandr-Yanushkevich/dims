import React from 'react';
import PropTypes from 'prop-types';

const MemberName = ({ firstName, lastName, userId }) => (
  <li>
    <input type='checkbox' id={userId} />
    <label htmlFor={userId}>{`${firstName} ${lastName}`}</label>
  </li>
);

MemberName.propTypes = {
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
};

export default MemberName;
