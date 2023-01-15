import React from 'react';
import styles from './Success.module.css';
/** 
 * Компонент для индикации успешного оформления заказа
*/
export default function Success({ successText }) {
  return <div className={styles.text}>{successText}</div>;
}
