import React, { useEffect, useRef } from 'react';
import styles from './HeaderSearch.module.css';
/** 
 * Компонент поиска для хедера страницы
*/
export default function HeaderSearch({ invisible, form, handleChange }) {
  const inputRef = useRef();

  useEffect(() => {
    if (!invisible) inputRef.current?.focus();
  }, [invisible]);

  const handleSubmit = (evt) => {
    evt.preventDefault();
  };
  
  const baseClassName = `${styles.form} form-inline`;
  return (
    <form
      className={invisible ? baseClassName + ' invisible' : baseClassName}
      onSubmit={handleSubmit}
    >
      <input
        name="search"
        className={styles.input}
        placeholder="Поиск"
        value={form.search}
        onChange={handleChange}
        ref={inputRef}
      ></input>
    </form>
  );
}

