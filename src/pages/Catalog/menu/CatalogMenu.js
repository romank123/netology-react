import React from 'react';
import MenuList from '../../../components/menu/list/MenuList';
import MenuListItem from '../../../components/menu/item/MenuListItem';
import CatalogMenuItemLink from './item_link/CatalogMenuItemLink';
import styles from './CatalogMenu.module.css';
/** 
 * Меню фильтров товаров каталога по категориям
*/
export default function CatalogMenu({ menuItems, categoryId, handleSelect }) {
  const hrefAttr = '#';
  return (
    <MenuList
      className={`${styles.categories} nav justify-content-center`}
      items={menuItems}
    >
      {(items) =>
        items.map((item) => (
          <MenuListItem key={item.id} className="nav-item">
            <CatalogMenuItemLink
              className={
                categoryId === item.id ? 'nav-link active' : 'nav-link'
              }
              hrefAttr={hrefAttr}
              name={item.title}
              categoryId={item.id}
              onSelect={handleSelect}
            ></CatalogMenuItemLink>
          </MenuListItem>
        ))
      }
    </MenuList>
  );
}
