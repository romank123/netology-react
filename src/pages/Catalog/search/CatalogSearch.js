import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styles from './CatalogSearch.module.css';
/** 
 * Форма поиска по каталогу
*/
export default function CatalogSearch({ handleSearch }) {
  const [form, setForm] = useState({ search: '' });
  const {
    search,
  } = useSelector((state) => state.catalog);
  // устанавливаем начальное значение строки поиска, которое получаем из "хедера"
  useEffect(() => {
    setForm((prevForm) => ({ ...prevForm, search }));
  }, [search]);

  const handleChange = (evt) => {
    const { value } = evt.target;
    setForm((prevForm) => ({ ...prevForm, search: value }));
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    handleSearch(form.search.trim());
  };

  return (
    <form className={`${styles.form} form-inline`} onSubmit={handleSubmit}>
      <input
        className={styles.input}
        placeholder="Поиск"
        value={form.search}
        onChange={handleChange}
      />
    </form>
  );
}
