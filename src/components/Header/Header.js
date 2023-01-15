import '../../css/normalize.css';
import '../../css/font-awesome.min.css';
import '../../css/style.css';
import React, { Component } from 'react';

import TopMenu from '../TopMenu/TopMenu.js';
import HeaderMain from '../HeaderMain/HeaderMain.js';
import MainMenu from '../MainMenu/MainMenu.js';
import DroppedMenu from '../DroppedMenu/DroppedMenu.js';

class Header extends Component {
  render() {
    return (
      <header className="header" >
        <TopMenu />
        <HeaderMain history={this.props.history} {...this.props} />
        <MainMenu {...this.props} {...this.state} />
        <DroppedMenu {...this.props} {...this.state} />
      </header>
    );
  }
}

export default Header;
