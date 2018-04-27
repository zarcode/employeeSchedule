/* @flow */
export type ShiftsAction =
  {
    type: "FETCH_SHIFTS_REQUESTED",
  } |
  {
    type: "FETCH_SHIFTS_LOADING",
  } |
  {
    type: "FETCH_SHIFTS_FAIL",
    error: string,
  } |
  {
    type: "FETCH_SHIFTS_SUCCESS",
    response: {
      entities: {
        employees: any,
        shifts: any,
      },
      result: Array<number>
    },
    startDate: string,
  }

export type Action = ShiftsAction;
