import '../../css/normalize.css';
import '../../css/font-awesome.min.css';
import '../../css/style.css';
import '../../css/style-catalogue.css';

import React, { Component } from 'react';
import PropTypes from 'prop-types';

const htmlColors = {
  "Черный": '#000000',
  "Бежевый": '#F5F5DC',
  "Серый": '#808080',
  "Бардо": '#FF69B4',
  "Белый": '#FFFFFF',
  "Прозрачный": 'rgba(255, 255, 255, 0.5)',
  "Синий": '#0000FF',
  "Красный": '#DC143C',
  "Темно-салатовый": '#00FA9A',
  "Фиолетовый": '#9400D3',
  "Беж": '#F5F5DC',
  "Оранжевый": '#FFA500',
  "Металлик": '#B0C4DE',
  "Разноцветные": 'rgba(255, 255, 255, 0.1)',
  "Коричневый": '#A52A2A',
  "Серебряный": '#C0C0C0',
  "Черно-белый": 'rgba(255, 255, 255, 0.1)',
  "Розовый": '#FF69B4',
  default: 'rgba(255, 255, 255, 0.1)'
}

class CatalogueSidebarColors extends Component {
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
      fColor: PropTypes.string.isRequired,
      filters: PropTypes.object,
      setFilter: PropTypes.func.isRequired
    }
  }

  getColorElements = (fColor) => {
    const { filters } = this.props;
    if (!filters || !filters.color || !filters.color.length) return null;
    const colors = filters.color;
    return colors.map(color => {
      const colorStyle = {
        backgroundColor: htmlColors[color] || htmlColors.default
      };
      return (
        <li key={color} >
          <a 
            style={fColor === color ? this.activeStyle : null} 
            onClick={this.props.setFilter({name: 'fColor', value: color})} 
            href="#"
          >
            <div style={colorStyle} className="color"></div>
            <span className="color-name">{color}</span>
          </a>
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
        <div className="sidebar__color">
          <div className="sidebar__division-title">
            <h3>Цвет</h3><div onClick={this.toggleListVisibility} className={isVisible ? 'opener-down' : 'opener-up'} ></div>
          </div>
          <ul style={isVisible ? null : {display: 'none'}} >
            {this.getColorElements(this.props.fColor)}
          </ul>
        </div>
      </section>
    );
  }
}

export default CatalogueSidebarColors;