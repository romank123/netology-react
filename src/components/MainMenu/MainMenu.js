import '../../css/normalize.css';
import '../../css/font-awesome.min.css';
import '../../css/style.css';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { mainSubmenuVisibility } from '../../js/script.js';

class MainMenu extends Component {
  static get propTypes() {
    return {
      categories: PropTypes.array
    }
  }

  shouldComponentUpdate(nextProps) {
    // пока categories не приходят, нет смысла обновлять
    if (!nextProps.categories || !nextProps.categories.length) return false;
    // после того, как categories получены и отрисованы, можно больше не обновлять
    if (this.props.categories && this.props.categories.length) return false;
    return true;
  }

  getMainMenuItems = (categories) => {
    return categories.map(({ id, title }) => (
      <li key={id} onClick={mainSubmenuVisibility} className="main-menu__item">
        {/* обнуляем фильтр Каталога, переданный из выпадающего меню */}
        <Link to={`/catalogue?categoryId=${id}`} >{title}</Link>
      </li>
    ));
  }

  render() {
    if (!this.props.categories.length) return null;
    return (
      <nav className="main-menu">
        <div className="wrapper">
          <ul className="main-menu__items">
            {this.getMainMenuItems(this.props.categories)}
          </ul>
        </div>

      </nav>
    );
  }
}

export default MainMenu;