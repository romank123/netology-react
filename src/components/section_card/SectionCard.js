import React from 'react';
import { Link } from 'react-router-dom';
import styles from './SectionCard.module.css';
/** 
 * Компонент карточки товара для разделов "Хиты продаж" и "Каталог"
*/
export default function SectionCard({
  id,
  title,
  price,
  images,
  cardBottomMarginStyleProp,
}) {

  return (
    <div
      className={
        cardBottomMarginStyleProp === 'catalog'
          ? `col-4 ${styles['catalog-item-card']}`
          : 'col-4'
      }
    >
      <div className={`${styles.card} card`}>
        <img src={images[0]} className="card-img-top img-fluid" alt={title} />
        <div className={`${styles['card-body']} card-body`}>
          <p className="card-text">{title}</p>
          <p className="card-text">{price} руб.</p>
          <Link to={`/catalog/${id}`} className="btn btn-outline-primary">
            Заказать
          </Link>
        </div>
      </div>
    </div>
  );
}
