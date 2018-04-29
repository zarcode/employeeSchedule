import { schema } from 'normalizr';

const position = new schema.Entity('positions');

const employee = new schema.Entity('employees', {
  position,
});
export const employees = [employee];

const shift = new schema.Entity('shifts', {
  employees,
});

export const shifts = [shift];
