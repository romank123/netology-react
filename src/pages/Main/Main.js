import React from 'react';
import Topsales from '../../components/topsales/Topsales';
import Catalog from '../Catalog/Catalog';
/** 
 * Главная страница
 * Отображение разделов "Читы продаж" и "Каталог"
*/
export default function Main() {
  return (
    <>
      <Topsales />
      <Catalog nosearch={true} />
    </>
  );
}
