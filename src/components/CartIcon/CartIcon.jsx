import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import getCartItemsCount from '../../redux/cart/selectors';

function CartIcon({ cartItemsCount }) {
  return (
    <Link to="/cart">
      <div className="header-controls-pic header-controls-cart">
        {(cartItemsCount > 0) && <div className="header-controls-cart-full">{cartItemsCount}</div>}
        <div className="header-controls-cart-menu" />
      </div>
    </Link>
  );
}

CartIcon.defaultProps = {
  cartItemsCount: 0,
};

CartIcon.propTypes = {
  cartItemsCount: PropTypes.number,
};

const mapStateToProps = (state) => ({ cartItemsCount: getCartItemsCount(state) });

export default connect(mapStateToProps)(CartIcon);
