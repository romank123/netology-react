import '../../css/normalize.css';
import '../../css/font-awesome.min.css';
import '../../css/style.css';
import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

class DroppedMenuInitial extends Component {
  static get propTypes() {
    return {
      filters: PropTypes.object
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    // если filters еще не пришли, не обновляемся
    if (!this.props.filters && !nextProps.filters) return false;
    // как только получили filters, можно не обновлять
    if (this.props.filters && Object.keys(this.props.filters).length) return false;
    return true;
  }

  getMenuItems = (filterType) => {
    const { filters } = this.props
    if (!filters || !filters[filterType]) return null;

    return filters[filterType].map(option => (
      <li key={option} className="dropped-menu__item">
        <a onClick={this.pushToCatalogue({ filterType, option })} >{option}</a>
      </li>
    ));
  }

  pushToCatalogue = ({ filterType, option }) => (event) => {
    const queries = this.props.location.query;
    const categoryIdSearch = queries.categoryId ? `categoryId=${queries.categoryId}` : '';
    const selectedFilterSearch = `${filterType}=${option}`;
    const newSearch = `?${categoryIdSearch}&${selectedFilterSearch}`;
    this.props.history.push(`/catalogue${newSearch}`);
  }

  render() {
    const { filters } = this.props;
    if (!filters || !filters.brand) return null;
    return (
      <div className="dropped-menu">
        <div className="wrapper">
          <div className="dropped-menu__lists dropped-menu__lists_women">
            <h3 className="dropped-menu__list-title">Повод:</h3>
            <ul className="dropped-menu__list">
              {this.getMenuItems('reason')}
            </ul>
          </div>
          <div className="dropped-menu__lists">
            <h3 className="dropped-menu__list-title">Категории:</h3>
            <ul className="dropped-menu__list">
              {this.getMenuItems('type')}
            </ul>
          </div>
          <div className="dropped-menu__lists">
            <h3 className="dropped-menu__list-title">Сезон:</h3>
            <ul className="dropped-menu__list">
              {this.getMenuItems('season')}
            </ul>
          </div>
          <div className="dropped-menu__lists dropped-menu__lists_three-coloumns">
            <h3 className="dropped-menu__list-title">Бренды:</h3>
            <ul className="dropped-menu__list">
              {this.getMenuItems('brand')}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

const DroppedMenu = withRouter(DroppedMenuInitial);

export default DroppedMenu;