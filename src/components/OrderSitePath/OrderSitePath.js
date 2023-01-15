import '../../css/normalize.css';
import '../../css/font-awesome.min.css';
import '../../css/style.css';
import '../../css/style-order.css';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class OrderSitePath extends Component {
  static get propTypes() {
    return {
      toggleCartVisibility: PropTypes.func.isRequired
    }
  }

  render() {
    return (                 
      <div className="site-path">
        <ul className="site-path__items">
          <li className="site-path__item"><Link to="/" >Главная</Link></li>
          <li className="site-path__item"><a onClick={this.props.toggleCartVisibility} >Корзина</a></li>
          <li className="site-path__item"><Link to="/order" >Оформление заказа</Link></li>
        </ul>
      </div>
    );
  }
}

export default OrderSitePath;