import { combineEpics } from 'redux-observable';
import { topSalesRequestEpic } from './topSales/epics';
import { catalogRequestEpic } from './catalog/epics';
import { categoryRequestEpic } from './categories/epics';
import { catalogItemRequestEpic } from './catalogItem/epics';
import { cartEpic } from './cart/epics';
import { orderRequestEpic } from './order/epics';
// import { imagesRequestEpic } from './images/epics';

const epic = combineEpics(
  topSalesRequestEpic,
  catalogRequestEpic,
  categoryRequestEpic,
  catalogItemRequestEpic,
  cartEpic,
  orderRequestEpic,
  // imagesRequestEpic,
);

export default epic;
