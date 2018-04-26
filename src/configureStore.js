// @flow

import logger from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import type { Middleware } from 'redux';

import rootEpic from './epics/';
import appReducer from './reducers';

export default () => {
  const middleWares: Array<Middleware> = [createEpicMiddleware(rootEpic)];

  if (process.env.NODE_ENV) {
    middleWares.push(logger);
  }

  return createStore(appReducer, applyMiddleware(...middleWares));
};