import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import styles from './Header.module.scss';

const HeaderDropDownMenu = ({ fullName, displayAccountPage, logout }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen((prevState) => !prevState);

  return (
    <Dropdown isOpen={dropdownOpen} toggle={toggle} className={styles.dropDownMenu}>
      <DropdownToggle color='#0080a4'>
        <FontAwesomeIcon icon={faEllipsisV} />
      </DropdownToggle>
      <DropdownMenu right>
        <DropdownItem header>{fullName}</DropdownItem>
        <DropdownItem id={styles.dropDownMenuAccount} onClick={displayAccountPage}>
          Account
        </DropdownItem>
        <DropdownItem id={styles.dropDownMenuLogout} onClick={logout}>
          Log Out
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

HeaderDropDownMenu.propTypes = {
  fullName: PropTypes.string.isRequired,
  displayAccountPage: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
};

export default HeaderDropDownMenu;
