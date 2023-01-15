import '../../css/normalize.css';
import '../../css/font-awesome.min.css';
import '../../css/style.css';
import '../../css/style-order.css';
import '../../css/style-catalogue.css';
import '../../css/style-favorite.css';

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class FavouriteSitePath extends Component {
  render() {
    return (
      <div className="site-path">
        <ul className="site-path__items">
          <li className="site-path__item"><Link to="/" >Главная</Link></li>
          <li className="site-path__item"><Link to={this.props.match.url} >Избранное</Link></li>
        </ul>
      </div>
    );
  }
}

export default FavouriteSitePath;
