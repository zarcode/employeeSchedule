import { schema } from 'normalizr';

const employee = new schema.Entity('employees');
const shift = new schema.Entity('shifts', {
  employee,
});

export const shifts = [shift];
