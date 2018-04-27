import { schema } from 'normalizr';

const employee = new schema.Entity('employees');
export const employees = [employee];

const shift = new schema.Entity('shifts', {
  employees,
});

export const shifts = [shift];
