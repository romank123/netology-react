import React from 'react';
import MenuList from '../../menu/list/MenuList';
import MenuListItem from '../../menu/item/MenuListItem';
import MenuItemLink from '../../menu/link/MenuItemLink';
/** 
 * Компонент меню для футера страницы
*/
const menuItemsFooter = [
  {
    route: '/about',
    name: 'О магазине',
  },
  {
    route: '/catalog',
    name: 'Каталог',
  },
  {
    route: '/contacts',
    name: 'Контакты',
  },
];

export default function FooterMenu() {
  return (
    <MenuList className="nav flex-column" items={menuItemsFooter}>
      {(items) =>
        items.map((item, index) => (
          <MenuListItem key={index} className="nav-item">
            <MenuItemLink
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
