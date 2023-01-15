import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import HeaderSearch from './search/HeaderSearch';
import HeaderCart from './cart/HeaderCart';
import { catalogSearchChange } from '../../../store/SliceCatalog';
import styles from './PageHeaderWidget.module.css';
/** 
 * Компонент поиска и корзины для хедера страницы
*/
export default function PageHeaderWidget() {
  const [invisible, setInvisible] = useState(true);
  const [form, setForm] = useState({ search: '' });
  const { counter } = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const toggleInvisible = () => {
    setInvisible((prev) => !prev);
    const search = form.search.trim();
    if (search) {
      dispatch(catalogSearchChange(search));
      setForm({ search: '' });
      navigate('/catalog');
    }
  };

  const handleNavigateCart = () => {
    navigate('/cart');
  };

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    console.log({ name, value });
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  return (
    <div>
      <div className={styles.pics}>
        <div
          data-id="search-expander"
          className={`${styles.pic} ${styles.search}`}
          onClick={toggleInvisible}
        />
        <HeaderCart counter={counter} handleNavigateCart={handleNavigateCart} />
        <HeaderSearch
          invisible={invisible}
          form={form}
          handleChange={handleChange}
        />
      </div>
    </div>
  );
}
