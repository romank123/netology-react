/* eslint-disable import/prefer-default-export */
import { ofType } from 'redux-observable';
import { of } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import {
  map,
  exhaustMap,
  retry,
  catchError,
} from 'rxjs/operators';
import { TOP_SALES_REQUEST } from './types';
import {
  topSalesSuccess,
  topSalesFailure,
} from './actions';

export const topSalesRequestEpic = (action$) => action$.pipe(
  ofType(TOP_SALES_REQUEST),
  exhaustMap(() => ajax.getJSON(`${process.env.REACT_APP_BACKEND_URL}/top-sales`).pipe(
    retry(5),
    map((o) => topSalesSuccess(o)),
    catchError((e) => of(topSalesFailure(e))),
  )),
);
