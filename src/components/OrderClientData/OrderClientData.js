import '../../css/normalize.css';
import '../../css/font-awesome.min.css';
import '../../css/style.css';
import '../../css/style-order.css';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class OrderClientData extends Component {
  static get propTypes() {
    return {
      client: PropTypes.shape({
        name: PropTypes.string.isRequired,
        phone: PropTypes.string.isRequired,
        address: PropTypes.string.isRequired,
        paymentType: PropTypes.string.isRequired
      }),
      setClientData: PropTypes.func.isRequired,
      submitOrder: PropTypes.func.isRequired
    }
  }

  getButtonClassName = () => {
    let buttonClassName = 'order-process__form-submit order-process__form-submit_click';
    const { client } = this.props;
    if (!client.name || !client.phone || !client.address) buttonClassName += ' order-process__form-submit_disabled';
    return buttonClassName;
  }

  render() {
    const { client, setClientData, submitOrder } = this.props;
    return (
      <div className="order-process__confirmed">
        <form onSubmit={submitOrder} action="#">
          <div className="order-process__delivery">
            <h3 className="h3">кому и куда доставить?</h3>
            <div className="order-process__delivery-form">
              <label className="order-process__delivery-label">
                <div className="order-process__delivery-text">Имя</div>
                <input 
                  value={this.props.client.name} 
                  onChange={this.props.setClientData}
                  className="order-process__delivery-input" 
                  type="text" 
                  name="name" 
                  placeholder="Представьтесь, пожалуйста" 
                />
              </label>
              <label className="order-process__delivery-label">
                <div className="order-process__delivery-text">Телефон</div>
                <input 
                  value={this.props.client.phone} 
                  onChange={this.props.setClientData}
                  className="order-process__delivery-input" 
                  type="tel" 
                  name="phone" 
                  placeholder="Номер в любом формате" 
                />
              </label>
              <label className="order-process__delivery-label">
                <div className="order-process__delivery-text">Адрес</div>
                <input 
                  value={this.props.client.address} 
                  onChange={this.props.setClientData}
                  className="order-process__delivery-input order-process__delivery-input_adress" 
                  type="text" 
                  name="address" 
                  placeholder="Ваша покупка будет доставлена по этому адресу" />
              </label>
            </div>
            <p>Все поля обязательны для заполнения. Наш оператор свяжется с вами для уточнения деталей заказа.</p>
          </div>
          <div className="order-process__paid">
            <h3 className="h3">хотите оплатить онлайн или курьеру при получении?</h3>
            <div className="order-process__paid-form">
              <label className="order-process__paid-label">
                <input 
                  checked={client.paymentType === 'onlineCard'}
                  onChange={this.props.setClientData}
                  className="order-process__paid-radio" 
                  type="radio" 
                  name="paymentType" 
                  value="onlineCard" 
                />
                <span className="order-process__paid-text">Картой онлайн</span>
              </label>
              <label className="order-process__paid-label">
                <input 
                  checked={client.paymentType === 'offlineCard'}
                  onChange={this.props.setClientData}
                  className="order-process__paid-radio" 
                  type="radio" 
                  name="paymentType" 
                  value="offlineCard" 
                />
                <span className="order-process__paid-text">Картой курьеру</span>
              </label>
              <label className="order-process__paid-label">
                <input 
                  checked={client.paymentType === 'offlineCash'}
                  onChange={this.props.setClientData}
                  className="order-process__paid-radio" 
                  type="radio" 
                  name="paymentType" 
                  value="offlineCash" 
                />
                <span className="order-process__paid-text">Наличными курьеру</span>
              </label>
            </div>
          </div>
          {/* <button type="submit" className="order-process__form-submit order-process__form-submit_click">Подтвердить заказ</button> */}
          <button type="submit" className={this.getButtonClassName()} >Подтвердить заказ</button>
        </form>
      </div>
    );
  }
}

export default OrderClientData;