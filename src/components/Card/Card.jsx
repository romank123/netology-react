import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Price from '../Price/Price';
import Image from '../Image/Image';

export default function Card({ data }) {
  const {
    images,
    title,
    price,
    id,
  } = data;

  return (
    <div className="card catalog-item-card">
      <Image id={id} title={title} images={images} />
      <div className="card-body">
        <p className="card-text" style={{ minHeight: '3em' }}>{title}</p>
        <p className="card-text">
          <Price value={price} currency=" руб." />
        </p>
        <Link to={`/catalog/${id}`} className="btn btn-outline-primary">Заказать</Link>
      </div>
    </div>
  );
}

Card.propTypes = {
  data: PropTypes.shape({
    category: PropTypes.number,
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired,
};
