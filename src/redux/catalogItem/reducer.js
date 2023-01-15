import {
  CATALOG_ITEM_SET_QUANTITY,
  CATALOG_ITEM_SELECT_SIZE,
  CATALOG_ITEM_REQUEST,
  CATALOG_ITEM_FAILURE,
  CATALOG_ITEM_SUCCESS,
} from './types';

const initialState = {
  loading: false,
  error: null,
  item: null,
  quantity: 1,
  selectedSize: 0,
};

export default function catalogItemReducer(state = initialState, action) {
  switch (action.type) {
    case CATALOG_ITEM_SET_QUANTITY: {
      return {
        ...state,
        quantity: action.payload,
      };
    }
    case CATALOG_ITEM_SELECT_SIZE: {
      return {
        ...state,
        selectedSize: action.payload,
      };
    }
    case CATALOG_ITEM_REQUEST: {
      return {
        ...state,
        item: null,
        loading: true,
        error: null,
      };
    }
    case CATALOG_ITEM_FAILURE: {
      const { error } = action.payload;
      return { ...state, loading: false, error };
    }
    case CATALOG_ITEM_SUCCESS: {
      const item = action.payload;
      return {
        ...state,
        item,
        loading: false,
        error: null,
      };
    }
    default:
      return state;
  }
}
