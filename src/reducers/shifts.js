// @flow
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

const ids = (state = [], action) => {
  if (action.type === ACTION.FETCH_SHIFTS_SUCCESS) {
    return [
      ...state,
      ...action.response.result,
    ];
  }
  return state;
};

const isFetching = (state = false, action) => {
  switch (action.type) {
    case ACTION.FETCH_SHIFTS_REQUESTED:
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
    case ACTION.FETCH_SHIFTS_REQUESTED:
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
export const getById = state => state.photos.byId;
// $FlowFixMe
export const getIds = state => state.photos.ids;
// $FlowFixMe
export const getIsFetching = state => state.photos.isFetching;
// $FlowFixMe
export const getErrorMessage = state => state.photos.errorMessage;

export const getPhotos = createSelector(
  [getIds, getById],
  (allIds, allbById) => allIds.map(id => allbById[id]),
);
