import React from 'react';
import preloader from './preloader.gif';
import style from './Preloader.module.scss';

const Preloader = () => {
  return <img className={style.preloader} src={preloader} alt='preloader' />;
};

export default Preloader;
