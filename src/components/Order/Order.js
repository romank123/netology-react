import '../../css/normalize.css';
import '../../css/font-awesome.min.css';
import '../../css/style.css';
import '../../css/style-order.css';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import OrderSitePath from '../OrderSitePath/OrderSitePath.js';
import OrderCart from '../OrderCart/OrderCart.js';
import OrderClientData from '../OrderClientData/OrderClientData.js';
import { lsCartId } from '../../js/localStorage.js';
import { fetchData } from '../../js/serverRequest.js';

class Order extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // сумма заказа
      totalCost: 0,
      // данные клиента
      client: {
        name: '',
        phone: '',
        address: '',
        paymentType: 'onlineCard'
      }
    }
  }

  static get propTypes() {
    return {
      cartItemsDetails: PropTypes.array.isRequired,
      cartFromServer: PropTypes.array.isRequired,
      setOrderData: PropTypes.func.isRequired
    }
  }

  componentWillMount() {
    this. updateTotalCost();
  } 

  componentWillReceiveProps(nextProps) {
    this. updateTotalCost();
  }

  updateTotalCost = () => {
    const { cartFromServer, cartItemsDetails, cart } = this.props;
    if (!this.props.cartFromServer || !this.props.cartFromServer.length) this.setState({ totalCost: 0 });;
    let totalCost = 0;
    cartFromServer.forEach(({ id, amount, size }) => {
      // находим в массиве cart товар с данным id , чтобы взять из него поля price
      const itemFound = cartItemsDetails.find((item) => item.id === id);
      if (itemFound) {
        totalCost += (+itemFound.price) * (+amount);
      }  
    });
    this.setState({ totalCost });
  }

  setClientData = (event) => {
    const { value, name } = event.currentTarget;
    const { client } = this.state;
    client[name] = value;
    this.setState({ client });
  }

  submitOrder = (event) => {
    event.preventDefault();
    const { client } = this.state;
    // const { cartId } = this.props;
    const cartId = lsCartId.getValue();

    if (!client.name || !client.phone || !client.address || !cartId) return;

    const body = {
      name: client.name,
      phone: client.phone,
      address: client.address,
      paymentType: client.paymentType,
      cart: cartId
    };
    fetchData.doPOSTRequest('order', body)
      .then(() => {
        this.props.setOrderData({
          name: client.name,
          phone: client.phone,
          address: client.address,
          paymentType: client.paymentType,
          totalCost: this.state.totalCost
        });
        this.props.history.push('/orderDone');
      });
  }

  render() {
    return (
      <div className="wrapper order-wrapper">
        <OrderSitePath toggleCartVisibility={this.props.toggleCartVisibility} />
        <section className="order-process">
          <h2 className="order-process__title">Оформление заказа</h2>
          <OrderCart {...this.props} {...this.state} />
          <OrderClientData {...this.state} {...this.props} setClientData={this.setClientData} submitOrder={this.submitOrder} />
        </section>
      </div>
    );
  }
}

export default Order;