import '../../css/normalize.css';
import '../../css/font-awesome.min.css';
import '../../css/style.css';
import '../../css/style-order.css';
import '../../css/style-catalogue.css';
import React, { Component } from 'react';

import withSubscription from '../withSubscription/withSubscription.js';

const CatalogueItemHeartInitial = (props) => {
  const { handleClick, isFavourite } = props;

  const getHeartClassName = () => {
    // для раздела Каталог определяем className
    let className = isFavourite ? 'product-catalogue__product_favorite-chosen' : 'product-catalogue__product_favorite';
    // для раздела Избранное всегда отображается один и тот же className
    if (props.match.url === '/favourite') className = 'product-catalogue__product_favorite';
    // для раздела Новинки определяем className
    if (props.match.url === '/') className = isFavourite ? 'new-deals__product_favorite chosen' : 'new-deals__product_favorite';
    return className;
  }

  return (
    <div 
      className={getHeartClassName()} 
      onClick={handleClick} 
    >
      <p></p>
    </div>
  );
}

const getState = ({ item }, service) => ({
  isFavourite: service.containItem(item)
});

const getProps = ({ item }, service) => ({
  handleClick(event) {
    event.preventDefault();
    service.toggleItem(item);
  }
});

const CatalogueItemHeart = withSubscription(getState, getProps)(CatalogueItemHeartInitial);

export default CatalogueItemHeart;
