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
import * as employeesActions from '../actions/employees';
import { asObservable } from './rxUtils';
import api from '../api';

const loadEmployees = (action: Observable<Action>): Observable<Action> =>
  action.ofType(ACTION.FETCH_EMPLOYEES_LOADING).mergeMap(() => {
    // const loadingAction = Observable.of(employeesActions.employeesLoading());
    const requestAction = asObservable(api.fetchEmployees({}))
      .map(data => employeesActions.employeesSuccess(data))
      .catch(e => Observable.of(employeesActions.employeesFail(e.message)));
    return requestAction.takeUntil(action.filter(futureAction => futureAction.type === ACTION.FETCH_EMPLOYEES_LOADING));
  });

export default loadEmployees;
