import '../../css/normalize.css';
import '../../css/font-awesome.min.css';
import '../../css/style.css';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class Cart extends Component {
  static get propTypes() {
    return {
      cartFromServer: PropTypes.array.isRequired,
      cartItemsDetails: PropTypes.array.isRequired,
      isCartOpen: PropTypes.bool.isRequired,
      setCartItem: PropTypes.func.isRequired
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.isCartOpen === false) return false;
    if (this.props.cartFromServer === nextProps.cartFromServer && this.props.cartItemsDetails === nextProps.cartItemsDetails && this.props.isCartOpen === true) return false;
    return true;
  }

  onDeleteClick = ({ id, size }) => (event) => {
    const item = {
      id,
      sizeChosen: size,
      totalAmount: 0
    }
    this.props.setCartItem(item);
  }

  getCartItems = () => {
    const { cartFromServer, cartItemsDetails, cart, setCartItem } = this.props;
    if (!this.props.cartFromServer || !this.props.cartFromServer.length) return null;

    return cartFromServer.map(({ id, amount, size }) => {
      const itemFound = cartItemsDetails.find((item) => item.id === id);
      if (!itemFound) {
        return <div key={`id=${id}size=${size}`} >{`Товар с id=${id}, размер ${size}, ${amount} шт.`}</div>;
      }
      return (
        <div key={`id=${id}size=${size}`} className="product-list__item">
          <Link to={`/product/${id}`} className="product-list__pic">
            <img src={itemFound.images[0]} className="product-list__pic__img" alt="product" /> </Link>
          <Link to={`/product/${id}`} className="product-list__product">{`${itemFound.title}, размер ${size}, ${amount} шт.`}</Link>
          <div className="product-list__fill"></div>
          <div className="product-list__price">{`${(+itemFound.price) * (+amount)} `}
            <i className="fa fa-rub" aria-hidden="true"></i>
          </div>
          <div onClick={this.onDeleteClick({ id, size })} className="product-list__delete">
            <i className="fa fa-times" aria-hidden="true"></i>
          </div>
        </div>
      );
    });
  }

  render() {
    if (!this.props.cartFromServer || !this.props.cartFromServer.length) return (
      <div className="hidden-panel__basket basket-dropped">
        В корзине пока ничего нет. Не знаете, с чего начать? Посмотрите наши новинки!
      </div>
    );

    return (
      <div className="hidden-panel__basket basket-dropped">
        <div className="basket-dropped__title">В вашей корзине:</div>
        <div className="basket-dropped__product-list product-list">
          {this.getCartItems()}
        </div>
        <Link to="/order" className="basket-dropped__order-button">Оформить заказ</Link>
      </div>
    );
  }
}

export default Cart;