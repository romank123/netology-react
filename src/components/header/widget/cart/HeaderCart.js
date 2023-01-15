import React from 'react';
import styles from './HeaderCart.module.css';
/** 
 * Компонент корзины для хедера страницы
*/
export default function HeaderCart({ counter, handleNavigateCart }) {
  return (
    <div
      className={`${styles.cart} ${styles.pic}`}
      onClick={handleNavigateCart}
    >
      {counter ? <div className={styles['cart-full']}>{counter}</div> : null}
    </div>
  );
}
