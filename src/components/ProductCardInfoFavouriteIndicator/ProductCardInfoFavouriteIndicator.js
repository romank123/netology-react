import '../../css/normalize.css';
import '../../css/font-awesome.min.css';
import '../../css/style.css';
import '../../css/style-order.css';
import '../../css/style-catalogue.css';
import React, { Component } from 'react';

import withSubscription from '../withSubscription/withSubscription.js';

const ProductCardInfoFavouriteIndicatorInitial = (props) => {
  const { handleClick, isFavourite } = props;

  return (
    <a 
      onClick={handleClick} 
      className="in-favourites-wrapper"
    >
      <div className={isFavourite ? 'favourite favourite-fill' : 'favourite'}></div>
      <p className="in-favourites">
        {isFavourite ? 'В избранном' : 'В избранное'}
      </p>
    </a>
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

const ProductCardInfoFavouriteIndicator = withSubscription(getState, getProps)(ProductCardInfoFavouriteIndicatorInitial);

export default ProductCardInfoFavouriteIndicator;
