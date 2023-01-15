import '../../css/normalize.css';
import '../../css/font-awesome.min.css';
import '../../css/style.css';
import React, { Component } from 'react';
import ReactRouterDOM, { HashRouter as Router, Route, Link, NavLink, Switch } from 'react-router-dom';

import MainPageSlider from '../MainPageSlider/MainPageSlider.js';
import NewDeals from '../NewDeals/NewDeals.js';
import SalesAndNews from '../SalesAndNews/SalesAndNews.js';
import AboutUs from '../AboutUs/AboutUs.js';

class MainPage extends Component {
  render() {
    return (
      <div>
        <MainPageSlider />
        <NewDeals {...this.props} />
        <SalesAndNews />
        <AboutUs />
      </div>
    );
  }
}

export default MainPage;
