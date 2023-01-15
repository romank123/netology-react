import {
  TOP_SALES_REQUEST,
  TOP_SALES_FAILURE,
  TOP_SALES_SUCCESS,
} from './types';

export function topSalesRequest() {
  return { type: TOP_SALES_REQUEST };
}

export function topSalesFailure(value = true) {
  return { type: TOP_SALES_FAILURE, payload: value };
}

export function topSalesSuccess(value = true) {
  return { type: TOP_SALES_SUCCESS, payload: value };
}
