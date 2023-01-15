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

import { CATALOG_REQUEST } from './types';

import {
  catalogSuccess,
  catalogFailure,
} from './actions';

export const catalogRequestEpic = (action$) => action$.pipe(
  ofType(CATALOG_REQUEST),
  exhaustMap((o) => {
    const categoryId = o.payload && o.payload.categoryId;
    const offset = o.payload && o.payload.offset;
    const q = o.payload && o.payload.q;
    const urlParams = new URLSearchParams();
    if (categoryId) urlParams.set('categoryId', categoryId);
    if (offset) urlParams.set('offset', offset);
    if (q && (q !== '')) urlParams.set('q', q);
    return ajax.getJSON(`${process.env.REACT_APP_BACKEND_URL}/items?${urlParams.toString()}`).pipe(
      retry(5),
      map((obj) => catalogSuccess(obj)),
      catchError((e) => of(catalogFailure(e))),
    );
  }),
);
