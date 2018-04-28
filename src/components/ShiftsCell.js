/* @flow */

import React from 'react';
import type { Shift } from '../api/types';

type Props = {
  shifts: Array<Shift>,
};
const ShiftsCell = ({ shifts }: Props) => (
  <div>{shifts.map(shift => <div key={shift.id}>{shift.name}</div>)}</div>
);

export default ShiftsCell;
