import React from 'react';
/** 
 * Кнопка для загрузки следующих товаров каталога
*/
export default function ButtonOffset({ handleOffset }) {
  return (
    <div className="text-center">
      <button
        className="btn btn-outline-primary"
        onClick={() => handleOffset()}
      >
        Загрузить ещё
      </button>
    </div>
  );
}
