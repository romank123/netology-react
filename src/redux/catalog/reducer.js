import {
  CATALOG_ITEMS_RECIEVED_COUNT,
  CATALOG_REQUEST,
  CATALOG_FAILURE,
  CATALOG_SUCCESS,
} from './types';

const initialState = {
  loading: false,
  error: null,
  recieveOffset: Number(process.env.REACT_APP_CATALOG_RECIEVE_OFFSET),
  recievedCount: Number(process.env.REACT_APP_CATALOG_RECIEVE_OFFSET),
  items: [],
};

export default function catalogReducer(state = initialState, action) {
  switch (action.type) {
    case CATALOG_ITEMS_RECIEVED_COUNT:
      return { ...state, recievedCount: action.payload };
    case CATALOG_REQUEST: {
      const offset = action.payload && action.payload.offset;
      return {
        ...state,
        items: !offset ? [] : state.items,
        loading: true,
        error: null,
      };
    }
    case CATALOG_FAILURE: {
      const { error } = action.payload;
      return { ...state, loading: false, error };
    }
    case CATALOG_SUCCESS: {
      const items = action.payload;
      return {
        ...state,
        items: [...state.items, ...items],
        recievedCount: items.length,
        loading: false,
        error: null,
      };
    }
    default:
      return state;
  }
}
