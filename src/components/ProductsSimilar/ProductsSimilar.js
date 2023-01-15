import '../../css/normalize.css';
import '../../css/font-awesome.min.css';
import '../../css/style.css';
import '../../css/style-order.css';
import '../../css/style-product-card.css';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ProductsSimilarPic from '../ProductsSimilarPic/ProductsSimilarPic.js';
import { fetchData } from '../../js/serverRequest.js';

class ProductsSimilar extends Component {
  constructor(props) {
    super(props);
    // 3 товара отрисованных в данный момент на странице
    this.shownItems = [];
    this.state = {
      // все похожие товары
      items: [],
      // индекс товара в массиве "похожих товаров", который будет отражаться первым (с левой стороны) в слайдере
      actIndex: 0
    }
  }

  static get propTypes() {
    return {
      item: PropTypes.object.isRequired
    }
  }

  componentWillReceiveProps(nextProps) {
    const { item } = nextProps;
    if (!item.id) return;
    const { type, color } = item;
    if (this.state.items.length && this.state.items[0].type === type && this.state.items[0].color === color) return;
    // this.getItems(`https://api-neto.herokuapp.com/bosa-noga/products?type=${type}&color=${color}`);
    this.getItems(`products?type=${type}&color=${color}`);
  }

  componentWillUpdate(nextProps, nextState) {
    const { actIndex } = nextState;
    const { items } = nextState;
    const length = items.length;
    if (!length) return;
    if (this.state.items === items && this.state.actIndex === actIndex) return;
    // заполняем все 3 места под картинки на слайдере
    for (let i = 0; i < 3; i++) {
      const index = (actIndex + i) % length;
      this.shownItems[i] = items[index];
    }

    // если похожих товаров меньше 3, обрезаем повторяющиеся
    if (length < 3) {
      this.shownItems.splice(length);
    }
  }

  // getItems = (url) => {
  //   // например fetch('https://api-neto.herokuapp.com/bosa-noga/products?type=Туфли&color=Красный')
  //   fetch(url)
  //     .then(res => res.json())
  //     .then(res => res.status ? res.pages : new Error(res.status))
  //     .then( pages => Array(+pages).fill(undefined).map(this.getRequest(url)) )
  //     .then(fetches => Promise.all(fetches))
  //     .then(results => [].concat(...results))
  //     .then(items => this.setState({ items }))
  //     .catch(error => console.log(error));
  // }

  getItems = (url) => {
    // например fetch('https://api-neto.herokuapp.com/bosa-noga/products?type=Туфли&color=Красный')
    fetchData.doGETRequestForPages(url)
      .then( pages => Array(+pages).fill(undefined).map(this.getRequest(url)) )
      .then(fetches => Promise.all(fetches))
      .then(results => [].concat(...results))
      .then(items => this.setState({ items }))
      .catch(error => console.log(error));
  }

  // getRequest = (url) => (item, i) => fetch(`${url}&page=${i+1}`)
  //   // например fetch(`https://api-neto.herokuapp.com/bosa-noga/products?type=Туфли&color=Красный&page=${i+1}`)
  //   .then(res => res.json())
  //   .then(res => res.status ? res.data : new Error(res.status))
  //   .catch(error => error);

  getRequest = (url) => (item, i) => fetchData.doGETRequestForData(`${url}&page=${i+1}`);
    // например fetch(`https://api-neto.herokuapp.com/bosa-noga/products?type=Туфли&color=Красный&page=${i+1}`)

  arrowClick = (delta) => (event) => {
    const { actIndex, items } = this.state;
    const length = items.length;
    if (!length) return;
    const newIndex = (actIndex + length + delta) % length;
    this.setState({ actIndex: newIndex });
  }

  render() {
    const { item } = this.props;
    if (!item.id) return null;
    return (
      // <!-- Слайдер "Похожие товары" -->
      <section className="product-card__similar-products-slider">
        <h3>Похожие товары:</h3>
        <div className="similar-products-slider">
          <div onClick={this.arrowClick(+1)} className="similar-products-slider__arrow similar-products-slider__arrow_left arrow"></div>
          <ProductsSimilarPic {...this.props} item={this.shownItems[0]} /> 
          <ProductsSimilarPic {...this.props} item={this.shownItems[1]} /> 
          <ProductsSimilarPic {...this.props} item={this.shownItems[2]} /> 
          <div onClick={this.arrowClick(-1)} className="similar-products-slider__arrow similar-products-slider__arrow_right arrow"></div>
        </div>
      </section>
    );
  }
}

export default ProductsSimilar;
