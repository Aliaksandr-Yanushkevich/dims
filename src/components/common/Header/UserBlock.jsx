import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styles from './Header.module.scss';
import { showAccountPage } from '../../../redux/reducers/appIndex';
import { logout } from '../../../redux/reducers/authIndex';
import HeaderDropDownMenu from './HeaderDropDownMenu';

const UserBlock = ({ firstName, lastName, logout, showAccountPage }) => {
  const displayAccountPage = () => {
    showAccountPage(true);
  };

  return (
    <div className={styles.loginBlock}>
      <HeaderDropDownMenu
        fullName={`${firstName} ${lastName}`}
        displayAccountPage={displayAccountPage}
        logout={logout}
      />
    </div>
  );
};

const mapStateToProps = ({ auth }) => {
  const { firstName, lastName } = auth;
  return { firstName, lastName };
};

UserBlock.propTypes = {
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  logout: PropTypes.func.isRequired,
  showAccountPage: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { showAccountPage, logout })(UserBlock);
