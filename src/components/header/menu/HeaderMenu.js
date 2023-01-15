import React from 'react';
import MenuList from '../../menu/list/MenuList';
import MenuListItem from '../../menu/item/MenuListItem';
import MenuItemNavLink from '../../menu/navlink/MenuItemNavLink';
/** 
 * Компонент меню для хедера страницы
*/
const menuItemsHeader = [
  {
    route: '/',
    name: 'Главная',
  },
  {
    route: '/catalog',
    name: 'Каталог',
  },
  {
    route: '/about',
    name: 'О магазине',
  },
  {
    route: '/contacts',
    name: 'Контакты',
  },
];

export default function HeaderMenu() {
  return (
    <MenuList className="navbar-nav mr-auto" items={menuItemsHeader}>
      {(items) =>
        items.map((item, index) => (
          <MenuListItem key={index} className="nav-item">
            <MenuItemNavLink
              className="nav-link"
              route={item.route}
              name={item.name}
            />
          </MenuListItem>
        ))
      }
    </MenuList>
  );
}
