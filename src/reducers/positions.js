import { createSelector } from 'reselect';
import { combineReducers } from 'redux';
import { ACTION } from '../constants';

const byId = (state = {}, action) => {
  if (
    action.type === ACTION.FETCH_EMPLOYEES_SUCCESS ||
    action.type === ACTION.FETCH_SHIFTS_SUCCESS
  ) {
    return {
      ...state,
      ...action.response.entities.positions,
    };
  }
  return state;
};

const ids = (state = [], action) => {
  if (
    action.type === ACTION.FETCH_EMPLOYEES_SUCCESS ||
    action.type === ACTION.FETCH_SHIFTS_SUCCESS
  ) {
    // new Set - for unique array merge
    return [...new Set([
      ...state,
      ...Object.keys(action.response.entities.positions)
        // if ids from REST are numbers its better to convert the key value into a number
        .map(x => Number(x)),
    ])];
  }
  return state;
};

const positions = combineReducers({
  byId,
  ids,
});

export default positions;

// $FlowFixMe
export const getById = state => state.positions.byId;
// $FlowFixMe
export const getIds = state => state.positions.ids;

export const getPositions = createSelector([getIds, getById], (allIds, allbById) =>
  allIds.map(id => allbById[id]));
