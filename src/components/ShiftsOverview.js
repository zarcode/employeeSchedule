/* @flow */

import React, { Component } from 'react';
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

import ShiftsTable from './ShiftsTable';
import TableNavigation from './TableNavigation';
import EmployeesFilter from './EmployeesFilter';

import { DATES } from '../constants';

import type { Employee, Shift } from '../api/types';

import styles from './ShiftsOverview.css';

const { APP_FORMAT } = DATES;

type Props = {
  cDate: string,
  shifts: Array<Shift>,
  employees: Array<Employee>,
  errorMessage: string,
  actions: {
    employeesLoading: () => void,
    shiftsLoading: (startDate: number, endDate: number) => void,
  },
};

type State = {
  tableStartDate: string,
  employeeFilterValue: string,
};

class ShiftsOverview extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      tableStartDate: '',
      employeeFilterValue: '',
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
    const startDate = moment(cDate, APP_FORMAT).startOf('isoWeek');
    const endDate = moment(cDate, APP_FORMAT).endOf('isoWeek');
    this.setState({ tableStartDate: startDate.format(APP_FORMAT) });
    this.props.actions.shiftsLoading(startDate.valueOf(), endDate.valueOf());
  };
  filterEmployees = (e: SyntheticInputEvent<HTMLInputElement>) => {
    this.setState({ employeeFilterValue: e.target.value });
  };
  render() {
    const { cDate } = this.props;
    const employees = this.props.employees.filter((x) => {
      if (this.state.employeeFilterValue) {
        return this.state.employeeFilterValue === x.id.toString();
      }
      return true;
    });
    return (
      <div>
        <div className={styles.shiftsFitersNav}>
          <TableNavigation path="/overview/" current={cDate} stepValue={7} step="days" />
          <EmployeesFilter employees={this.props.employees} onChange={this.filterEmployees} />
        </div>
        <ShiftsTable
          startDate={this.state.tableStartDate}
          employees={employees}
          shifts={this.props.shifts}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const cDate = ownProps.match.params.date || moment().format(APP_FORMAT);
  const startDate = moment(cDate, APP_FORMAT)
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

export default connect(mapStateToProps, mapDispatchToProps)(ShiftsOverview);
