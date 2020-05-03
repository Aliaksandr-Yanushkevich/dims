import React from 'react';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import style from './Footer.module.scss';

const NavBar = () => {
  return (
    <footer className={style.footer}>
      <div className={style.author}>
        <p>Created by Aliaksandr Yanushkevich</p>
        <a href='https://github.com/Aliaksandr-Yanushkevich'>
          <FontAwesomeIcon icon={faGithub} size='2x' className={style.icon} />
        </a>
      </div>
      <p>Dev Incubator 2020</p>
    </footer>
  );
};

export default NavBar;
