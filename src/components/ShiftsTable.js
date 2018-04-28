import React, { Component } from 'react';
import * as moment from 'moment';
import Table from './Table';
import ShiftsCell from './ShiftsCell';
import { DATES } from '../constants';

const { APP_FORMAT, PREVIEW_FORMAT } = DATES;
const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

class ShiftsTable extends Component {
  extractEmployeeKey = function (employee) {
    return employee.id;
  };
  extractDaysKey = function (day) {
    return day;
  };
  renderColumnHeader = (columnItem, index) =>
    `${columnItem}, ${moment(this.props.startDate, APP_FORMAT)
      .add(index, 'days')
      .format(PREVIEW_FORMAT)}`;
  renderRowHeader = function (rowItem) {
    return rowItem.first_name;
  };
  renderFirstCell = function () {
    return null;
  };
  renderCell = (employee, dayNumber) => {
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
