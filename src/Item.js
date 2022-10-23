import React from 'react';
import PropTypes from 'prop-types';

const maxTitleLength = 50;
const currencies = [
  { code: 'USD', symbol: '$' },
  { code: 'EUR', symbol: '€' },
];

export default function Item(props) {
  const {
    url,
    MainImage,
    title,
    currency_code,
    price,
    quantity,
  } = props.data;
  return (
    <div className="item">
      <div className="item-image">
        <a href={url || ''}>
          <img src={MainImage && MainImage.url_570xN} alt=''/>
        </a>
      </div>
      <div class="item-details">
        <p class="item-title">{title && getTitle(title)}</p>
        <p class="item-price">{price && getPrice(price, currency_code)}</p>
        <p class={`item-quantity level-${quantity && getLevel(quantity)}`}>{`${quantity} left`}</p>
      </div>
    </div>
  );
}

function getTitle(title) {
  return title.length > maxTitleLength ? title.slice(0, maxTitleLength) + '…' : title;
}

function getPrice(price, currency_code) {
  const cur = currencies.find((o) => o.code === currency_code);
  return cur
    ? `${cur.symbol}${Number(price).toFixed(2)}`
    : `${Number(price).toFixed(2)} ${currency_code}`;
}

function getLevel(quantity) {
  return quantity > 20 ? 'high'
    : quantity > 10 ? 'medium'
    : 'low';
}

Item.propTypes = {
  item: PropTypes.object.isRequired,
}
