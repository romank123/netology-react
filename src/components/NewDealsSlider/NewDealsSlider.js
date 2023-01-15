import '../../css/normalize.css';
import '../../css/font-awesome.min.css';
import '../../css/style.css';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { lsFavourite } from '../../js/localStorage';
import CatalogueItemHeart from '../CatalogueItemHeart/CatalogueItemHeart.js';

class NewDealsSlider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0 // индекс элемента в items, который отображается на центральном слайде
    };
  }

  static get propTypes() {
    return {
      items: PropTypes.array
    }
  }

  static get defaultProps() {
    return {
      items: []
    }
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.currCategoryID !== this.props.currCategoryID) this.setState({ activeIndex: 0 });
  }

  getItem = (index) => {
    const { items } = this.props;
    const length = items.length;
    if (!length) return null;
    index = (index + length) % length;
    return items[index];
  }

  getStyle = (item) => {
    let url = '';
    if (item && item.images[0]) {
      url = item.images[0];
    }
    return { backgroundImage: `url(${url})` };
  }

  getId = (item) => {
    if (!item || !item.id) return '';
    return item.id;
  }

  // перемотка товаров влево и вправо
  onArrowClick = (delta) => () => {
    const { activeIndex } = this.state;
    const { items } = this.props;
    const length = items.length;
    if (!length) return;
    const newIndex = (activeIndex + delta + length) % length;
    this.setState({ activeIndex: newIndex });
  }

  render() {
    const currItem = this.getItem(this.state.activeIndex);
    const prevItem = this.getItem(this.state.activeIndex - 1);
    const nextItem = this.getItem(this.state.activeIndex + 1);

    return (
      <div className="new-deals__slider">
        <div className="new-deals__arrow new-deals__arrow_left arrow" onClick={this.onArrowClick(+1)} ></div>
        <div className="new-deals__product new-deals__product_first" style={this.getStyle(prevItem)} >
          <Link to={`/product/${this.getId(prevItem)}`} />
        </div>

        <div className="new-deals__product new-deals__product_active" style={this.getStyle(currItem)} >
          <Link to={`/product/${this.getId(currItem)}`} />
          <CatalogueItemHeart item={currItem} match={this.props.match} />
        </div>
        <div className="new-deals__product new-deals__product_last" style={this.getStyle(nextItem)} >
          <Link to={`/product/${this.getId(nextItem)}`} />
        </div>
        <div className="new-deals__arrow new-deals__arrow_right arrow" onClick={this.onArrowClick(-1)} ></div>
      </div>
    );
  }
}

export default NewDealsSlider;
