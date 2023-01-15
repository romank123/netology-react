import '../../css/normalize.css';
import '../../css/font-awesome.min.css';
import '../../css/style.css';
import '../../css/style-order.css';
import '../../css/style-product-card.css';

import React, { Component } from 'react';
import PropTypes from 'prop-types';


class ProductCardPic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // дополнительный класс для фотографии товара при увеличинии
      imgClassName: ''
    }
  }

  static get propTypes() {
    return {
      activeImg: PropTypes.shape({
        index: PropTypes.number.isRequired,
        url: PropTypes.string.isRequired
      })
    }
  }

  // модальное окно
  onMainImgClick = (event) => {
    event.preventDefault();
    if (this.state.imgClassName) {
      this.setState({ imgClassName: '' })
    } else {
      this.setState({ imgClassName: 'double-size' })
    }
  }

  render() {
    return (
      // <!-- Изображение выбранного товара -->
      <div className="main-screen__favourite-product-pic">
        <a onClick={this.onMainImgClick} >
          <img src={this.props.activeImg.url} alt="" className={this.state.imgClassName} />
        </a>
        <a onClick={this.onMainImgClick} className="main-screen__favourite-product-pic__zoom"></a>
      </div>
    );
  }
}

export default ProductCardPic;
