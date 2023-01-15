import {
  ORDER_SET_PHONE,
  ORDER_SET_ADDRESS,
  ORDER_SUBMIT_REQUEST,
  ORDER_SUBMIT_FAILURE,
  ORDER_SUBMIT_SUCCESS,
  ORDER_RESET,
} from './types';

const initialState = {
  loading: false,
  error: null,
  success: false,
  phone: '',
  address: '',
};

export default function orderReducer(state = initialState, action) {
  switch (action.type) {
    case ORDER_SET_PHONE: {
      return {
        ...state,
        phone: action.payload,
      };
    }
    case ORDER_SET_ADDRESS: {
      return {
        ...state,
        address: action.payload,
      };
    }
    case ORDER_SUBMIT_REQUEST: {
      return {
        ...state,
        data: action.payload,
        loading: true,
        error: null,
      };
    }
    case ORDER_SUBMIT_FAILURE: {
      const { error } = action.payload;
      return { ...state, loading: false, error };
    }
    case ORDER_SUBMIT_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: null,
        success: true,
      };
    }
    case ORDER_RESET: {
      return {
        ...state,
        loading: false,
        error: null,
        success: false,
      };
    }
    default:
      return state;
  }
}
