import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './Header.module.scss';
import logo from '../logo-white.png';

const Header = ({ isAuth, login, logout }) => {
  return (
    <header className={styles.header}>
      <NavLink to='/members'>
        <img src={logo} alt='logo' />
      </NavLink>
      <div className={styles.loginBlock}>
        {isAuth ? (
          <div>
            {login}
            <button type='button' onClick={logout}>
              Log out
            </button>
          </div>
        ) : (
          <NavLink to='/login'>Login</NavLink>
        )}
      </div>
    </header>
  );
};

Header.propTypes = {
  isAuth: PropTypes.bool,
  login: PropTypes.string,
  logout: PropTypes.func,
};
Header.defaultProps = {
  isAuth: false,
  login: '',
};

export default Header;
