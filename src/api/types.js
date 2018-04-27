/* @flow */

export type PromiseCancel<T> = {
  promise: Promise<T>,
  cancel: (reason?: string) => void
};

export type Position = {
  name: string,
  color: string,
}

export type Employee = {
  id: number,
  first_name: string,
  last_name: string,
  avatar: string,
  position: Position,
}

export type Shift = {
  id: number,
  name: string,
  date: string,
  position: Position,
  employees: Array<Employee>,
};

export type FetchShiftsParams = {
  startDate: number,
  endDate: number,
};

export type FetchEmployeesParams = {};

export type ApiMethod<Args, R> = (args: Args) => PromiseCancel<R>;

export interface Api {
  +fetchShifts: ApiMethod<FetchShiftsParams, Array<Shift>>;
  +fetchEmployees: ApiMethod<FetchEmployeesParams, Array<Employee>>;
}
