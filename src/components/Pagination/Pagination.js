import '../../css/normalize.css';
import '../../css/font-awesome.min.css';
import '../../css/style.css';
import '../../css/style-order.css';
import '../../css/style-catalogue.css';
import '../../css/style-favorite.css';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';

class Pagination extends Component {
  static get propTypes() {
    return {
      // активная страница пагинации
      page: PropTypes.number.isRequired,
      // общее количество страниц пагинации
      amount: PropTypes.number.isRequired,
      pageClick: PropTypes.func.isRequired,
      arrowClick: PropTypes.func.isRequired
    }
  }

  getPagesArray() {
    const { page, amount } = this.props;
    const arr = Array(amount)
      .fill(null)
      .map((item, i) => i + 1)
      .filter(number => number === 1 || number === amount || ( ((page - 3) < number) && (number < (page + 3)) ));

      if (amount < 5) return arr;
      if (page > 4) arr.splice(1, 0, '...');
      if (page < (amount - 3)) arr.splice((arr.length - 1), 0, '...');
      return arr;
  }

  getPages(arr) {
    return arr
      .map(page => {
        if (typeof page === 'number') {
          return <li key={page} className={page === this.props.page ? 'active' : ''} ><a onClick={this.props.pageClick(page)} >{page}</a></li>
        } else {
          return <li key={shortid.generate()} >{page}</li>
        }
      });
  }

  render() {
    return (
      <div className="product-catalogue__pagination">
        <div className="page-nav-wrapper">
          <div className="angle-back"><a onClick={this.props.arrowClick(-1)} href="#"></a></div>
          <ul>
            {this.getPages(this.getPagesArray())}
          </ul>
          <div className="angle-forward"><a onClick={this.props.arrowClick(+1)} href="#"></a></div>
        </div>
      </div>
    );
  }
}

export default Pagination;