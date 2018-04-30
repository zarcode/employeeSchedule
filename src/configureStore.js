/* @flow */

import { createStore, applyMiddleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { createLogger } from 'redux-logger';
import type { Middleware } from 'redux';
import { loadingBarMiddleware } from 'react-redux-loading-bar';

import rootEpic from './epics/';
import appReducer from './reducers';

export default () => {
  const middleWares: Array<Middleware> = [
    createEpicMiddleware(rootEpic),
    loadingBarMiddleware({
      promiseTypeSuffixes: ['LOADING', 'SUCCESS', 'FAIL'],
    }),
  ];

  if (process.env.NODE_ENV === 'development') {
    const logger = createLogger({
      predicate: (getState, action) => !action.type.includes('loading-bar'), // exclude loading bar actions
    });
    middleWares.push(logger);
  }

  return createStore(appReducer, applyMiddleware(...middleWares));
};
