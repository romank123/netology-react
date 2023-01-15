import '../../css/normalize.css';
import '../../css/font-awesome.min.css';
import '../../css/style.css';
import '../../css/style-order.css';
import '../../css/style-product-card.css';
import productMainImg from '../../img/product-card-pics/product-card__favourite-product-pic.png';

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ProductCardSlider from '../ProductCardSlider/ProductCardSlider.js';
import ProductCardPic from '../ProductCardPic/ProductCardPic.js';
import ProductCardInfo from '../ProductCardInfo/ProductCardInfo.js';
import { lsFavourite } from '../../js/localStorage';

class ProductCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeImg: {
        // индекс отображаемой картинки в item.images
        index: 0,
        // url отображаемой картинки
        url: ''
      }
    }
  }

  static get propTypes() {
    return {
      item: PropTypes.object.isRequired
    }
  }

  componentWillReceiveProps(nextProps) {
    const images = nextProps.item.images;
    if ( (images && this.state.activeImg.url === '') || (images && nextProps.item.id !== this.props.item.id) ) {
      const activeImg = {
        index: 0,
        url: images[0]
      }
      this.setState({ activeImg });
    }
  }

  onClickImg = ({ index, url }) => (event) => {
    event.preventDefault();
    const activeImg = { index, url };
    this.setState({ activeImg });
  }

  render() {
    return (
      // {/* <!-- Тело карточки товара --> */}
      <main className="product-card">
        <section className="product-card-content">
          <h2 className="section-name">{this.props.item.title}</h2>
          <section className="product-card-content__main-screen">
            <ProductCardSlider {...this.props} {...this.state} onClickImg={this.onClickImg} />
            <ProductCardPic {...this.props} {...this.state} />
            <ProductCardInfo {...this.props} {...this.state} />
           </section>
        </section>
      </main>
    );
  }
}

export default ProductCard;
