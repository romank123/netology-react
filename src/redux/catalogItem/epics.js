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

import { CATALOG_ITEM_REQUEST } from './types';

import {
  catalogItemSuccess,
  catalogItemFailure,
} from './actions';

export const catalogItemRequestEpic = (action$) => action$.pipe(
  ofType(CATALOG_ITEM_REQUEST),
  exhaustMap((o) => {
    const id = o.payload;
    return ajax.getJSON(`${process.env.REACT_APP_BACKEND_URL}/items/${id}`).pipe(
      retry(5),
      map((obj) => catalogItemSuccess(obj)),
      catchError((e) => of(catalogItemFailure(e))),
    );
  }),
);
