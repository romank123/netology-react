import '../../css/normalize.css';
import '../../css/font-awesome.min.css';
import '../../css/style.css';
import '../../css/style-catalogue.css';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import CatalogueProductsHeader from '../CatalogueProductsHeader/CatalogueProductsHeader.js';
import CatalogueItem from '../CatalogueItem/CatalogueItem.js';
import Pagination from '../Pagination/Pagination.js';
import { fetchData } from '../../js/serverRequest.js';

class CatalogueProducts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // текущая страница, запрошенная с сервера
      page: 1,
      // общее количество страниц, пришедшее с сервера
      pagesAmount: 1,
      // общее количество товаров, пришедшее с сервера
      goodsAmount: 0,
      // массив из объектов товаров, полученный с сервера
      items: [],
      // строка поискового запроса с указанием страницы
      searchStringWithPages: ''
    };
  }

  static get propTypes() {
    return {
      searchString: PropTypes.string.isRequired
    }
  }

  componentWillMount() {
    this.setSearchStringWithPages(this.props);
    this.loadItems(this.state.searchStringWithPages);
  }

  componentWillReceiveProps(nextProps) {
    // обновляем строку запроса только при изменении строки 
    if (this.props.searchString !== nextProps.searchString) this.setSearchStringWithPages(nextProps);
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextState.page !== this.state.page) this.updateSearchStringWithPages(nextProps, nextState);
    if (nextState.searchStringWithPages !== this.state.searchStringWithPages) this.loadItems(nextState.searchStringWithPages);
  }

  // обновление строки запроса на сервер (выбираем страницу № 1)
  setSearchStringWithPages = (nextProps) => {
    const { searchString } = nextProps;
    if (!searchString) return;
    this.setState({ page: 1 });
    this.setState({ searchStringWithPages: `${searchString}page=1`});
  }

  updateSearchStringWithPages = (nextProps, nextState) => {
    const { page } = nextState;
    const { searchString } = nextProps;
    this.setState({ searchStringWithPages: `${searchString}page=${page}`});
  }

  loadItems = (searchStringWithPages) => {
    if (!searchStringWithPages) return;
    fetchData.doGETRequest(searchStringWithPages)
    // fetch(searchStringWithPages)
    //   .then(res => res.json())
    //   .then(res => res.status === 'ok' ? res : new Error(res.status))
      .then(res => {
        this.setState({ items: res.data });
        this.setState({ goodsAmount: res.goods });
        this.setState({ pagesAmount: res.pages });
      });
  }

  getItems = () => {
    const { items } = this.state;
    return items.map(item => {
        return <CatalogueItem {...this.props} key={item.id} item={item} />;
      });
  }

  pageClick = (page) => (event) => {
    event.preventDefault();
    this.setState({ page });
  }

  arrowClick = (delta) => (event) => {
    event.preventDefault();
    const newPageNumber = this.state.page + delta;
    if (newPageNumber < 1 || newPageNumber > this.state.pagesAmount) return;
    this.setState({ page: newPageNumber });
  }

  render() {
    return (
      /* <!-- Основной контент каталога --> */
      <section className="product-catalogue-content">
        <CatalogueProductsHeader {...this.props} goods={this.state.goodsAmount} />
        <section  className="product-catalogue__item-list">
          {this.getItems()}
        </section>
        <Pagination {...this.state} amount={this.state.pagesAmount} pageClick={this.pageClick} arrowClick={this.arrowClick} />
      </section>
    );
  }
}

export default CatalogueProducts;
