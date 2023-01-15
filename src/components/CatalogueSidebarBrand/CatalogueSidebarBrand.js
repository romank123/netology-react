import '../../css/normalize.css';
import '../../css/font-awesome.min.css';
import '../../css/style.css';
import '../../css/style-catalogue.css';

import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CatalogueSidebarBrand extends Component {
  constructor(props) {
    super(props);
    this.activeStyle = {
      border: '2px solid lightskyblue',
      borderRadius: '4px'
    };

    this.state = {
      isVisible: true
    }
  }

  static get propTypes() {
    return {
      fBrand: PropTypes.string.isRequired,
      filters: PropTypes.object,
      setFilter: PropTypes.func.isRequired
    }
  }

  getBrandElements = (fBrand) => {
    const { filters } = this.props;
    if (!filters || !filters.brand || !filters.brand.length) return null;
    const brands = filters.brand;
    return brands.map(brand => {
      return (
        <li key={brand} >
          <a 
            style={fBrand === brand ? this.activeStyle : null} 
            onClick={this.props.setFilter({name: 'fBrand', value: brand})} 
          >{brand}</a>
        </li>
      );
    });
  }

  toggleListVisibility = () => {
    this.setState({ isVisible: !this.state.isVisible });
  }

  render() {
    const { isVisible } = this.state;
    return (
      <div className="sidebar__brand">
        <div className="sidebar__division-title">
          <h3>Бренд</h3><div onClick={this.toggleListVisibility} className={isVisible ? 'opener-down' : 'opener-up'} ></div>
        </div>
        <ul style={isVisible ? null : {display: 'none'}} >
          {this.getBrandElements(this.props.fBrand)}
        </ul>
      </div>
    );
  }
}

export default CatalogueSidebarBrand;