/* @flow */
import { combineReducers } from 'redux';
import { loadingBarReducer } from 'react-redux-loading-bar';
import shifts from './shifts';
import employees from './employees';
import positions from './positions';

const appReducer = combineReducers({
  shifts,
  employees,
  positions,
  loadingBar: loadingBarReducer,
});

export default appReducer;
