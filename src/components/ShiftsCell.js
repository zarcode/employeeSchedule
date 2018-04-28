import React from 'react';

const ShiftsCell = ({ shifts }) => <div>{shifts.map(shift => <div key={shift.id}>{shift.name}</div>)}</div>;

export default ShiftsCell;
