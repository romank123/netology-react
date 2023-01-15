/* eslint-disable import/prefer-default-export */
import {
  CATEGORY_CHANGE_SELECTION,
  CATEGORY_REQUEST,
  CATEGORY_SUCCESS,
} from './types';

export function categoryChangeSelection({ id, selected }) {
  return { type: CATEGORY_CHANGE_SELECTION, payload: { id, selected } };
}

export function categoryRequest() {
  return { type: CATEGORY_REQUEST };
}

export function categorySuccess(value = true) {
  return { type: CATEGORY_SUCCESS, payload: value };
}
