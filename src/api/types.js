// @flow

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
  startDate: string,
  endDate: string,
};

export type ApiMethod<Args, R> = (args: Args) => PromiseCancel<R>;

export interface Api {
  +fetchPhotos: ApiMethod<FetchShiftsParams, Array<Shift>>;
}
