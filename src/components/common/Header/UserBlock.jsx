import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import styles from './Header.module.scss';

const UserBlock = ({ firstName, lastName, logout }) => {
  return (
    <div className={styles.loginBlock}>
      <NavLink className={styles.link} to='/account'>
        {`${firstName} ${lastName}`}
      </NavLink>
      <FontAwesomeIcon icon={faSignOutAlt} onClick={logout} />
    </div>
  );
};

UserBlock.propTypes = {
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  logout: PropTypes.func.isRequired,
};

export default UserBlock;
