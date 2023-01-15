import '../../css/normalize.css';
import '../../css/font-awesome.min.css';
import '../../css/style.css';
import '../../css/style-order.css';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const paymentTypes = {
  onlineCard: 'Картой онлайн',
  offlineCard: 'Картой курьеру',
  offlineCash: 'Наличными курьеру'
}

class OrderDone extends Component {
  static get propTypes() {
    return {
      // данные заказа
      order: PropTypes.shape({
        name: PropTypes.string.isRequired,
        phone: PropTypes.string.isRequired,
        address: PropTypes.string.isRequired,
        paymentType: PropTypes.string.isRequired,
        totalCost: PropTypes.number.isRequired
      }),
      // управление открытием/закрытием корзины
      toggleCartVisibility: PropTypes.func.isRequired
    }
  }

  getPaymentType = () => {
    const { paymentType } = this.props.order;
    return paymentTypes[paymentType] ? paymentTypes[paymentType] : paymentType;
  }

  render() {
    const { order, toggleCartVisibility } = this.props;
    return (
      <div className="wrapper order-wrapper">                  
        <div className="site-path">
          <ul className="site-path__items">
            <li className="site-path__item"><Link to="/" >Главная</Link></li>
            <li className="site-path__item"><a onClick={toggleCartVisibility} href="#">Корзина</a></li>
            <li className="site-path__item">Оформление заказа</li>
            <li className="site-path__item">Заказ принят</li>
          </ul>
        </div>
        <section className="order-done">
          <h2 className="order-done__title order-process__title">Заказ принят, спасибо!</h2>
          <div className="order-done__information order-info">
            <div className="order-info__item order-info__item_summ"> 
              <h3>Сумма заказа:</h3>
              <p>{`${order.totalCost} `}<i className="fa fa-rub" aria-hidden="true"></i></p>
            </div>
            <div className="order-info__item order-info__item_pay-form"> 
              <h3>Способ оплаты:</h3>
              <p>{this.getPaymentType()}</p>
            </div>
            <div className="order-info__item order-info__item_customer-name"> 
              <h3>Имя клиента:</h3>
              <p>{order.name}</p>
            </div>
            <div className="order-info__item order-info__item_adress">
              <h3>Адрес доставки:</h3>
              <p>{order.address}</p>
            </div>
            <div className="order-info__item order-info__item_phone">
              <h3>Телефон:</h3>
              <p>{order.phone}</p>
            </div>
          </div>
          <p className="order-done__notice">Данные о заказе отправлены на адрес <span>notbosaanymore@gmail.com.  </span></p>
          <Link to="/" ><button className="order-done__continue">продолжить покупки</button></Link>
        </section>
      </div>
    );
  }
}

export default OrderDone;