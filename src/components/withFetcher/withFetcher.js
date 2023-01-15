import '../../css/normalize.css';
import '../../css/font-awesome.min.css';
import '../../css/style.css';
import React, { Component } from 'react';
import ReactRouterDOM, { HashRouter as Router, Route, Link, NavLink, Switch } from 'react-router-dom';

import { fetchData } from '../../js/serverRequest.js';

const withFetcher = ({ url, collName }) => ComponentInitial => class FetchedComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      [collName]: undefined
    };
  }

  fetchData(props) {
    let newURL = url;
    if (typeof url === 'function') {
      newURL = url(props);
    }
    fetchData.doGETRequestForData(newURL)
    // fetch(newURL)
    //   .then(res => res.json())
    //   .then(res => res.status ? res.data : new Error(res.status))
      .then( data => this.setState({[collName]: data}) );
  }

  componentDidMount() {
    this.fetchData(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.match && nextProps.match.params && nextProps.match.params.id && nextProps.match.params.id !== this.props.match.params.id) {
      this.fetchData(nextProps);
    }
  }

  render() {
    return <ComponentInitial {...this.props} {...this.state} />
  }
};

export default withFetcher;
