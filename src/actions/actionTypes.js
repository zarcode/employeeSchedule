/* @flow */
export type ShiftsAction =
  | {
      type: 'FETCH_SHIFTS_LOADING',
      startDate: string,
      endDate: string,
    }
  | {
      type: 'FETCH_SHIFTS_FAIL',
      error: string,
    }
  | {
      type: 'FETCH_SHIFTS_SUCCESS',
      response: {
        entities: {
          employees: any,
          shifts: any,
        },
        result: Array<number>,
      },
      startDate: string,
    };

export type EmployeesAction =
  | {
      type: 'FETCH_EMPLOYEES_LOADING',
    }
  | {
      type: 'FETCH_EMPLOYEES_FAIL',
      error: string,
    }
  | {
      type: 'FETCH_EMPLOYEES_SUCCESS',
      response: {
        entities: {
          employees: any,
        },
        result: Array<number>,
      },
    };

export type Action = ShiftsAction | EmployeesAction;
