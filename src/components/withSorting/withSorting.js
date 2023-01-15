import React, { Component } from 'react';
import PropTypes from 'prop-types';

const withSorting = () => ComponentInitial => class FetchedComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      param: 'brand'
    };
  }

  static get propTypes() {
    return {
      favourite: PropTypes.array.isRequired
    }
  }

  onChangeSortType = (event) => {
    const param = event.currentTarget.value;
    const { favourite } = this.props;
    if (!favourite.length || !favourite[0][param]) return;
    this.setState({ param });
    favourite.sort((item1, item2) => {
      if (item1[param] > item2[param]) return 1;
      return -1;
    });
  }

  render() {
    return <ComponentInitial 
      {...this.props}
      {...this.state}
      onChangeSortType={this.onChangeSortType}
    />;
  }
};

export default withSorting;
