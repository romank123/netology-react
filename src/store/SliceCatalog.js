import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  content: [],
  categories: [],
  activeCategoryId: 0,
  search: '',
  offset: 0,
  loading: false,
  error: null,
};

const catalogSlice = createSlice({
  name: 'catalog',
  initialState,
  reducers: {
    fetchCatalogRequest(state) {
      state.loading = true;
      state.error = null;
    },
    fetchCatalogCategoriesSuccess(state, action) {
      state.loading = false;
      state.categories = action.payload;     
    },
    fetchCatalogContentSuccess(state, action) {
      state.loading = false;
      if (state.offset > 0) state.content = [...state.content, ...action.payload];
      if (state.offset <= 0) state.content = action.payload;
      if(action.payload.length < 6) state.offset = -1;
    },
    fetchCatalogFailed(state, action) {
      state.loading = false;
      state.error = action.payload;      
    },
    catalogCategoryChange(state, action) {
      state.activeCategoryId = action.payload;
      state.offset = initialState.offset;
      state.content = initialState.content;
    },
    catalogSearchChange(state, action) {
      state.search = action.payload;
      state.offset = initialState.offset;
      state.content = initialState.content;
    },
    catalogOffsetChange(state) {
      state.offset = state.offset + 6;
    },
  },
});

export const {
  fetchCatalogRequest,
  fetchCatalogCategoriesSuccess,
  fetchCatalogContentSuccess,
  fetchCatalogFailed,
  catalogCategoryChange,
  catalogSearchChange,
  catalogOffsetChange,
} = catalogSlice.actions;

export default catalogSlice.reducer;
