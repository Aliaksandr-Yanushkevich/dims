import React from 'react';
import { NavLink } from 'react-router-dom';
import style from './Header.module.scss';
import logo from './logo.png';

const Header = (props) => {
  return (
    <header className={style.header}>
      <div className={style.headerWrapper}>
        <NavLink to='/'>
          <img src={logo} alt='logo' />
        </NavLink>
        <div className={style.loginBlock}>
          {props.isAuth ? (
            <div>
              {props.login} <button onClick={props.logout}>Log out</button>
            </div>
          ) : (
            <NavLink to='/login'>Login</NavLink>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
