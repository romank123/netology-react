import {
  TOP_SALES_REQUEST,
  TOP_SALES_FAILURE,
  TOP_SALES_SUCCESS,
} from './types';

const initialState = {
  loading: false,
  error: null,
  items: [],
};

export default function topSalesReducer(state = initialState, action) {
  switch (action.type) {
    case TOP_SALES_REQUEST:
      return { ...state, loading: true, error: null };
    case TOP_SALES_FAILURE: {
      const { error } = action.payload;
      return { ...state, loading: false, error };
    }
    case TOP_SALES_SUCCESS: {
      const items = action.payload;
      return {
        ...state,
        items,
        loading: false,
        error: null,
      };
    }
    default:
      return state;
  }
}
