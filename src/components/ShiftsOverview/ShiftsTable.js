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

function getWeekDates(startDate, dateFormat) {
  return weekDays
    .map((day, index) => index)
    .map(index => addDays(new Date(startDate), index))
    .map(date => format(date, dateFormat));
}

class ShiftsTable extends Component<Props> {
  constructor(props: Props) {
    super(props);
    this.today = format(new Date(), APP_FORMAT);
    this.weekDates = getWeekDates(props.startDate, APP_FORMAT);
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.startDate !== this.props.startDate) {
      this.today = format(new Date(), APP_FORMAT);
      this.weekDates = getWeekDates(nextProps.startDate, APP_FORMAT);
    }
  }

  today: string;
  weekDates: Array<string>;

  extractEmployeeKey = (employee: Employee) => employee.id;

  extractDaysKey = (day: string) => day;

  highLightCell = (index: number) => this.today === this.weekDates[index];

  renderColumnHeader = (columnItem: string, index: number) =>
    `${columnItem}, ${getWeekDates(this.props.startDate, PREVIEW_FORMAT)[index]}`;

  renderRowHeader = (employee: Employee) =>
    <EmployeeTableItem employee={employeeToViewModel(employee)} />;

  renderCell = (employee: Employee, dayNumber: number) => {
    const dayShifts = this.props.shifts.filter(shift =>
      shift.date === this.weekDates[dayNumber]
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
