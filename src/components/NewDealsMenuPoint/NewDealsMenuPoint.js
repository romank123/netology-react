import '../../css/normalize.css';
import '../../css/font-awesome.min.css';
import '../../css/style.css';
import React, { Component } from 'react';

class NewDealsMenuPoint extends Component {
  render() {
    const { id, currCategoryID, onClick, title } = this.props;
    const chosenPointClassName = currCategoryID === id ? ' new-deals__menu-item_active' : '';
    const pointClassName = 'new-deals__menu-item' + chosenPointClassName;

    return (
      <li className={pointClassName} >
        <a onClick={onClick} >{title}</a>
      </li>
    );
  }
}

export default NewDealsMenuPoint;
