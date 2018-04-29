/* @flow */
import { createSelector } from 'reselect';
import { combineReducers } from 'redux';
import { ACTION } from '../constants';
import type { ReduxState } from './';

const byId = (state = {}, action) => {
  if (action.type === ACTION.FETCH_SHIFTS_SUCCESS) {
    return {
      ...state,
      ...action.response.entities.shifts,
    };
  }
  return state;
};

const ids = (state = {}, action) => {
  if (action.type === ACTION.FETCH_SHIFTS_SUCCESS) {
    return {
      ...state,
      [action.startDate]: action.response.result,
    };
  }
  return state;
};

const isFetching = (state = false, action) => {
  switch (action.type) {
    case ACTION.FETCH_SHIFTS_LOADING:
      return true;
    case ACTION.FETCH_SHIFTS_SUCCESS:
    case ACTION.FETCH_SHIFTS_FAIL:
      return false;
    default:
      return state;
  }
};

const errorMessage = (state = null, action) => {
  switch (action.type) {
    case ACTION.FETCH_SHIFTS_FAIL:
      return action.error;
    case ACTION.FETCH_SHIFTS_LOADING:
    case ACTION.FETCH_SHIFTS_SUCCESS:
      return null;
    default:
      return state;
  }
};

const shifts = combineReducers({
  byId,
  ids,
  isFetching,
  errorMessage,
});

export default shifts;

export const getById = (state: ReduxState) => state.shifts.byId;

export const getIds = (state: ReduxState, startDate: string) => state.shifts.ids[startDate];

export const getIsFetching = (state: ReduxState) => state.shifts.isFetching;

export const getErrorMessage = (state: ReduxState) => state.shifts.errorMessage;

export const getShifts = createSelector([getIds, getById], (allIds, allbById) => {
  if (allIds) {
    return allIds.map(id => allbById[id]);
  }
  return [];
});
