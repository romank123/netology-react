import '../../css/normalize.css';
import '../../css/font-awesome.min.css';
import '../../css/style.css';
import '../../css/style-catalogue.css';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CatalogueSidebarSizes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: true
    }
  }

  static get propTypes() {
    return {
      fSizes: PropTypes.array.isRequired,
      filters: PropTypes.object,
      toggleArrayFilter: PropTypes.func.isRequired
    }
  }

  getSizeElements = (fSizes) => {
    const { filters } = this.props;
    if (!filters || !filters.sizes || !filters.sizes.length) return null;
    const sizes = filters.sizes;
    return sizes.map(size => {
      return (
        <li key={size} ><label >
          <input 
            checked={this.isChecked(+size)} 
            onChange={this.props.toggleArrayFilter} 
            value={+size} 
            name='fSizes' 
            type="checkbox" 
            className="checkbox" 
          />
          <span className="checkbox-custom"></span> <span className="label">{size}</span>
        </label></li>
      );
    });
  }

  isChecked = (size) => {
    if (this.props.fSizes.indexOf(+size) !== -1) return true;
    return false;
  }

  toggleListVisibility = () => {
    this.setState({ isVisible: !this.state.isVisible });
  }

  render() {
    const { isVisible } = this.state;
    return (
      <section className="sidebar__division">
        <div className="sidebar__size two-columns">
          <div className="sidebar__division-title">
            <h3>Размер</h3><div onClick={this.toggleListVisibility} className={isVisible ? 'opener-down' : 'opener-up'}></div>
          </div>
          <ul style={isVisible ? null : {display: 'none'}} >
            {this.getSizeElements(this.props.fSizes)}
          </ul>
        </div>
      </section>
    );
  }
}

export default CatalogueSidebarSizes;