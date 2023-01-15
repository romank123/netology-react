import '../../css/normalize.css';
import '../../css/font-awesome.min.css';
import '../../css/style.css';
import '../../css/style-order.css';
import '../../css/style-catalogue.css';
import React, { Component } from 'react';

const FavouriteTitle = (props) => {
  const { amount } = props;

  return (
    <span className="amount amount_favorite"> {amount} товаров</span>
  );
}

const getState = (props, service) => ({
  favouriteList: service.getValue()
});

export default FavouriteTitle;
