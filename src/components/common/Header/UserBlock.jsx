import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { Tooltip } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import styles from './Header.module.scss';

const UserBlock = ({ firstName, lastName, logout }) => {
  const [tooltipOpen, setTooltipOpen] = useState(false);

  const showTip = () => setTooltipOpen(!tooltipOpen);

  return (
    <div className={styles.loginBlock}>
      <span>
        <NavLink className={styles.link} to='/account' id='account'>
          {`${firstName} ${lastName}`}
        </NavLink>
        <Tooltip isOpen={tooltipOpen} toggle={showTip} target='account'>
          <div className={styles.tip}>In the profile settings you can change your password</div>
        </Tooltip>
      </span>
      <FontAwesomeIcon icon={faSignOutAlt} onClick={logout} />
    </div>
  );
};

UserBlock.propTypes = {
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  logout: PropTypes.func.isRequired,
};

export default UserBlock;
