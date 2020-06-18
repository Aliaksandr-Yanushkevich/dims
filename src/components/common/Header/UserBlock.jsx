import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Tooltip } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import styles from './Header.module.scss';

const UserBlock = ({ firstName, lastName, logout, showAccountPage }) => {
  const [tooltipOpen, setTooltipOpen] = useState(false);

  const showTip = () => setTooltipOpen(!tooltipOpen);

  return (
    <div className={styles.loginBlock}>
      <span>
        <div id={styles.account} onClick={showAccountPage}>{`${firstName} ${lastName}`}</div>
        <Tooltip isOpen={tooltipOpen} toggle={showTip} target={styles.account}>
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
  showAccountPage: PropTypes.func.isRequired,
};

export default UserBlock;
