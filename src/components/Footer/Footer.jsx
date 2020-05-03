import React from 'react';
import style from './Footer.module.scss';

const NavBar = () => {
  return (
    <div className={style.navbar}>
      Created by
      <a href='https://github.com/Aliaksandr-Yanushkevich'> Aliaksandr Yanushkevich </a>
      Dev Incubator 2020
    </div>
  );
};

export default NavBar;
