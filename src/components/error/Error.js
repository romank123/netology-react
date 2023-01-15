import React from 'react';
import styles from './Error.module.css';
/** 
 * Компонент отображения ошибки на странице
*/
export default function Error({ errorText }) {
  return <div className={styles.text}>{errorText}</div>;
}
