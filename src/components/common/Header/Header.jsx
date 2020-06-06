import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './Header.module.scss';
import logo from '../logo.svg';
import Button from '../../Button/Button';
import UserBlock from './UserBlock';

const Header = ({ firstName, lastName, logout }) => {
  return (
    <header className={styles.header}>
      <NavLink className={styles.link} to='/members'>
        <img src={logo} alt='logo' />
      </NavLink>
      <div className='nav'>
        <NavLink className={styles.link} to='/members'>
          <Button>Manage members</Button>
        </NavLink>
        <NavLink className={styles.link} to='/task_management'>
          <Button>Manage tasks</Button>
        </NavLink>
        <NavLink className={styles.link} to='/task_track_management'>
          <Button>Task tracks</Button>
        </NavLink>
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
