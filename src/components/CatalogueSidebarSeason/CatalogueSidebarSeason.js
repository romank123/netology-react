import '../../css/normalize.css';
import '../../css/font-awesome.min.css';
import '../../css/style.css';
import '../../css/style-catalogue.css';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CatalogueSidebarSeason extends Component {
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
      fSeason: PropTypes.string.isRequired,
      filters: PropTypes.object,
      setFilter: PropTypes.func.isRequired
    }
  }

  getSeasonElements = (fSeason) => {
    const { filters } = this.props;
    if (!filters || !filters.season || !filters.season.length) return null;
    const seasons = filters.season;
    return seasons.map(season => {
      return (
        <li key={season} >
          <a 
            style={fSeason === season ? this.activeStyle : null} 
            onClick={this.props.setFilter({name: 'fSeason', value: season})} 
            href="#"
          >{season}</a>
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
        <div className="sidebar__season">
          <div className="sidebar__division-title">
            <h3>Сезон</h3><div onClick={this.toggleListVisibility} className={isVisible ? 'opener-down' : 'opener-up'} ></div>
          </div>
          <ul style={isVisible ? null : {display: 'none'}} >
            {this.getSeasonElements(this.props.fSeason)}
          </ul>
        </div>
      </section>
    );
  }
}

export default CatalogueSidebarSeason;