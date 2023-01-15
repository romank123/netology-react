import React from 'react';
import { NavLink } from 'react-router-dom';
/** 
 * Компонент навигации элемента меню
*/
export default function MenuItemNavLink(props) {
  const { route, className, name } = props;
  return (
    <NavLink to={route} className={className}>
      {name}
    </NavLink>
  );
}
