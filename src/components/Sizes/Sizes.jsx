import React from 'react';
import PropTypes from 'prop-types';

export default function Sizes({ items, onClick, selected }) {
  return (
    <p>
      {(items.length === 0) && 'Нет в наличии'}
      {(items.length > 0) && 'Размеры в наличии: '}
      {(items.length > 0) && items.map((o, index) => (
        <span
          className={`catalog-item-size ${(index === selected) ? 'selected' : ''}`}
          key={o.size}
          onClick={() => onClick(index)}
          onKeyPress={() => onClick(index)}
          role="button"
          tabIndex={-1}
        >
          {o.size}
        </span>
      ))}
    </p>
  );
}

Sizes.defaultProps = {
  items: [],
  onClick: () => {},
  selected: -1,
};

Sizes.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    size: PropTypes.string.isRequired,
    avalible: PropTypes.bool,
  })),
  onClick: PropTypes.func,
  selected: PropTypes.number,
};
