import React, { useState } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './Header.module.scss';
import logo from '../logo.svg';
import UserBlock from './UserBlock';
import { showAccountPage } from '../../../redux/reducers/appReducer';
import { logout } from '../../../redux/reducers/authReducer';

const Header = ({ firstName, lastName, role, logout }) => {
  const [activeTab, setActiveTab] = useState('1');

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

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
            to={role === 'admin' || role === 'mentor' ? '/members' : '/member_tasks'}
          >
            <div className={classnames({ [styles.active]: activeTab === '1' }, styles.navItem)}>
              {role === 'admin' || role === 'mentor' ? 'Members' : 'My tasks'}
            </div>
          </NavLink>
          <NavLink
            className={styles.navTab}
            onClick={() => {
              toggle('2');
            }}
            to={role === 'admin' || role === 'mentor' ? '/task_management' : '/task_track_management'}
          >
            <div className={classnames({ [styles.active]: activeTab === '2' }, styles.navItem)}>
              {role === 'admin' || role === 'mentor' ? 'Tasks' : 'Track notes'}
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

const mapStateToProps = (state) => {
  const { firstName, lastName, role } = state.auth;
  return { firstName, lastName, role };
};

Header.propTypes = {
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  role: PropTypes.string,
};

Header.defaultProps = {
  firstName: '',
  lastName: '',
  role: '',
};

export default connect(mapStateToProps, { showAccountPage, logout })(Header);
