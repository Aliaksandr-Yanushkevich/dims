import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './Header.module.scss';
import logo from '../logo.svg';
import UserBlock from './UserBlock';

const Header = ({ firstName, lastName, logout, role, showAccountPage }) => {
  const [activeTab, setActiveTab] = useState('1');

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };
  const isAdmin = role === 'admin';
  const isMentor = role === 'mentor';

  return (
    <header className={styles.header}>
      <NavLink className={styles.link} to='/members'>
        <img src={logo} alt='logo' />
      </NavLink>
      {role && (
        <div className={styles.nav}>
          <NavLink
            className={styles.navTab}
            onClick={() => {
              toggle('1');
            }}
            to={isAdmin || isMentor ? '/members' : '/member_tasks'}
          >
            <div className={classnames({ [styles.active]: activeTab === '1' }, styles.navItem)}>
              {isAdmin || isMentor ? 'Members' : 'My tasks'}
            </div>
          </NavLink>
          <NavLink
            className={styles.navTab}
            onClick={() => {
              toggle('2');
            }}
            to={isAdmin || isMentor ? '/task_management' : '/task_track_management'}
          >
            <div className={classnames({ [styles.active]: activeTab === '2' }, styles.navItem)}>
              {isAdmin || isMentor ? 'Tasks' : 'Track notes'}
            </div>
          </NavLink>
        </div>
      )}

      {firstName && (
        <UserBlock firstName={firstName} lastName={lastName} logout={logout} showAccountPage={showAccountPage} />
      )}
    </header>
  );
};

Header.propTypes = {
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  logout: PropTypes.func,
  showAccountPage: PropTypes.func,
  role: PropTypes.string,
};

Header.defaultProps = {
  firstName: '',
  lastName: '',
  logout: () => {},
  showAccountPage: () => {},
  role: '',
};

export default Header;
