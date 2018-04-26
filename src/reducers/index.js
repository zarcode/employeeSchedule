// @flow
import { combineReducers } from 'redux';
import shifts from './shifts';

const appReducer = combineReducers({
  shifts,
});

export default appReducer;
