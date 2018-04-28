/* @flow */

import { normalize } from 'normalizr';
import { ACTION } from '../constants';
import type { ShiftsAction } from './actionTypes';
import * as schema from './schema';
import type { Shift } from '../api/types';

export const shiftsLoading = (startDate: number, endDate: number): ShiftsAction => ({
  type: ACTION.FETCH_SHIFTS_LOADING,
  startDate,
  endDate,
});

export const shiftsSuccess = (response: Array<Shift>, startDate: number): ShiftsAction => ({
  type: ACTION.FETCH_SHIFTS_SUCCESS,
  response: normalize(response, schema.shifts), // todo fix REST response
  startDate,
});

export const shiftsFail = (error: string): ShiftsAction => ({
  type: ACTION.FETCH_SHIFTS_FAIL,
  error,
});
