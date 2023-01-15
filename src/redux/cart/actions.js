import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_CLEAR,
} from './types';

export function cartAddItem({ item, quantity = 1 }) {
  return { type: CART_ADD_ITEM, payload: { item, quantity } };
}

export function cartRemoveItem({ key, decrement = 0 }) {
  return { type: CART_REMOVE_ITEM, payload: { key, decrement } };
}

export function cartClear() {
  return { type: CART_CLEAR, payload: true };
}
