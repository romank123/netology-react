import '../../css/normalize.css';
import '../../css/font-awesome.min.css';
import '../../css/style.css';
import React, { Component } from 'react';

class TopMenu extends Component {
  render() {
    return (
      <div className="top-menu">
        <div className="wrapper">
          <ul className="top-menu__items">
            <li className="top-menu__item">
              <a>Возврат</a>
            </li>
            <li className="top-menu__item">
              <a>Доставка и оплата</a>
            </li>
            <li className="top-menu__item">
              <a>О магазине</a>
            </li>
            <li className="top-menu__item">
              <a>Контакты</a>
            </li>
            <li className="top-menu__item">
              <a>Новости</a>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default TopMenu;