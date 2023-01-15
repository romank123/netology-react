import '../../css/normalize.css';
import '../../css/font-awesome.min.css';
import '../../css/style.css';
import '../../css/style-catalogue.css';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CatalogueProductsHeader extends Component {
  static get propTypes() {
    return {
      categories: PropTypes.array,
      fCategoryId: PropTypes.string.isRequired,
      fSortBy: PropTypes.string.isRequired,
      goods: PropTypes.number.isRequired,
      setSortByFilter: PropTypes.func.isRequired
    }
  }

  getName = () => {
    const {  categories, fCategoryId, fSearch } = this.props;
    if (fSearch) return 'Результаты поиска';
    if (! categories || ! categories.length) return null;
    const category = categories.find(({ id }) => +id === +fCategoryId);
    const name = category ? category.title : '';
    return name;
  }

  getGoodsAmount = () => {
    const { goods } = this.props;
    let itemName;
    switch(goods % 10) {
      case 0:
      case 5:
      case 6:
      case 7:
      case 8:
      case 9:
        itemName = 'товаров';
        break;
      case 1:
        itemName = 'товар';
        break;
      default:
        itemName = 'товара';
        break;
    }
    if (goods % 100 > 10 && goods % 100 < 20 ) itemName = 'товаров';
    return ' ' + goods + ' ' + itemName;
  }


  render() {
    return (
      /* <!-- Голова каталога с названием раздела и сортировкой --> */
      <section className="product-catalogue__head">
        <div className="product-catalogue__section-title">
          <h2 className="section-name">{this.getName()}</h2><span className="amount">{this.getGoodsAmount()}</span>
        </div>
        <div className="product-catalogue__sort-by">
          <p className="sort-by">Сортировать</p>
          <select 
            name="fSortBy" 
            value={this.props.fSortBy} 
            onChange={this.props.setSortByFilter}
            id="sorting"
          >
            <option value="popularity">по популярности</option>
            <option value="price">по цене</option>
          </select>
        </div>
      </section>
    );
  }
}

export default CatalogueProductsHeader;
