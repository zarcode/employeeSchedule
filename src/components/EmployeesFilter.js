import React from 'react';

const EmployeesFilter = ({ onChange, employees }) => {
  return (
    <select name="" id="" onChange={onChange}>
      <option value="">All</option>
      {employees.map(employee => (
        <option key={employee.id} value={employee.id}>
          {`${employee.first_name} ${employee.last_name}`}
        </option>
      ))}
    </select>
  );
};

export default EmployeesFilter;
