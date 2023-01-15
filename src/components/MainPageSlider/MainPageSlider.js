import '../../css/normalize.css';
import '../../css/font-awesome.min.css';
import '../../css/style.css';
import sliderImg from '../../img/slider.jpg';
import slider180degImg from '../../img/slider180deg.jpeg';
import React, { Component } from 'react';

import { slider, sliderStop } from '../../js/slider.js';

class MainPageSlider extends Component {
  constructor(props) {
    super(props);

    this.refsDict = {
      slider: null,
      sliderImages: [],
      sliderCircles: [],
      sliderArrows: []
    };

    this.getRefs = {
      slider: (ref) => this.refsDict.slider = ref,
      sliderImage: (ref) => this.refsDict.sliderImages.push(ref),
      sliderCircle: (ref) => this.refsDict.sliderCircles.push(ref),
      sliderArrow: (ref) => this.refsDict.sliderArrows.push(ref)
    };
  }

  componentDidMount() {
    //Слайдер
    var f = this.refsDict.slider,
    a = this.refsDict.sliderImages,
    button = this.refsDict.sliderCircles,
    arrows = this.refsDict.sliderArrows;
    slider(f, a, button, '4000', '1000', arrows);
  }

  componentWillUnmount() {
    // остановка анимации слайдера
    sliderStop();
  }
  
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <section className="slider">
        <div className="wrapper">
          <div ref={this.getRefs.slider} className="slider__pictures">
            <a ref={this.getRefs.sliderImage} className="slider__image" href="#">
              <img src={sliderImg} alt="slide picture" />
            </a>
            <a ref={this.getRefs.sliderImage} className="slider__image" href="#">
              <img src={slider180degImg} alt="slide picture" />
            </a>
            <a ref={this.getRefs.sliderImage} className="slider__image" href="#">
              <img src={sliderImg} alt="slide picture" />
            </a>
            <a ref={this.getRefs.sliderImage} className="slider__image" href="#">
              <img src={slider180degImg} alt="slide picture" />
            </a>
            <div ref={this.getRefs.sliderArrow} className="arrow slider__arrow slider__arrow_left"></div>
            <div ref={this.getRefs.sliderArrow} className="arrow slider__arrow slider__arrow_right"></div>
            <div className="slider__circles">
              <button ref={this.getRefs.sliderCircle} className="slider__circle" value="0"></button>
              <button ref={this.getRefs.sliderCircle} className="slider__circle" value="1"></button>
              <button ref={this.getRefs.sliderCircle} className="slider__circle" value="2"></button>
              <button ref={this.getRefs.sliderCircle} className="slider__circle" value="3"></button>
            </div>
            <h2 className="h2">К весне готовы!</h2>
          </div>
        </div>
      </section>
    );
  }
}

export default MainPageSlider;
