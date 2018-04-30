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
import asObservable from './rxUtils';
import api from '../api';
import type { FetchShiftsParams } from '../api/types';

const loadShifts = (action: Observable<Action>): Observable<Action> =>
  action.ofType(ACTION.FETCH_SHIFTS_LOADING).mergeMap((a) => {
    // const loadingAction = Observable.of(shiftsActions.shiftsLoading());
    const requestParams: FetchShiftsParams = {
      orderBy: '"date"',
      startAt: `"${a.startDate}"`,
      endAt: `"${a.endDate}"`,
    };
    const requestAction = asObservable(api
      .fetchShifts(requestParams))
      .map(data => shiftsActions.shiftsSuccess(data, a.startDate))
      .catch(e => Observable.of(shiftsActions.shiftsFail(e.message)));
    return requestAction
      .takeUntil(action
        .filter(futureAction => futureAction.type === ACTION.FETCH_SHIFTS_LOADING));
  });

export default loadShifts;
