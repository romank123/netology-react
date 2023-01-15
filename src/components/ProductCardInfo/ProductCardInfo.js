import '../../css/normalize.css';
import '../../css/font-awesome.min.css';
import '../../css/style.css';
import '../../css/style-order.css';
import '../../css/style-product-card.css';

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ProductCardInfoFavouriteIndicator from '../ProductCardInfoFavouriteIndicator/ProductCardInfoFavouriteIndicator.js';


class ProductCardInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // выбранные размер и количество
      sizeChosen: 0,
      amount: 1
    }
  }

  static get propTypes() {
    return {
      item: PropTypes.object.isRequired,
      addToCart: PropTypes.func.isRequired
    }
  }

  componentWillReceiveProps(nextProps) {
    // если отрисовываем новый товар, сбрасываем данные о выбранном размере
    if (this.props.item.id !== nextProps.item.id) {
      this.setState({ sizeChosen: 0 });
    }
  }

  inStock = (sizes) => {
    if (!sizes || !sizes.length) return 'Отсутствует';
    if (!sizes.find(size => size.available)) return 'Отсутствует';
    return 'В наличии';
  }

  getSizes = (sizes) => {
    if (!sizes || !sizes.length) return null;
    return sizes
      .filter( ({ available }) => available )
      .map(({ size }) => (
        <li key={size} className={this.state.sizeChosen === size ? 'active' : ''}>
          <a onClick={this.chooseSize(size)} >{size}</a>
        </li>
      ));
  }

  chooseSize = (size) => (event) => {
    this.setState({ sizeChosen: size });
  }

  changeAmount = (delta) => (event) => {
    const amount = this.state.amount + delta;
    if (amount < 1) return;
    this.setState({ amount });
  }

  clickCartButton = (event) => {
    // если размер еще не выбран, товар в корзину не добавляется
    if (this.state.sizeChosen === 0) return;

    // используем конструкцию clone = JSON.parse(JSON.stringify(original)) для глубокого копирования
    const item = JSON.parse(JSON.stringify(this.props.item));
    item.amount = this.state.amount;
    item.sizeChosen = this.state.sizeChosen;
    this.props.addToCart(item)(event);
  }

  getButtonClassName = () => {
    // если размер еще не выбирали, то делаем кнопку не кликабельной
    if (this.state.sizeChosen === 0) return 'in-basket in-basket-click in-basket_disabled';
    return 'in-basket in-basket-click';
  }

  render() {
    const { item } = this.props;
    if (!item.title) return null;
    return (
      // <!-- Блок информации о товаре -->
      <div className="main-screen__product-info">
        <div className="product-info-title">
          <h2>{item.title}</h2>
          <div className="in-stock">{this.inStock(item.sizes)}</div>
        </div>
        <div className="product-features">
          <table className="features-table">
            <tbody>
              <tr>
                <td className="left-col">Артикул:</td>
                <td className="right-col">{item.sku}</td>
              </tr>
              <tr>
                <td className="left-col">Производитель:</td>
                <td className="right-col">
                  <a href="#">
                    <span className="producer">{item.brand}</span>
                  </a>
                </td>
              </tr>
              <tr>
                <td className="left-col">Цвет:</td>
                <td className="right-col">{item.color}</td>
              </tr>
              <tr>
                <td className="left-col">Материалы:</td>
                <td className="right-col">{item.material}</td>
              </tr>
              <tr>
                <td className="left-col">Сезон:</td>
                <td className="right-col">{item.season}</td>
              </tr>
              <tr>
                <td className="left-col">Повод:</td>
                <td className="right-col">{item.reason}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="size">Размер</p>
        <ul className="sizes">
          {this.getSizes(item.sizes)}
        </ul>
        <div className="size-wrapper">
          <a>
            <span className="size-rule"></span>
            <p className="size-table">Таблица размеров</p>
          </a>
        </div>

        <ProductCardInfoFavouriteIndicator item={this.props.item} />

        <div className="basket-item__quantity">
          <div onClick={this.changeAmount(-1)} className="basket-item__quantity-change basket-item-list__quantity-change_minus">-</div>
          {this.state.amount}
          <div onClick={this.changeAmount(+1)} className="basket-item__quantity-change basket-item-list__quantity-change_plus">+</div>
        </div>
        <div className="price">{item.price} ₽</div>
        <button onClick={this.clickCartButton} className={this.getButtonClassName()} >В корзину</button>
      </div>
    );
  }
}

export default ProductCardInfo;
