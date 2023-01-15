import '../../css/normalize.css';
import '../../css/font-awesome.min.css';
import '../../css/style.css';
import '../../css/style-order.css';
import '../../css/style-catalogue.css';
import React, { Component } from 'react';

const FavouriteSortSelect = (props) => {
  const { onChangeSortType, param } = props;
  return (
    <select 
      onChange={onChangeSortType} 
      value={param}
      id="sorting" 
      name=""
    >
      <option value="brand">по производителю</option>
      <option value="price">по цене</option>
    </select>
  );
}

export default FavouriteSortSelect;