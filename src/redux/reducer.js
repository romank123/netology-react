import { combineReducers } from 'redux';
import globalSettingsReducer from './globalSettings/reducer';
import categoryReducer from './categories/reducer';
import catalogReducer from './catalog/reducer';
import catalogItemReducer from './catalogItem/reducer';
import topSalesReducer from './topSales/reducer';
import cartReducer from './cart/reducer';
import orderReducer from './order/reducer';
// import imagesReducer from './images/reducer';

const reducer = combineReducers({
  globalSettings: globalSettingsReducer,
  categories: categoryReducer,
  catalog: catalogReducer,
  catalogItem: catalogItemReducer,
  topSales: topSalesReducer,
  cart: cartReducer,
  order: orderReducer,
  // images: imagesReducer,
});

export default reducer;
