/* @flow */
import { combineReducers } from 'redux';
import { loadingBarReducer } from 'react-redux-loading-bar';
import shifts from './shifts';
import employees from './employees';
import positions from './positions';
import type { Shift, Employee, Position } from '../api/types';

export type ShiftsState = {
  byId: {
    [string]: Shift
  },
  ids: {
    [string]: Array<number>
  },
  isFetching: boolean,
  errorMessage: ?string,
}

export type EmployeesState = {
  byId: {
    [string]: Employee
  },
  ids: Array<number>,
  isFetching: boolean,
  errorMessage: ?string,
}

export type PositionsState = {
  byId: {
    [string]: Position
  },
  ids: Array<number>,
}

export type ReduxState = {
  shifts: ShiftsState,
  employees: EmployeesState,
  positions: PositionsState,
  loadingBar: {
    default: 0 | 1,
  }
}

const appReducer = combineReducers({
  shifts,
  employees,
  positions,
  loadingBar: loadingBarReducer,
});

export default appReducer;
