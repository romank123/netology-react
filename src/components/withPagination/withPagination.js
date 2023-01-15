import React, { Component } from 'react';
import PropTypes from 'prop-types';

// количество товаров на странице
const PAGECAPACITY = 12;

const withPagination = () => ComponentInitial => class FetchedComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // активная страница пагинации
      page: 1,
      // общее количество страниц пагинации
      amount:1,
      // текущее количество товаров в Избранном
      favorLength: 0
    };
  }

  static get propTypes() {
    return {
      favourite: PropTypes.array.isRequired
    }
  }

  componentWillMount() {
    const { favourite } = this.props;
    // запоминаем текущее количество товаров в Избранном
    this.setState({ favorLength: favourite.length });
    this.updatePageAmount(favourite); 
  }

  componentWillReceiveProps(nextProps) {
    const { favourite } = nextProps;
    // сравниваем количество товаров в Избранном при предыдущем обновлении с текущим
    if (this.state.favorLength === favourite.length) return;
    this.setState({ favorLength: favourite.length });
    this.updatePageAmount(favourite);
  }

  updatePageAmount = (favourite) => {
    // console.log('обновляю PageAmount');
    const amount = Math.ceil(favourite.length / PAGECAPACITY);
    const { page } = this.state;
    if (page > amount) {
      this.setState({ page: amount });
    }
    this.setState({ amount });
  }

  getFavouriteToShow = () => {
    const { page } = this.state;
    const { favourite } = this.props;
    return favourite.slice((page - 1) * PAGECAPACITY, page * PAGECAPACITY);
  }

  pageClick = (page) => (event) => {
    event.preventDefault();
    this.setState({ page });
  }

  arrowClick = (delta) => (event) => {
    event.preventDefault();
    const newPageNumber = this.state.page + delta;
    if (newPageNumber < 1 || newPageNumber > this.state.amount) return;
    this.setState({ page: newPageNumber });
  }

  render() {
    return <ComponentInitial 
      {...this.props}
      {...this.state}
      favouriteToShow={this.getFavouriteToShow()}
      pageClick={this.pageClick}
      arrowClick={this.arrowClick}
    />;
  }
};

export default withPagination;
