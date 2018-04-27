/* @flow */

import { normalize } from 'normalizr';
import { ACTION } from '../constants';
import type { EmployeesAction } from './actionTypes';
import * as schema from './schema';
import type { Employee } from '../api/types';

export const employeesLoading = (): EmployeesAction =>
  ({
    type: ACTION.FETCH_EMPLOYEES_LOADING,
  });

export const employeesSuccess = (response: Array<Employee>): EmployeesAction =>
  ({
    type: ACTION.FETCH_EMPLOYEES_SUCCESS,
    response: normalize(response, schema.employees),
  });

export const employeesFail = (error: string): EmployeesAction =>
  ({ type: ACTION.FETCH_EMPLOYEES_FAIL, error });
