import '../../css/normalize.css';
import '../../css/font-awesome.min.css';
import '../../css/style.css';
import React, { Component } from 'react';

import { lsFavourite } from '../../js/localStorage.js';

const withSubscription = (getState, getProps) => ComponentInitial => class FetchedComponent extends Component {
  constructor(props) {
    super(props);
    this.state = getState(props, lsFavourite);
  }

  componentDidMount() {
    this.unsubscribe = lsFavourite.subscribe(() => this.setState(getState(this.props, lsFavourite)));
  }

  componentWillReceiveProps(nextProps) {
    this.setState(getState(nextProps, lsFavourite));
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    if (getProps) return <ComponentInitial 
      {...this.props}
      {...this.state}
      {...getProps(this.props, lsFavourite)}
    />;
    
    return <ComponentInitial 
      {...this.props}
      {...this.state}
    />;
  }
};

export default withSubscription;
