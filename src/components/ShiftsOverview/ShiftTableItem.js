import React from 'react';
import styles from './ShiftTableItem.css';
import type { ShiftViewModel } from './ShiftsCell';

type Props = {
  shift: ShiftViewModel,
};

const ShiftTableItem = ({ shift }: Props) => (
  <div
    className={styles.shiftItem}
    style={{ backgroundColor: shift.color ? shift.color : 'white' }}
  >
    <div>{shift.name}</div>
    <div>{shift.positionName}</div>
  </div>
);

export default ShiftTableItem;
