import React from 'react';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './Footer.module.scss';
import getYear from './getYear';

const NavBar = () => {
  const year = getYear();
  return (
    <footer className={styles.footer}>
      <div className={styles.author}>
        <p>Created by Aliaksandr Yanushkevich</p>
        <a href={process.env.REACT_APP_DEVELOPER_GITHUB}>
          <FontAwesomeIcon icon={faGithub} size='2x' className={styles.icon} />
        </a>
      </div>
      <a href={process.env.REACT_APP_INCUBATOR_LINK}>{`Dev Incubator ${year}`}</a>
    </footer>
  );
};

export default NavBar;
