import { createSelector } from 'reselect';

const getCart = (state) => state.cart;

const getCartItemsCount = createSelector(
  [getCart],
  (cart) => {
    if (cart.length) {
      const result = cart.reduce((acc, cur) => (acc + cur.quantity), 0);
      return result;
    }
    return 0;
  },
);

export default getCartItemsCount;
