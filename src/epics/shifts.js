/* @flow */
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/of';
// import 'rxjs/add/observable/concat';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/takeUntil';

import { ACTION } from '../constants';
import type { Action } from '../actions/actionTypes';
import * as shiftsActions from '../actions/shifts';
import { asObservable } from './rxUtils';
import api from '../api';

export const loadShifts = (action: Observable<Action>): Observable<Action> =>
  action.ofType(ACTION.FETCH_SHIFTS_LOADING).mergeMap((a) => {
    // const loadingAction = Observable.of(shiftsActions.shiftsLoading());
    const requestAction = asObservable(api
      .fetchShifts({ startDate: a.startDate, endDate: a.endDate }))
      .map(data => shiftsActions.shiftsSuccess(data, a.startDate))
      .catch(e => Observable.of(shiftsActions.shiftsFail(e.message)));
    return requestAction.takeUntil(action
      .filter(futureAction => futureAction.type === ACTION.FETCH_SHIFTS_LOADING));
  });
