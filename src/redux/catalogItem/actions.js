import {
  CATALOG_ITEM_SET_QUANTITY,
  CATALOG_ITEM_SELECT_SIZE,
  CATALOG_ITEM_REQUEST,
  CATALOG_ITEM_FAILURE,
  CATALOG_ITEM_SUCCESS,
} from './types';

export function catalogItemSetQuantity(quantity) {
  return { type: CATALOG_ITEM_SET_QUANTITY, payload: quantity };
}

export function catalogItemSelectSize(index) {
  return { type: CATALOG_ITEM_SELECT_SIZE, payload: index };
}

export function catalogItemRequest(id) {
  return { type: CATALOG_ITEM_REQUEST, payload: id };
}

export function catalogItemFailure(value = true) {
  return { type: CATALOG_ITEM_FAILURE, payload: value };
}

export function catalogItemSuccess(value = true) {
  return { type: CATALOG_ITEM_SUCCESS, payload: value };
}
