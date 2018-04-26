// @flow
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/concat';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/takeUntil';

import { ACTION } from '../constants';
// import * as shiftsActions from '../actions/shifts';
import { asObservable } from './rxUtils';
import api from '../api';

export const loadShifts = (action: Observable<Action>): Observable<Action> => action;

// export const loadShiftsToList = (action: Observable<Action>): Observable<Action> =>
//   action.ofType(ACTION.FETCH_SHIFTS_REQUESTED).mergeMap(() => {
//     const loadingAction = Observable.of(shiftsActions.shiftsLoading());
//     const requestAction = asObservable(api.fetchPhotos({}))
//       .map(data => shiftsActions.shiftsSuccess(data))
//       .catch(e => Observable.of(shiftsActions.shiftsFail(e.message)));
//     return Observable.concat(loadingAction, requestAction)
// .takeUntil(action.filter(futureAction => futureAction.type === ACTION.PHOTOS_REQUESTED));
//   });
