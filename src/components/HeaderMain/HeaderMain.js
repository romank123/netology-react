import '../../css/normalize.css';
import '../../css/font-awesome.min.css';
import '../../css/style.css';
import header_logo from '../../img/header-logo.png';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Cart from '../Cart/Cart.js';
import {
  headerHiddenPanelProfileVisibility,
  // headerHiddenPanelBasketVisibility,
  headerMainSearchVisibility
} from '../../js/script.js';
import { lsCartItemsDetails } from '../../js/localStorage';

class HeaderMain extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: ''
      // isCartOpen: false
    }

    this.refsDict = {
      // headerBasket: null,
      headerProfile: null,
      headerSearch: null
    };

    this.getRefs = {
      // headerBasket: ref => this.refsDict.headerBasket = ref,
      headerProfile: ref => this.refsDict.headerProfile = ref,
      headerSearch: ref => this.refsDict.headerSearch = ref
    }
  }

  componentDidMount() {
    //Видимость профиля в шапке
    this.refsDict.headerProfile.onclick = headerHiddenPanelProfileVisibility;
    // this.refsDict.headerBasket.onclick = headerHiddenPanelBasketVisibility;

    //Функция видимости меню поиска в шапке
    this.refsDict.headerSearch.onclick = headerMainSearchVisibility;
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.searchValue !== nextState.searchValue) return true;
    if (nextProps.isCartOpen === false) return false;
    if (this.props.cartFromServer === nextProps.cartFromServer && this.props.isCartOpen === true) return false;
    return true;
  }

  changeSearchValue = (event) => {
    this.setState({ searchValue: event.currentTarget.value });

  }

  searchSubmit = (event) => {
    event.preventDefault();
    this.props.history.push(`/catalogue?search=${this.state.searchValue}`);
    this.setState({ searchValue: '' });
  }

  // вынес открытие/закрытие корзины в App, чтобы контролировать его из компонента OrderSitePath
  // componentWillUpdate(nextProps) {
  //   if (nextProps.isCartOpen !== this.props.isCartOpen) {
  //     headerHiddenPanelBasketVisibility();
  //   }
  // }

  render() {
    return (
      <div className="header-main">
        <div className="header-main__wrapper wrapper">
          <div className="header-main__phone">
            <a>+7 495 79 03 5 03</a>
            <p>Ежедневно: с 09-00 до 21-00</p>
          </div>
          <div className="header-main__logo">
            <Link to="/" >
              <h1>
                <img src={header_logo} alt="logotype" />
              </h1>
            </Link>
            <p>Обувь и аксессуары для всей семьи</p>
          </div>
          <div className="header-main__profile">
            <div className="header-main__pics">
              <div ref={this.getRefs.headerSearch} className="header-main__pic header-main__pic_search">

              </div>
              <div className="header-main__pic_border"></div>
              <div ref={this.getRefs.headerProfile} className="header-main__pic header-main__pic_profile">
                <div className="header-main__pic_profile_menu"></div>
              </div>
              <div className="header-main__pic_border"></div>
              <div ref={this.getRefs.headerBasket} onClick={this.props.toggleCartVisibility} className="header-main__pic header-main__pic_basket">
                <div className="header-main__pic_basket_full">1</div>
                <div className="header-main__pic_basket_menu"></div>
              </div>
            </div>
            <form onSubmit={this.searchSubmit} className="header-main__search" action="#">
              <input onChange={this.changeSearchValue} value={this.state.searchValue} placeholder="Поиск" />
              <i className="fa fa-search" aria-hidden="true"></i>
            </form>
          </div>
        </div>

        <div className="header-main__hidden-panel hidden-panel">
          <div className="hidden-panel__profile">
            <a href="#">Личный кабинет</a>
            <Link to="/favourite" >
              <i className="fa fa-heart-o" aria-hidden="true"></i>Избранное
            </Link>
            <a href="#">Выйти</a>
          </div>

          <Cart cartItemsDetails={lsCartItemsDetails.getValue()} cartFromServer={this.props.cartFromServer} 
          setCartItem={this.props.setCartItem} isCartOpen={this.props.isCartOpen} />
        </div>

      </div>
    );
  }
}

export default HeaderMain;