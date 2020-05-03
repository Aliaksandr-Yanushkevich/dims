import React from 'react';
import { NavLink } from 'react-router-dom';
import style from './Header.module.scss';
import logo from '../logo-white.png';

const Header = ({ isAuth, login, logout }) => {
  return (
    <header className={style.header}>
      <NavLink to='/members'>
        <img src={logo} alt='logo' />
      </NavLink>
      <div className={style.loginBlock}>
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

export default Header;
