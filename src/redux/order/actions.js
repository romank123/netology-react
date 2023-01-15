import {
  ORDER_SET_PHONE,
  ORDER_SET_ADDRESS,
  ORDER_SUBMIT_REQUEST,
  ORDER_SUBMIT_FAILURE,
  ORDER_SUBMIT_SUCCESS,
  ORDER_RESET,
} from './types';

export function orderSetPhone(value) {
  return { type: ORDER_SET_PHONE, payload: value };
}

export function orderSetAddress(value) {
  return { type: ORDER_SET_ADDRESS, payload: value };
}

export function orderSubmitRequest(data) {
  return { type: ORDER_SUBMIT_REQUEST, payload: data };
}

export function orderSubmitFailure(err) {
  return { type: ORDER_SUBMIT_FAILURE, payload: err };
}

export function orderSubmitSuccess(value = true) {
  return { type: ORDER_SUBMIT_SUCCESS, payload: value };
}

export function orderReset(value = true) {
  return { type: ORDER_RESET, payload: value };
}
