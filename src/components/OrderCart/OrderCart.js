import '../../css/normalize.css';
import '../../css/font-awesome.min.css';
import '../../css/style.css';
import '../../css/style-order.css';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class OrderCart extends Component {
  static get propTypes() {
    return {
      cartItemsDetails: PropTypes.array.isRequired,
      cartFromServer: PropTypes.array.isRequired,
      setCartItem: PropTypes.func.isRequired,
      totalCost: PropTypes.number.isRequired
    }
  }

  onChangeAmountButtonClick = ({ id, size, amount, delta }) => (event) => {
    const item = {
      id,
      sizeChosen: size,
      totalAmount: +amount + delta
    };
    this.props.setCartItem(item);
  }

  getCartItems = () => {
    const { cartFromServer, cartItemsDetails, cart, setCartItem } = this.props;
    if (!this.props.cartFromServer || !this.props.cartFromServer.length) return null;

    return cartFromServer.map(({ id, amount, size }) => {
      // находим в массиве cart товар с данным id , чтобы взять из него поля images, title, price
      const itemFound = cartItemsDetails.find((item) => item.id === id);
      if (!itemFound) {
        return <div key={`id=${id}size=${size}`} >{`Товар с id=${id}, размер ${size}, ${amount} шт.`}</div>;
      }
      return (
        <div key={`id=${id}size=${size}`} className="basket-item">
          <Link to={`/product/${id}`} className="basket-item__pic"><img src={itemFound.images[0]} alt={itemFound.title} /></Link>
          <div className="basket-item__product">
            <div className="basket-item__product-name"><Link to={`/product/${id}`} >{itemFound.title}</Link></div>
            <div className="basket-item__product-features">
              <div className="basket-item__size">Размер: <span>{size}</span></div>
              <div className="basket-item__producer">Производитель: <span>{itemFound.brand}</span></div>
              <div className="basket-item__color">Цвет: <span>{itemFound.color}</span></div>
            </div>
          </div>
          <div className="basket-item__quantity__order">
            <div 
              onClick={this.onChangeAmountButtonClick({ id, size, amount, delta: -1 })} 
              className="basket-item__quantity-change basket-item-list__quantity-change_minus"
            >-</div>{amount}
            <div 
              onClick={this.onChangeAmountButtonClick({ id, size, amount, delta: +1 })} 
              className="basket-item__quantity-change basket-item-list__quantity-change_plus"
            >+</div>
          </div>
          <div className="basket-item__price">{`${(+itemFound.price) * (+amount)} `}<i className="fa fa-rub" aria-hidden="true"></i></div>
        </div>
      );
    });
  }

  render() {
    return (
      <div className="order-process__basket order-basket">
        <div className="order-basket__title">в вашей корзине:</div>
        <div className="order-basket__item-list">
          {this.getCartItems()}
        </div>
        <div className="order-basket__summ">{`Итого: `}<span>{`${this.props.totalCost} `}<i className="fa fa-rub" aria-hidden="true"></i></span></div>
      </div>
    );
  }
}

export default OrderCart;