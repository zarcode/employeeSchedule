import React from 'react';

const ShiftsCell = ({ shifts }) => {
  return (
    <div>
      {shifts.map(shift => (
        <div
          key={shift.id}
        >
          {shift.name}
        </div>
      ))}
    </div>
  );
};

export default ShiftsCell;
