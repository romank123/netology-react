import '../../css/normalize.css';
import '../../css/font-awesome.min.css';
import '../../css/style.css';
import '../../css/style-order.css';
import '../../css/style-catalogue.css';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import CatalogueItemHeart from '../CatalogueItemHeart/CatalogueItemHeart.js';

class CatalogueItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // индекс фотографии товара, которая в данный момент отображается (меняется стрелками)
      itemImgIndex: 0
    }
  }

  static get propTypes() {
    return {
      item: PropTypes.object
      // favourite: PropTypes.array.isRequired
    }
  }

  itemArrowClick = (item) => (delta = +1) => (event) => {
    event.preventDefault();
    const length = item.images.length;
    const itemImgIndex = (this.state.itemImgIndex + length + delta) % length;
    this.setState({ itemImgIndex });
  }

  render() {
    const { item } = this.props;
    if (!item) return null;
    return (
      <Link className="item-list__item-card item" to={`/product/${item.id}`} >
        <div className="item-pic">
          <img className="item-pic-img" src={item.images[this.state.itemImgIndex]} alt={item.title} />

          <CatalogueItemHeart item={item} match={this.props.match} />

          <div className="arrow arrow_left" onClick={this.itemArrowClick(item)(-1)} ></div>
          <div className="arrow arrow_right" onClick={this.itemArrowClick(item)(+1)} ></div>
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

export default CatalogueItem;