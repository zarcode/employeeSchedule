/* @flow */

import React, { Component } from 'react';
import format from 'date-fns/format';
import addDays from 'date-fns/add_days';

import Table from '../shared/TimeTable';
import ShiftsCell from './ShiftsCell';
import EmployeeTableItem from './EmployeeTableItem';

import type { Employee, Shift, Position } from '../../api/types';

import { DATE_FORMATS } from '../../constants/index';

const get = require('lodash/get');

const { APP_FORMAT, PREVIEW_FORMAT } = DATE_FORMATS;

const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

type Props = {
  startDate: string,
  shifts: Array<Shift>,
  employees: Array<Employee>,
  positions: { [string]: Position },
};

export type EmployeeViewModel = {
  firstName: string,
  lastName: string,
  avatar: string,
}

function employeeToViewModel(employee: Employee): EmployeeViewModel {
  return {
    firstName: get(employee, 'first_name', ''),
    lastName: get(employee, 'last_name', ''),
    avatar: get(employee, 'avatar', ''),
  };
}

class ShiftsTable extends Component<Props> {
  componentWillUpdate(nextProps: Props) {
    if (nextProps.startDate !== this.props.startDate) {
      this.today = format(new Date(), APP_FORMAT);
    }
  }

  today: string;

  extractEmployeeKey = (employee: Employee) => employee.id;

  extractDaysKey = (day: string) => day;

  highLightCell = (index: number) => this.today ===
      format(addDays(new Date(this.props.startDate), index), APP_FORMAT);// todo can be improved

  renderColumnHeader = (columnItem: string, index: number) =>
    `${columnItem}, ${format(addDays(new Date(this.props.startDate), index), PREVIEW_FORMAT)}`; // todo can be improved

  renderRowHeader = (employee: Employee) =>
    <EmployeeTableItem employee={employeeToViewModel(employee)} />;

  renderCell = (employee: Employee, dayNumber: number) => {
    const dayShifts = this.props.shifts.filter(shift =>
      shift.date ===
      format(addDays(new Date(this.props.startDate), dayNumber), APP_FORMAT) // todo can be improved
      && shift.employees.indexOf(employee.id) > -1);

    return (
      <ShiftsCell
        shifts={dayShifts}
        positions={this.props.positions}
      />);
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
        renderCell={this.renderCell}
        highLightCell={this.highLightCell}
      />
    );
  }
}

export default ShiftsTable;
