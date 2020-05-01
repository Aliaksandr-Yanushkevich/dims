import React from 'react';
import style from './Navbar.module.scss';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
  return (
    <div className={style.navbar}>
      <ul>
        <li className={style.item}>
          <NavLink to='/members' activeClassName={style.active}>
            Members
          </NavLink>
        </li>
        <li className={style.item}>
          <NavLink to='/member_progress' activeClassName={style.active}>
            Member progress
          </NavLink>
        </li>
        <li className={style.item}>
          <NavLink to='/member_tasks' activeClassName={style.active}>
            Member tasks
          </NavLink>
        </li>
        <li className={style.item}>
          <NavLink to='/tasks' activeClassName={style.active}>
            Tasks
          </NavLink>
        </li>
        <li className={style.item}>
          <NavLink to='/tasks_tracks' activeClassName={style.active}>
            Tasks tracks
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default NavBar;
