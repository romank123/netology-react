import '../../css/normalize.css';
import '../../css/font-awesome.min.css';
import '../../css/style.css';
import React, { Component } from 'react';
import ReactRouterDOM, { Router, Route, Link, NavLink, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import { createBrowserHistory } from 'history';
import qhistory from 'qhistory';
import { stringify, parse } from 'qs'

import Header from '../Header/Header.js';
import Footer from '../Footer/Footer.js';
import MainPage from '../MainPage/MainPage.js';
import Product from '../Product/Product.js';
import Favourite from '../Favourite/Favourite.js';
import Catalogue from '../Catalogue/Catalogue.js';
import Order from '../Order/Order.js';
import OrderDone from '../OrderDone/OrderDone.js';
import withFetcher from '../withFetcher/withFetcher.js';
import { lsCartId, lsFavourite, lsCartItemsDetails } from '../../js/localStorage.js';
// import { favouriteService } from '../../js/favouriteService.js';
import { fetchCart, fetchProduct } from '../../js/serverRequest.js';
import { headerHiddenPanelBasketVisibility } from '../../js/script.js';

const hist = createBrowserHistory({basename: process.env.PUBLIC_URL});
const history = qhistory(hist, stringify, parse);

class AppInitial extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // корзина, полученная с сервера (содержит объекты только с полями id, amount и size)
      cartFromServer: [],
      // подробные данные об объектах корзины (содержит в т.ч. поля price, title, images для отображения в корзине и на странице заказа)
      perused: [],
      // открыта ли корзина
      isCartOpen: false,
      // данные заказа (заполняются после отправки заказа на сервер и прихода успешного ответа)
      order: {
        name: '',
        phone: '',
        address: '',
        paymentType: '',
        totalCost: 0
      }
    }
  }

  static get propTypes() {
    return {
      categories: PropTypes.array.isRequired,
      filters: PropTypes.object
    }
  }

  static get defaultProps() {
    return {
      categories: []
    }
  }

  componentWillMount() {
    this.getCartFromLocalStorage();
  }

  getCartFromLocalStorage = () => {
    const cartId = lsCartId.getValue();
    const cartItemsDetails = lsCartItemsDetails.getValue();
    if (!cartId) return;
    try {
      // загружаем с сервера данные корзины
      fetchCart.doGETRequestForData(cartId)
        .then(data => {
          this.setState({ cartFromServer: data.products });
           return data.products;
        })
        // по каждому товару из корзины делаем запрос, чтобы получить поля price, title, images для отображения корзины
        .then(products => fetchProduct.getCartItemsDetails(products, cartItemsDetails))
        .then(products => lsCartItemsDetails.setValue(products));
    } catch(error) {
      console.log(error);
      lsCartId.setValue('');
    }
  }

  // этот метод используем при добавлении товара в корзину со страницы продукты
  addToCart = (item) => (event) => {
    // item.amount - количество, которое необходимо добавить к уже имеющемуся
    // если в массиве cartItemsDetails нет продукта с данным id, загружаем его туда
    lsCartItemsDetails.pushItem(item);
    
    // проверяем, есть ли уже в корзине товар с данными id и размером
    const itemFoundInCart = this.state.cartFromServer.find(({ id, size }) => (id === item.id && size === item.sizeChosen));
    const totalAmount = itemFoundInCart ? itemFoundInCart.amount + item.amount : item.amount;
    item.totalAmount = totalAmount;
    this.updateCart(item);
  }

  // этот метод используем при изменении количества товара из корзины и со страницы оформления заказа
  setCartItem = (item) => {
    // item.totalAmount - новое итоговое количество данного товара, которое необходимо установить в корзине
    this.updateCart(item);
  }

  updateCart = (item) => {
    const cartId = lsCartId.getValue();
    const body = {
      id: item.id,
      size: item.sizeChosen,
      amount: item.totalAmount
    };

    fetchCart.doPOSTRequest(cartId, body)
      .then(data => {
        this.setState({ cartFromServer: data.products });
        lsCartId.setValue(data.id);
      })
      .catch(err => {
        // при удалении последнего товара из корзины не обращаем внимание на ошибку от сервера и обнуляем корзину
        if (item.totalAmount === 0 && this.state.cartFromServer.length === 1 && this.state.cartFromServer[0].id === item.id) {
          lsCartId.setValue('');
          this.setState({ cartFromServer: [] });
        }
      });
  }

  addToPerused = (item) => {
    const itemFound = this.state.perused.find(({ id }) => id === item.id );
    const perused = this.state.perused;
    if (!itemFound) {
      perused.unshift(item);
    } else {
      // если данный товар с данным id уже есть в "просмотренные", перемещаем его вперед массива
      const index = perused.indexOf(itemFound);
      perused.splice(index, 1);
      perused.unshift(itemFound);
    }
    // ограничение по условию - не больше 10
    if (perused.length > 10) perused.splice(10);
    this.setState({ perused });
  }

  toggleCartVisibility = (event) => {
    event.preventDefault();
    this.setState({ isCartOpen: !this.state.isCartOpen });
    headerHiddenPanelBasketVisibility();
  }

  // при успешной отправке заказа обнуляем корзину
  setOrderData = (order) => {
    this.setState({ order });
    // this.setState({ cartId: '' });
    lsCartId.setValue('');
    this.setState({ cartFromServer: [] });
    this.setState({ cart: [] });
  }

  render() {
    return (
      <Router history={history} >
        <div>
          <Header {...this.props} {...this.state} setCartItem={this.setCartItem} 
          updateCartOnClient={this.updateCartOnClient} toggleCartVisibility={this.toggleCartVisibility} history={history} />
          <Switch>
            <Route path='/orderDone' render={(props) => (
              <OrderDone {...this.state} getTotalCost={this.getTotalCost} toggleCartVisibility={this.toggleCartVisibility} />
            )} />
            <Route path='/order' render={(props) => (
              <Order {...props} {...this.state} cartItemsDetails={lsCartItemsDetails.getValue()} setCartItem={this.setCartItem} toggleCartVisibility={this.toggleCartVisibility} 
              setClientData={this.setClientData} submitOrder={this.submitOrder} getTotalCost={this.getTotalCost} setOrderData={this.setOrderData} />
            )} />
            <Route path='/catalogue' render={(props) => (
              <Catalogue {...this.props} {...props} {...this.state} />
            )} />
            <Route path='/favourite' render={(props) => (
              <Favourite {...this.props} {...props} />
            )} />
            <Route path='/product/:id([0-9]+)' render={(props) => (
              <Product {...this.props} {...props} {...this.state} addToCart={this.addToCart} 
              addToPerused={this.addToPerused} />
            )} />
            <Route path='/' render={(props) => (
              <MainPage {...this.props} {...props} {...this.state} />
            )} />
          </Switch>
          <Footer />
        </div>
      </Router>     
    );
  }
}

const AppIntermediate = withFetcher({
  // url: 'https://api-neto.herokuapp.com/bosa-noga/categories',
  url: 'categories',
  collName: 'categories'
})(AppInitial);

const App = withFetcher({
  // url: 'https://api-neto.herokuapp.com/bosa-noga/filters',
  url: 'filters',
  collName: 'filters'
})(AppIntermediate);

export default App;
