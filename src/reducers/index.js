/* @flow */
import { combineReducers } from 'redux';
import shifts from './shifts';
import employees from './employees';
import positions from './positions';

const appReducer = combineReducers({
  shifts,
  employees,
  positions,
});

export default appReducer;
