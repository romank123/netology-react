import '../../css/normalize.css';
import '../../css/font-awesome.min.css';
import '../../css/style.css';
import '../../css/style-order.css';
import '../../css/style-catalogue.css';
import '../../css/style-favorite.css';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import FavouriteSitePath from '../FavouriteSitePath/FavouriteSitePath.js';
import CatalogueItem from '../CatalogueItem/CatalogueItem.js';
import Pagination from '../Pagination/Pagination.js';
import FavouriteSortSelect from '../FavouriteSortSelect/FavouriteSortSelect.js';
import FavouriteProductsList from '../FavouriteProductsList/FavouriteProductsList.js';
import FavouriteTitle from '../FavouriteTitle/FavouriteTitle.js';
import withSubscription from '../withSubscription/withSubscription.js';
import withPagination from '../withPagination/withPagination.js';
import withSorting from '../withSorting/withSorting.js';

class FavouriteInitial extends Component {
  constructor(props) {
    super(props);
  }

  static get propTypes() {
    return {
      favourite: PropTypes.array.isRequired
    }
  }

  render() {
    return (
      <div className="wrapper wrapper_favorite">
        <FavouriteSitePath {...this.props} {...this.state} />
        <main className="product-catalogue product-catalogue_favorite">
          <section className="product-catalogue__head product-catalogue__head_favorite">
            <div className="product-catalogue__section-title">
              <h2 className="section-name">В вашем избранном</h2>

              <FavouriteTitle amount={this.props.favourite.length} />

            </div>
            <div className="product-catalogue__sort-by">
              <p className="sort-by">Сортировать</p>

              <FavouriteSortSelect param={this.props.param} onChangeSortType={this.props.onChangeSortType} />

            </div>
          </section>

          <FavouriteProductsList match={this.props.match} favouriteToShow={this.props.favouriteToShow} />

          <Pagination {...this.props} {...this.state} pageClick={this.props.pageClick} arrowClick={this.props.arrowClick} />
        </main>
      </div>
    );
  }
}

const getState = (props, service) => ({
  favourite: service.getValue()
});

const FavouriteWithPagination = withPagination()(FavouriteInitial);
const FavouriteWithSorting = withSorting()(FavouriteWithPagination);
const Favourite = withSubscription(getState)(FavouriteWithSorting);

export default Favourite;
