import '../../css/normalize.css';
import '../../css/font-awesome.min.css';
import '../../css/style.css';
import '../../css/style-catalogue.css';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CatalogueSidebarHeelSizes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: true
    }
  }

  static get propTypes() {
    return {
      fHeelSizes: PropTypes.array.isRequired,
      filters: PropTypes.object,
      toggleArrayFilter: PropTypes.func.isRequired
    }
  }

  getHeelSizeElements = (fHeelSizes) => {
    const { filters } = this.props;
    if (!filters || !filters.heelSize || !filters.heelSize.length) return null;
    const heelSizes = filters.heelSize;
    return heelSizes.map(heelSize => {
      return (
        <li key={heelSize} ><label >
          <input 
            checked={this.isChecked(+heelSize)} 
            onChange={this.props.toggleArrayFilter} 
            value={heelSize} 
            name='fHeelSizes' 
            type="checkbox" 
            className="checkbox" 
          />
          <span className="checkbox-custom"></span> <span className="label">{heelSize}</span>
        </label></li>
      );
    });
  }

  isChecked = (heelSize) => {
    if (this.props.fHeelSizes.indexOf(+heelSize) !== -1) return true;
    return false;
  }

  toggleListVisibility = () => {
    this.setState({ isVisible: !this.state.isVisible });
  }

  render() {
    const { isVisible } = this.state;
    return (
      <section className="sidebar__division">    
        <div className="sidebar__heel-height two-columns">
          <div className="sidebar__division-title">
            <h3>Размер каблука</h3><div onClick={this.toggleListVisibility} className={isVisible ? 'opener-down' : 'opener-up'}></div>
          </div>
          <ul style={isVisible ? null : {display: 'none'}} >
            {this.getHeelSizeElements(this.props.fHeelSizes)}
          </ul>
        </div>
      </section>
    );
  }
}

export default CatalogueSidebarHeelSizes;