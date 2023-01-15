import {
  CATEGORY_CHANGE_SELECTION,
  CATEGORY_SUCCESS,
} from './types';

const initialState = [];

export default function categoryReducer(state = initialState, action) {
  switch (action.type) {
    case CATEGORY_CHANGE_SELECTION: {
      const { id, selected } = action.payload;
      const newState = state.map((o) => {
        if (o.id === id) return { ...o, selected };
        return o;
      });
      return newState;
    }
    case CATEGORY_SUCCESS: {
      const items = action.payload;
      return items;
    }
    default:
      return state;
  }
}
