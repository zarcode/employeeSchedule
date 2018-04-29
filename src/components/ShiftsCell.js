/* @flow */

import React from 'react';
import ShiftTableItem from './ShiftTableItem';
import type { Shift, Position } from '../api/types';

const get = require('lodash/get');

type Props = {
  shifts: Array<Shift>,
  positions: { [string]: Position },
};

export type ShiftViewModel = {
  id: number,
  name: string,
  color: string,
}

const ShiftsCell = ({ shifts, positions }: Props) => {
  const shiftToViewModel = (shift: Shift): ShiftViewModel => {
    const positionId = get(shift, 'position', null);
    return ({
      id: shift.id,
      name: get(shift, 'name', ''),
      color: positionId ? get(positions, [positionId, 'color'], '') : '',
      positionName: positionId ? get(positions, [positionId, 'name'], '') : '',
    });
  };

  return (
    <div>
      {shifts.map(shift => (
        <ShiftTableItem
          key={shift.id}
          shift={shiftToViewModel(shift)}
        />
      ))}
    </div>
  );
};

export default ShiftsCell;
