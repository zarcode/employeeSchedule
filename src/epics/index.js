import { combineEpics } from 'redux-observable';
import { loadShifts } from './shifts';

export default combineEpics(loadShifts);
