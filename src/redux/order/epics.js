/* eslint-disable import/prefer-default-export */
import { ofType } from 'redux-observable';
import { of } from 'rxjs';
import { ajax } from 'rxjs/ajax';

import {
  map,
  exhaustMap,
  catchError,
} from 'rxjs/operators';

import { ORDER_SUBMIT_REQUEST } from './types';

import {
  orderSubmitSuccess,
  orderSubmitFailure,
} from './actions';

export const orderRequestEpic = (action$) => action$.pipe(
  ofType(ORDER_SUBMIT_REQUEST),
  exhaustMap((o) => {
    const data = o.payload;
    return ajax({
      url: `${process.env.REACT_APP_BACKEND_URL}/order`,
      method: 'POST',
      headers: {
        'Content-Type': 'Application/JSON',
      },
      body: JSON.stringify(data),
    }).pipe(
      map((obj) => orderSubmitSuccess(obj)),
      catchError((e) => of(orderSubmitFailure(e))),
    );
  }),
);
