/* @flow */
import { createSelector } from 'reselect';
import { combineReducers } from 'redux';
import { ACTION } from '../constants';

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
    const oldState = state[action.startDate];
    return {
      ...oldState,
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

// $FlowFixMe
export const getById = state => state.shifts.byId;
// $FlowFixMe
export const getIds = (state, startDate) => state.shifts.ids[startDate];
// $FlowFixMe
export const getIsFetching = state => state.shifts.isFetching;
// $FlowFixMe
export const getErrorMessage = state => state.shifts.errorMessage;

export const getShifts = createSelector(
  [getIds, getById],
  (allIds, allbById) => {
    if (allIds) {
      return allIds.map(id => allbById[id]);
    }
    return [];
  },
);
