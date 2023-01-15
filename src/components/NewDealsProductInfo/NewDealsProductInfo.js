import '../../css/normalize.css';
import '../../css/font-awesome.min.css';
import '../../css/style.css';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class NewDealsProductInfo extends Component {
  render() {
    if (!this.props.items || !this.props.items[this.props.activeIndex] || !this.props.items[this.props.activeIndex].id) return null;
    const item = this.props.items[this.props.activeIndex];

    const id = item.id ? item.id : '';
    const title = item.title ? item.title : null;
    const brand = item.brand ? item.brand : null;
    const price = item.price ? item.price : null;

    return (
      <div className="new-deals__product-info">
        <Link to={`/product/${id}`} className="h3" >{title}</Link>
        <p>Производитель:
          <span> {brand}</span>
        </p>
        <h3 className="h3">{price} ₽</h3>
      </div>
    );
  }
}

export default NewDealsProductInfo;
