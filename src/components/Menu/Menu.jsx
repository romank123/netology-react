import React from 'react';
import { Link } from 'react-router-dom';
// import PropTypes from 'prop-types'
import './Menu.css';

function Menu() {
  return (
    <nav className='menu'>
      <Link className='menu__item' to='/'>{'Главная'}</Link>
      <Link className='menu__item' to='/drift'>{'Дрифт-такси'}</Link>
      <Link className='menu__item' to='/timeattack'>{'Time Attack'}</Link>
      <Link className='menu__item' to='/forza'>{'Forza Karting'}</Link>
    </nav>
  );
}

// Menu.propTypes = {

// }

export default Menu

