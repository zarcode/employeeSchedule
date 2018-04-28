import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as moment from 'moment';
import { bindActionCreators } from 'redux';

import { shiftsLoading } from '../actions/shifts';
import { employeesLoading } from '../actions/employees';
import {
  getShifts,
  // getErrorMessage,
  // getLoadingState,
} from '../reducers/shifts';
import { getEmployees } from '../reducers/employees';
import WeekTable from './WeekTable';
import ShiftsCell from './ShiftsCell';

const dateFormat = 'MM-DD-YYYY';
const previewFormat = 'MMM D';
const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']; // @todo move somewhere global

class ShiftTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableStartDate: null,
      employeeFilterValue: null,
    };
  }
  componentDidMount() {
    this.props.actions.employeesLoading();
    this.loadMore(this.props.cDate);
  }
  componentWillReceiveProps(nextProps) {
    // @todo error handling
    if (this.props.errorMessage) {
      alert(this.props.errorMessage);
    }
    if (nextProps.cDate !== this.props.cDate) {
      this.loadMore(nextProps.cDate);
    }
  }
  loadMore = (cDate) => {
    const startDate = moment(cDate, dateFormat).startOf('isoWeek');
    const endDate = moment(cDate, dateFormat).endOf('isoWeek');
    this.setState({ tableStartDate: startDate.format(dateFormat) });
    this.props.actions.shiftsLoading(startDate.valueOf(), endDate.valueOf());
  };
  extractEmployeeKey = function (item) {
    return item.id;
  };
  renderColumnHeader = (columnItem, index) =>
    `${columnItem}, ${moment(this.state.tableStartDate, dateFormat)
      .add(index, 'days')
      .format(previewFormat)}`;
  renderRowHeader = function (rowItem) {
    return rowItem.first_name;
  };
  renderCell = (employee, dayNumber) => {
    const dayShifts = this.props.shifts.filter(shift =>
      parseInt(shift.date, 10) ===
          moment(this.state.tableStartDate, dateFormat)
            .add(dayNumber, 'days')
            .valueOf() && shift.employees.indexOf(employee.id) > -1);

    return <ShiftsCell shifts={dayShifts} />;
  };
  filterEmployees = (e) => {
    this.setState({ employeeFilterValue: e.target.value });
  };
  render() {
    const { cDate } = this.props;
    const prevWeekDate = moment(cDate, dateFormat)
      .subtract(7, 'days')
      .format(dateFormat);
    const nextWeekDate = moment(cDate, dateFormat)
      .add(7, 'days')
      .format(dateFormat);
    const employees = this.props.employees.filter((x) => {
      if (this.state.employeeFilterValue) {
        return this.state.employeeFilterValue === x.id.toString();
      }
      return true;
    });
    return (
      <div>
        <Link href="overview" to={`/overview/${prevWeekDate}`}>
          Left
        </Link>
        <Link href="overview" to={`/overview/${nextWeekDate}`}>
          Right
        </Link>
        <select name="" id="" onChange={this.filterEmployees}>
          <option value="">All</option>
          {this.props.employees.map(employee => (
            <option key={employee.id} value={employee.id}>
              {`${employee.first_name} ${employee.last_name}`}
            </option>
          ))}
        </select>
        <WeekTable
          rows={employees}
          rowKeyExtractor={this.extractEmployeeKey}
          renderRowHeader={this.renderRowHeader}
          renderColumnHeader={this.renderColumnHeader}
          renderCell={this.renderCell}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const cDate = ownProps.match.params.date || moment().format(dateFormat);
  const startDate = moment(cDate, dateFormat)
    .startOf('isoWeek')
    .valueOf();
  return {
    cDate,
    shifts: getShifts(state, startDate),
    employees: getEmployees(state),
  };
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ shiftsLoading, employeesLoading }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ShiftTable);
