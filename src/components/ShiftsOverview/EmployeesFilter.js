/* @flow */

import React from 'react';
import type { Employee } from '../api/types';

type Props = {
  onChange: (e: SyntheticInputEvent<HTMLInputElement>) => void,
  employees: Array<Employee>,
};
const EmployeesFilter = ({ onChange, employees }: Props) => (
  <select name="employee" id="employee" onChange={onChange}>
    <option value="">All</option>
    {employees.map(employee => (
      <option key={employee.id} value={employee.id}>
        {`${employee.first_name} ${employee.last_name}`}
      </option>
    ))}
  </select>
);

export default EmployeesFilter;
