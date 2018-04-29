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
      ...action.response.entities.employees,
    };
  }
  return state;
};

const ids = (state = [], action) => {
  if (action.type === ACTION.FETCH_EMPLOYEES_SUCCESS) {
    return [...state, ...action.response.result];
  }
  return state;
};

const isFetching = (state = false, action) => {
  switch (action.type) {
    case ACTION.FETCH_EMPLOYEES_LOADING:
      return true;
    case ACTION.FETCH_EMPLOYEES_SUCCESS:
    case ACTION.FETCH_EMPLOYEES_FAIL:
      return false;
    default:
      return state;
  }
};

const errorMessage = (state = null, action) => {
  switch (action.type) {
    case ACTION.FETCH_EMPLOYEES_FAIL:
      return action.error;
    case ACTION.FETCH_EMPLOYEES_LOADING:
    case ACTION.FETCH_EMPLOYEES_SUCCESS:
      return null;
    default:
      return state;
  }
};

const employees = combineReducers({
  byId,
  ids,
  isFetching,
  errorMessage,
});

export default employees;

// $FlowFixMe
export const getById = state => state.employees.byId;
// $FlowFixMe
export const getIds = state => state.employees.ids;
// $FlowFixMe
export const getErrorMessage = state => state.employees.errorMessage;

export const getEmployees = createSelector([getIds, getById], (allIds, allbById) =>
  allIds.map(id => allbById[id]));
