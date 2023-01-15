import '../../css/normalize.css';
import '../../css/font-awesome.min.css';
import '../../css/style.css';
import '../../css/style-catalogue.css';

import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CatalogueSidebarTypes extends Component {
  constructor(props) {
    super(props);
    // для выделения выбранного пункта
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
      fType: PropTypes.string.isRequired,
      filters: PropTypes.object,
      setFilter: PropTypes.func.isRequired
    }
  }

  getTypeElements = (fType) => {
    const { filters } = this.props;
    if (!filters || !filters.type || !filters.type.length) return null;
    const types = filters.type;
    return types.map(type => {
      return (
        <li key={type} >
          <a 
            style={fType === type ? this.activeStyle : null} 
            onClick={this.props.setFilter({name: 'fType', value: type})} 
            href="#"
          >{type}</a>
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
      <section className="sidebar__division">
        <div className="sidebar__catalogue-list">
          <div className="sidebar__division-title">
            <h3>Каталог</h3><div onClick={this.toggleListVisibility} className={isVisible ? 'opener-down' : 'opener-up'} ></div>
          </div>
          <ul style={isVisible ? null : {display: 'none'}} >
            {this.getTypeElements(this.props.fType)}
          </ul>
        </div>
      </section>
    );
  }
}

export default CatalogueSidebarTypes;