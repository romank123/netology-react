import '../../css/normalize.css';
import '../../css/font-awesome.min.css';
import '../../css/style.css';
import '../../css/style-order.css';
import '../../css/style-catalogue.css';
import '../../css/style-favorite.css';
import favorImg from '../../img/catalogue-pics/product-catalogue__item-1.png';

import React, { Component } from 'react';
import ReactRouterDOM, { HashRouter as Router, Route, Link, NavLink, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';



class FavouriteItem extends Component {
  constructor(props) {
    super(props);
  }

  static get propTypes() {
    return {
      item: PropTypes.object
    }
  }

  heartClick = (item) => (event) => {
    this.props.toggleFavourite(item)(event);
  }

  render() {
    const { item } = this.props;
    if (!item) return null;
    return (
      <Link className="item-list__item-card item" to={`/product/${item.id}`} >
        <div className="item-pic">
          <img className="item-pic-img" src={item.images[0]} alt={item.title} />
          <div className="product-catalogue__product_favorite">
            <p onClick={this.heartClick(item)} ></p>
          </div>
          <div className="arrow arrow_left"></div>
          <div className="arrow arrow_right"></div>
        </div>
        <div className="item-desc">
          <h4 className="item-name">{item.title}</h4>
          <p className="item-producer">Производитель: <span className="producer">{item.brand}</span></p>
          <p className="item-price">{item.price}</p>
        </div>
      </Link>
    );
  }
}

export default FavouriteItem;