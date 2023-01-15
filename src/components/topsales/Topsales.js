import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import SectionCard from '../section_card/SectionCard';
import Loader from '../loader/Loader';
import Error from '../error/Error';
import { fetchGetTopSales } from '../../api/index';
import styles from './Topsales.module.css';
/** 
 * Компонент "Хиты продаж" для главной страницы
*/
export default function Topsales() {
  const { topSales, loading, error } = useSelector(
    (state) => state.topSales
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGetTopSales());
  }, [dispatch]);

  const topSalesCards = topSales.map((cardProps) => (
    <SectionCard key={cardProps.id} {...cardProps} />
  ));
  return (
    (error && <Error errorText={error} />) ||
    (loading || topSalesCards.length ? (
      <section className={styles['top-sales']}>
        <h2 className="text-center">Хиты продаж!</h2>
        <div className="row">
          {loading && <Loader />}
          {!loading && topSalesCards}
        </div>
      </section>
    ) : null)
  );
}
