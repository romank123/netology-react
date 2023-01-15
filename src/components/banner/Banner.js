import React from 'react';
import banner from '../../img/banner.jpg';
import styles from './Banner.module.css';
/** 
 * Компонент баннера для основной части страницы
*/
export default function Banner() {
  return (
    <div className={styles.banner}>
      <img src={banner} className="img-fluid" alt="К весне готовы!" />
      <h2 className={styles.header}>К весне готовы!</h2>
    </div>
  );
}
