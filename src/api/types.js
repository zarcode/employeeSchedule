/* @flow */

export type PromiseCancel<T> = {
  promise: Promise<T>,
  cancel: (reason?: string) => void,
};

export type Position = {
  id: number,
  name: string,
  color: string,
};

export type Employee = {
  id: number,
  first_name: string,
  last_name: string,
  avatar: string,
  position: number, // position id
};

export type Shift = {
  id: number,
  name: string,
  date: string,
  position: number, // position id
  employees: Array<number>, // array of ids
};

export type FetchShiftsParams = {
  orderBy: ?string,
  startAt?: ?string,
  endAt: ?string,
};

export type FetchEmployeesParams = {};

export type ApiMethod<Args, R> = (args: Args) => PromiseCancel<R>;

export interface Api {
  +fetchShifts: ApiMethod<FetchShiftsParams, Array<Shift>>;
  +fetchEmployees: ApiMethod<FetchEmployeesParams, Array<Employee>>;
}
