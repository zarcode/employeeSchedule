import { combineEpics } from 'redux-observable';
import loadShifts from './shifts';
import loadEmployees from './employees';

export default combineEpics(loadShifts, loadEmployees);
