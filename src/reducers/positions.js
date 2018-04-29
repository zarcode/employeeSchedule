import { createSelector } from 'reselect';
import { combineReducers } from 'redux';
import { ACTION } from '../constants';
import type { ReduxState } from './index';

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
    if ('positions' in action.response.entities) {
      // new Set - for unique array merge
      return [...new Set([
        ...state,
        ...Object.keys(action.response.entities.positions)
          // since ids from REST are numbers its better to convert the key value into a number
          .map(x => Number(x)),
      ])];
    }
    return state;
  }
  return state;
};

const positions = combineReducers({
  byId,
  ids,
});

export default positions;

export const getById = (state: ReduxState) => state.positions.byId;

export const getIds = (state: ReduxState) => state.positions.ids;

export const getPositions = createSelector([getIds, getById], (allIds, allbById) =>
  allIds.map(id => allbById[id]));
