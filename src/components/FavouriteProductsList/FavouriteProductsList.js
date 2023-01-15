import '../../css/normalize.css';
import '../../css/font-awesome.min.css';
import '../../css/style.css';
import '../../css/style-order.css';
import '../../css/style-catalogue.css';
import React, { Component } from 'react';
  
import CatalogueItem from '../CatalogueItem/CatalogueItem.js';

const FavouriteProductsList = (props) => {
  const getItems = () => {
    const { favouriteToShow } = props;
    return favouriteToShow
      .map(item => {
        return <CatalogueItem {...props} key={item.id} item={item} />;
      });
  }

  return (
    <section className="product-catalogue__item-list product-catalogue__item-list_favorite">
      {getItems()}
    </section>
  );
}

export default FavouriteProductsList;