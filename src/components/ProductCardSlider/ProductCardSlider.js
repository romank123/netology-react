import '../../css/normalize.css';
import '../../css/font-awesome.min.css';
import '../../css/style.css';
import '../../css/style-order.css';
import '../../css/style-product-card.css';

import React, { Component } from 'react';
import PropTypes from 'prop-types';


class ProductCardSlider extends Component {
  constructor(props) {
    super(props);
    // массив из трех url для картинок в слайдере (по порядку)
    this.sliderImgs = [];
    this.state = {
      // индекс верхней картинки слайдера в this.props.item.images
      topImgIndex: 0 
    }
  }

  static get propTypes() {
    return {
      item: PropTypes.object.isRequired,
      activeImg: PropTypes.shape({
        index: PropTypes.number.isRequired,
        url: PropTypes.string.isRequired
      })
    }
  }

  updateSliderImgs = (topImgIndex, nextProps) => {
    const images = nextProps.item.images;

    if (!images) return;
    const length = images.length;
    const sliderImgs = [];
    if (!length) return;

    const n = Math.min(3, length);
    
    for (let i = 0; i < n; i++) {
      const index = (topImgIndex + length + i) % length;
      const url = images[index];
      sliderImgs[i] = {
        index: index,
        url: url
      };
    }
    this.sliderImgs = sliderImgs;
    this.setState({ topImgIndex: (topImgIndex + length) % length });
  }

  onClickUp = () => {
    const { topImgIndex } = this.state;
    this.updateSliderImgs(topImgIndex + 1, this.props);
  }

  onClickDown = () => {
    const { topImgIndex } = this.state;
    this.updateSliderImgs(topImgIndex - 1, this.props);
  }

  componentWillReceiveProps(nextProps) {
    const { topImgIndex } = this.state;
    this.updateSliderImgs(topImgIndex, nextProps);
  }

  render() {
    const style_0 = this.sliderImgs[0] ? { backgroundImage: `url(${this.sliderImgs[0].url})` } : undefined;
    const style_1 = this.sliderImgs[1] ? { backgroundImage: `url(${this.sliderImgs[1].url})` } : undefined;
    const style_2 = this.sliderImgs[2] ? { backgroundImage: `url(${this.sliderImgs[2].url})` } : undefined;
    const onClickImg_0 = this.sliderImgs[0] ? this.props.onClickImg(this.sliderImgs[0]) : null;
    const onClickImg_1 = this.sliderImgs[1] ? this.props.onClickImg(this.sliderImgs[1]) : null;
    const onClickImg_2 = this.sliderImgs[2] ? this.props.onClickImg(this.sliderImgs[2]) : null;

    return (
      /* <!-- Слайдер выбранного товара --> */
      <section className="main-screen__favourite-product-slider">
        <div className="favourite-product-slider">
          <div onClick={this.onClickUp} className="favourite-product-slider__arrow favourite-product-slider__arrow_up arrow-up"></div>
          <div onClick={onClickImg_0} style={style_0} className="favourite-product-slider__item favourite-product-slider__item-1" >
            <a></a>
          </div>
          <div onClick={onClickImg_1} style={style_1} className="favourite-product-slider__item favourite-product-slider__item-2" >
            <a></a>
          </div>
          <div onClick={onClickImg_2} style={style_2} className="favourite-product-slider__item favourite-product-slider__item-3" >
              <a></a>
          </div>
          <div onClick={this.onClickDown} className="favourite-product-slider__arrow favourite-product-slider__arrow_down arrow-down"></div>
        </div>
      </section>
    );
  }
}

export default ProductCardSlider;
