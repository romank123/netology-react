import '../../css/normalize.css';
import '../../css/font-awesome.min.css';
import '../../css/style.css';
import '../../css/style-catalogue.css';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

const MAXPRICE = 60000;

class CatalogueSidebarPrices extends Component {
  constructor(props) {
    super(props);
    // ссылки на объекты DOM
    this.circle1 = null;
    this.circle2 = null;
    this.circleContainer = null;
    this.getRefs = {
      circle1: ref => this.circle1 = ref,
      circle2: ref => this.circle2 = ref,
      circleContainer: ref => this.circleContainer = ref
    };

    // параметр, который мы будем вычитать из event.clientX для получения значения style.left текущего круга
    this.offset = 0;
    // названия класса перетаскиваемого круга
    this.currentCircleClassName = '';
    // пустой элемент для отображения вместо "клона" круга при перетаскивании
    this.blankElement = document.createElement('div');

    this.state = {
      isVisible: true,
      // значение style.left для первого и второго круга
      circle1Left: 0,
      circle2Left: 215
    }
  }

  static get propTypes() {
    return {
      fMaxPrice: PropTypes.number.isRequired,
      fMinPrice: PropTypes.number.isRequired,
      filters: PropTypes.object,
      setFilter: PropTypes.func.isRequired
    }
  }

  componentWillMount() {
    this.updateCirclesPositions(this.props);
  }

  componentWillReceiveProps(nextProps) {
    const { fMinPrice, fMaxPrice } = nextProps;
    if (this.props.fMinPrice !== fMinPrice || this.props.fMaxPrice !== fMaxPrice) {
      this.updateCirclesPositions(nextProps);
    }
  }

  // обновление позиций кругов
  // ширина контейнера 240px, диаметр круга 25px
  updateCirclesPositions = (nextProps) => {
    const { fMinPrice, fMaxPrice } = nextProps;
    const circle1Left = Math.round(215 * fMinPrice / MAXPRICE);
    const circle2Left = Math.round(215 * fMaxPrice / MAXPRICE);
    this.setState({ circle1Left, circle2Left });
  }

  onDragStart = (event) => {
    this.currentCircleClassName = event.currentTarget.className;
    // вычисляем расстояние от левого края окна до левого края слайдера + от левого края круга до точки касания круга указателем мыши
    this.offset = this.circleContainer.getBoundingClientRect().left + (event.clientX - event.currentTarget.getBoundingClientRect().left);
    // выставляем пустой элемент для отображения вместо "клона" круга при перетаскивании
    event.dataTransfer.setDragImage(this.blankElement, 0, 0);
  }

  onDragOver = (event) => {
    event.preventDefault();
    if (this.currentCircleClassName === 'circle-1') {
      // вычисляем новую позицию круга
      let circle1Left = event.clientX - this.offset;
      // circle-1 не может быть выходить влево за пределы контейнера и вправо правее circle-2
      if (circle1Left < 0) circle1Left = 0;
      if (circle1Left > this.state.circle2Left) circle1Left = this.state.circle2Left;
      this.setState({ circle1Left });
    }

    if (this.currentCircleClassName === 'circle-2') {
      // вычисляем новую позицию круга
      let circle2Left = event.clientX - this.offset;
      // circle-2 не может быть выходить вправо за пределы контейнера и влево левее circle-1
      if (circle2Left > 215) circle2Left = 215;
      if (circle2Left < this.state.circle1Left) circle2Left = this.state.circle1Left;
      this.setState({ circle2Left });
    }
  }

  onDragEnd = (event) => {
    if (this.currentCircleClassName === 'circle-1') {
      this.setPriceLimit(this.state.circle1Left, 'fMinPrice');
    }

    if (this.currentCircleClassName === 'circle-2') {
      this.setPriceLimit(this.state.circle2Left, 'fMaxPrice');
    }
  }

  setPriceLimit = (circleLeft, priceType) => {
    const value = Math.round(MAXPRICE * circleLeft / 215);
    this.props.setFilter({ name: priceType, value: +value })();
  }

  toggleListVisibility = () => {
    this.setState({ isVisible: !this.state.isVisible });
  }

  onChangePriceLimit = (event) => {
    const { name, value } = event.currentTarget;
    if (+value > 60000 || +value < 0) return;
    this.props.setFilter({ name, value: +value })(event);
  }

  render() {
    const { isVisible, circle1Left, circle2Left } = this.state;
    return (
      <section className="sidebar__division">
        <div className="sidebar__price">
          <div className="sidebar__division-title">
            <h3>Цена</h3><div onClick={this.toggleListVisibility} className={isVisible ? 'opener-down' : 'opener-up'} ></div>
          </div>
          <div className="price-slider" style={isVisible ? null : {display: 'none'}} >
            <div 
              ref={this.getRefs.circleContainer} 
              onDragOver={this.onDragOver} 
              // onDrop={this.onDrop} 
              className="circle-container"
            >
              <div 
                ref={this.getRefs.circle1} 
                draggable onDragStart={this.onDragStart} 
                onDragEnd={this.onDragEnd} 
                style={{left: `${circle1Left}px`}} 
                className="circle-1" 
              ></div>
              <div className="line-white"></div>
              <div className="line-colored" style={{left: `${circle1Left + 12}px`, right: `${215 - circle2Left + 12}px`}} ></div>
              <div 
                ref={this.getRefs.circle2}
                draggable onDragStart={this.onDragStart} 
                onDragEnd={this.onDragEnd}
                style={{left: `${circle2Left}px`}} 
                className="circle-2"
              ></div>
            </div>
            <div className="counter">
              <input onChange={this.onChangePriceLimit} type="number" name="fMinPrice" className="input-1" value={this.props.fMinPrice} />
              <div className="input-separator"></div>
              <input onChange={this.onChangePriceLimit} type="number" name="fMaxPrice" className="input-2" value={this.props.fMaxPrice} />
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default CatalogueSidebarPrices;