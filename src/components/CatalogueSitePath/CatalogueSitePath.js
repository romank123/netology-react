import '../../css/normalize.css';
import '../../css/font-awesome.min.css';
import '../../css/style.css';
import '../../css/style-order.css';
import '../../css/style-product-card.css';

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class CatalogueSitePath extends Component {
  static get propTypes() {
    return {
      categories: PropTypes.array.isRequired
    }
  }

  render() {
    const categoryId = this.props.location.query.categoryId;
    const search = this.props.location.query.search;
    let category = this.props.categories.find(({ id }) => id === +categoryId) || {};

    const secondLink = search ? 'Результаты поиска' : (<Link to={`/catalogue?categoryId=${category.id}`} >{category.title}</Link>);

    return (
      // {/* -- Breadcrumbs -- */}
      <div className="site-path">
        <ul className="site-path__items">
          <li className="site-path__item"><Link to="/" >Главная</Link></li>
          <li className="site-path__item">{secondLink}</li>
        </ul>
      </div>
    );
  }
}

export default CatalogueSitePath;
