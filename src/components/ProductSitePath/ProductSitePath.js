import '../../css/normalize.css';
import '../../css/font-awesome.min.css';
import '../../css/style.css';
import '../../css/style-order.css';
import '../../css/style-product-card.css';

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class ProductSitePath extends Component {
  constructor(props) {
    super(props);
  }

  static get propTypes() {
    return {
      item: PropTypes.object.isRequired,
      categories: PropTypes.array.isRequired
    }
  }

  render() {
    const { categoryId, title } = this.props.item;
    let category = this.props.categories.find(({ id }) => id === categoryId);
    if (!category) category = {};

    return (
      <div className="site-path">
        <ul className="site-path__items">
          <li className="site-path__item"><Link to="/" >Главная</Link></li>
          <li className="site-path__item"><Link to={`/catalogue?categoryId=${category.id}`} >{category.title}</Link></li>
          <li className="site-path__item"><Link to={this.props.match.url} >{title}</Link></li>
        </ul>
      </div>
    );
  }
}

export default ProductSitePath;
