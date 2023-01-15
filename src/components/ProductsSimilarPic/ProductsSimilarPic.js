import '../../css/normalize.css';
import '../../css/font-awesome.min.css';
import '../../css/style.css';
import '../../css/style-order.css';
import '../../css/style-product-card.css';
// import similarProductImg_1 from '../../img/product-card-pics/product-card__similar-products-slider-item-1.png';
// import similarProductImg_2 from '../../img/product-card-pics/product-card__similar-products-slider-item-2.png';
// import similarProductImg_3 from '../../img/product-card-pics/product-card__similar-products-slider-item-3.png';

import React, { Component } from 'react';
import ReactRouterDOM, { HashRouter as Router, Route, Link, NavLink, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';

class ProductsSimilarPic extends Component {
  constructor(props) {
    super(props);
  }

  static get propTypes() {
    return {
      item: PropTypes.object
    }
  }

  getImg = (item) => item ? item.images[0] : undefined

  getId = (item) => item ? item.id : this.props.match.params.id

  getTitle = (item) => item ? item.title : undefined

  getBrand = (item) => item ? 
    <p className="similar-products-slider__item-producer">
      Производитель: <span className="producer">{item.brand}</span>
    </p> : null

  getPrice = (item) => item ? 
    <p className="similar-products-slider__item-price">
      {item.price}
    </p> : null



  render() {
    const { item } = this.props;
    return (
      <div className="similar-products-slider__item-list__item-card item">
        <div className="similar-products-slider__item">
          <Link to={`/product/${this.getId(item)}`} >
            <img src={this.getImg(item)} className="similar-products-slider__item-pic" alt={this.getTitle(item)} />
          </Link>
        </div>
        <div className="similar-products-slider__item-desc">
          <h4 className="similar-products-slider__item-name">{this.getTitle(item)}</h4>
          {this.getBrand(item)}
          {this.getPrice(item)}
        </div>    
      </div>
    );
  }
}

export default ProductsSimilarPic;
