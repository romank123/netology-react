import React from 'react';
import PropTypes from 'prop-types';
import Card from '../Card/Card';

export default function CardList({ items }) {
  return (
    <div className="row">
      {items.map((o) => (
        <div className="col-4" key={o.id}>
          <Card data={o} />
        </div>
      ))}
    </div>
  );
}

CardList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape).isRequired,
};
