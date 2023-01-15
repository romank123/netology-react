import '../../css/normalize.css';
import '../../css/font-awesome.min.css';
import '../../css/style.css';
import '../../css/style-order.css';
import '../../css/style-catalogue.css';
import React, { Component } from 'react';

import withSubscription from '../withSubscription/withSubscription.js';

const NewDealsSliderHeartInitial = (props) => {
  const { handleClick, isFavourite } = props;
  return (
    <div 
      onClick={handleClick}
      className={`new-deals__product_favorite${isFavourite ? ' chosen' : ''}`}
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

const NewDealsSliderHeart = withSubscription(getState, getProps)(NewDealsSliderHeartInitial);

export default NewDealsSliderHeart;
