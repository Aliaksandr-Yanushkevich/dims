import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './Header.module.scss';
import logo from '../logo.svg';
import Button from '../../Button/Button';
import UserBlock from './UserBlock';

const Header = ({ firstName, lastName, logout, role }) => {
  return (
    <header className={styles.header}>
      <NavLink className={styles.link} to='/members'>
        <img src={logo} alt='logo' />
      </NavLink>
      <div className='nav'>
        {(role === 'admin' || role === 'mentor') && (
          <NavLink className={styles.link} to='/members'>
            <Button>Members</Button>
          </NavLink>
        )}
        {role === 'member' && (
          <NavLink className={styles.link} to='/member_tasks'>
            <Button>My tasks</Button>
          </NavLink>
        )}
        {(role === 'admin' || role === 'mentor') && (
          <NavLink className={styles.link} to='/task_management'>
            <Button>Tasks</Button>
          </NavLink>
        )}
        {role === 'member' && (
          <NavLink className={styles.link} to='/task_track_management'>
            <Button>Track notes</Button>
          </NavLink>
        )}
      </div>
      {firstName && <UserBlock firstName={firstName} lastName={lastName} logout={logout} />}
    </header>
  );
};

Header.propTypes = {
  firstName: PropTypes.bool.isRequired,
  lastName: PropTypes.string.isRequired,
};

export default Header;
