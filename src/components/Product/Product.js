import '../../css/normalize.css';
import '../../css/font-awesome.min.css';
import '../../css/style.css';
import '../../css/style-order.css';
import '../../css/style-product-card.css';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import withFetcher from '../withFetcher/withFetcher.js';
import ProductSitePath from '../ProductSitePath/ProductSitePath.js';
import ProductCard from '../ProductCard/ProductCard.js';
import ProductsOverlooked from '../ProductsOverlooked/ProductsOverlooked.js';
import ProductsSimilar from '../ProductsSimilar/ProductsSimilar.js';

class ProductInitial extends Component {
  constructor(props) {
    super(props);
  }

  static get propTypes() {
    return {
      // отображаемый товар
      item: PropTypes.object.isRequired,
      perused: PropTypes.array.isRequired,
      addToPerused: PropTypes.func.isRequired
    }
  }

  static get defaultProps() {
    return {
      item: {}
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.item.id || this.props.item.id === nextProps.item.id) return;
    const item = JSON.parse(JSON.stringify(nextProps.item));
    this.props.addToPerused(item);
  }

  render() {
    return (
      <div className="product-wrapped">
        <ProductSitePath {...this.props} {...this.state} />
        <ProductCard {...this.props} {...this.state} />
        <ProductsOverlooked {...this.props} {...this.state} />
        <ProductsSimilar {...this.props} {...this.state} />
      </div>
    );
  }
}

const Product = withFetcher({
  // url: (props) => `https://api-neto.herokuapp.com/bosa-noga/products/${props.match.params.id}`,
  url: (props) => `products/${props.match.params.id}`,
  collName: 'item'
})(ProductInitial);

export default Product;
