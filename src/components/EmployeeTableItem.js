import React from 'react';
import type { Employee } from '../api/types';

const EmployeeTableItem = ({ employee }: Employee) =>
  (
    <div>{employee.first_name}</div>
  );

export default EmployeeTableItem;
