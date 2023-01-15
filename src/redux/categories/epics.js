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

import { CATEGORY_REQUEST } from './types';

import {
  categorySuccess,
} from './actions';

export const categoryRequestEpic = (action$) => action$.pipe(
  ofType(CATEGORY_REQUEST),
  exhaustMap(() => ajax.getJSON(`${process.env.REACT_APP_BACKEND_URL}/categories`).pipe(
    retry(5),
    map((o) => categorySuccess(o)),
    catchError((e) => of(e)),
  )),
);
