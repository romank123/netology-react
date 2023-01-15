import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_CLEAR,
} from './types';

const initialState = JSON.parse(localStorage.getItem('cart')) || [];

export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case CART_ADD_ITEM: {
      const { item, quantity } = action.payload;
      const found = state.find((o) => (o.item.id === item.id) && (o.item.size === item.size));
      if (found) {
        return state.map((o) => {
          if (o.item.key === found.item.key) return { ...o, quantity: o.quantity + quantity };
          return o;
        });
      }
      return [
        ...state,
        {
          item: { ...item, key: `${item.id}/${item.size}` },
          quantity,
        },
      ];
    }
    case CART_REMOVE_ITEM: {
      const { key, decrement } = action.payload;
      if ((decrement < 1) || (state.find((o) => (o.item.key === key)).quantity <= decrement)) {
        return state.filter((o) => o.item.key !== action.payload.key);
      }
      return state.map((o) => {
        if (o.item.key !== action.payload.key) return { ...o, quantity: o.quantity - decrement };
        return o;
      });
    }
    case CART_CLEAR: {
      return [];
    }
    default:
      return state;
  }
}
