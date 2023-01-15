import '../../css/normalize.css';
import '../../css/font-awesome.min.css';
import '../../css/style.css';
import '../../css/style-order.css';
import '../../css/style-product-card.css';

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class ProductsOverlooked extends Component {
  constructor(props) {
    super(props);
    // массив из 5 товаров (из числа "просмотренных товаров"), которые в данный момент отображены на странице
    this.shownItems = [];
    this.state = {
      // индекс товара в массиве "просмотренных товаров", который будет отражаться первым (с левой стороны) в слайдере
      actIndex: 0
    }
  }

  static get propTypes() {
    return {
      perused: PropTypes.array.isRequired
    }
  }

  componentWillMount() {
    this.updateShownItems(this.props, this.state);
  }

  componentWillUpdate(nextProps, nextState) {
    this.updateShownItems(nextProps, nextState);
  }

  updateShownItems = (props, state) => {
    const { actIndex } = state;
    const { perused } = props;
    const length = perused.length;
    if (!length) return;
    // заполняем все 5 мест под картинки на слайдере
    for (let i = 0; i < 5; i++) {
      const index = (actIndex + i) % length;
      this.shownItems[i] = perused[index];
    }

    // если просмотрено меньше 5 товаров, обрезаем повторяющиеся
    if (length < 5) {
      this.shownItems.splice(length);
    }
  }

  getStyle = (item) => {
    return item ? { backgroundImage: `url(${item.images[0]})` } : undefined;
  }

  getId = (item) => {
    return item ? item.id : this.props.match.params.id;
  }

  arrowClick = (delta) => (event) => {
    const { actIndex } = this.state;
    const { perused } = this.props;
    const length = perused.length;
    if (!length) return;
    const newIndex = (actIndex + length + delta) % length;
    this.setState({ actIndex: newIndex });
  }

  render() {
    if (!this.props.perused) return null;
    return (
      // <!-- Слайдер "Вы смотрели" -->     
      <section className="product-card__overlooked-slider">
        <h3>Вы смотрели:</h3>
        <div className="overlooked-slider">
          <div onClick={this.arrowClick(+1)} className="overlooked-slider__arrow overlooked-slider__arrow_left arrow"></div>
          <div className="overlooked-slider__item" style={this.getStyle(this.shownItems[0])} >
            <Link to={`/product/${this.getId(this.shownItems[0])}`} />
          </div>
          <div className="overlooked-slider__item" style={this.getStyle(this.shownItems[1])} >
            <Link to={`/product/${this.getId(this.shownItems[1])}`} />
          </div>
          <div className="overlooked-slider__item" style={this.getStyle(this.shownItems[2])} >
            <Link to={`/product/${this.getId(this.shownItems[2])}`} />
          </div>
          <div className="overlooked-slider__item" style={this.getStyle(this.shownItems[3])} >
            <Link to={`/product/${this.getId(this.shownItems[3])}`} />
          </div>
          <div className="overlooked-slider__item" style={this.getStyle(this.shownItems[4])} >
            <Link to={`/product/${this.getId(this.shownItems[4])}`} />
          </div>
          <div onClick={this.arrowClick(-1)} className="overlooked-slider__arrow overlooked-slider__arrow_right arrow"></div>
        </div>
      </section>
    );
  }
}

export default ProductsOverlooked;
