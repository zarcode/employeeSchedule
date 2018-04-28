/* @flow */

import React, { Component } from 'react';
import * as moment from 'moment';

import Table from './Table';
import ShiftsCell from './ShiftsCell';
import EmployeeTableItem from './EmployeeTableItem';

import type { Employee, Shift } from '../api/types';

import { DATES } from '../constants';

const { APP_FORMAT, PREVIEW_FORMAT } = DATES;
const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

type Props = {
  startDate: string,
  shifts: Array<Shift>,
  employees: Array<Employee>,
};

class ShiftsTable extends Component<Props> {
  employeeToViewModel = function (employee: Employee) {
    return employee;
  };

  extractEmployeeKey = function (employee: Employee) {
    return employee.id;
  };

  extractDaysKey = function (day: string) {
    return day;
  };

  renderColumnHeader = (columnItem: string, index: number) =>
    `${columnItem}, ${moment(this.props.startDate, APP_FORMAT)
      .add(index, 'days')
      .format(PREVIEW_FORMAT)}`;

  renderRowHeader = function (employee: Employee) {
    return <EmployeeTableItem employee={employee} />;
  };

  renderFirstCell = function () {
    return null;
  };

  renderCell = (employee: Employee, dayNumber: number) => {
    const dayShifts = this.props.shifts.filter(shift =>
      parseInt(shift.date, 10) ===
          moment(this.props.startDate, APP_FORMAT)
            .add(dayNumber, 'days')
            .valueOf() && shift.employees.indexOf(employee.id) > -1);

    return <ShiftsCell shifts={dayShifts} />;
  };
  render() {
    return (
      <Table
        rows={this.props.employees}
        rowKeyExtractor={this.extractEmployeeKey}
        renderRowHeader={this.renderRowHeader}
        columns={weekDays}
        columnKeyExtractor={this.extractDaysKey}
        renderColumnHeader={this.renderColumnHeader}
        renderFirstCell={this.renderFirstCell}
        renderCell={this.renderCell}
      />
    );
  }
}

export default ShiftsTable;
