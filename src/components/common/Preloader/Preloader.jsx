import React from 'react';
import preloader from './preloader.gif';
import styles from './Preloader.module.scss';

const Preloader = () => <img className={styles.preloader} src={preloader} alt='preloader' />;

export default Preloader;
