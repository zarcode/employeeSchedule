/* @flow */
import { combineReducers } from 'redux';
import shifts from './shifts';
import employees from './employees';

const appReducer = combineReducers({
  shifts,
  employees,
});

export default appReducer;
