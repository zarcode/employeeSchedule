/* @flow */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import format from 'date-fns/format';
import startOfWeek from 'date-fns/start_of_week';
import endOfWeek from 'date-fns/end_of_week';
import isValid from 'date-fns/is_valid';

import { shiftsLoading } from '../../actions/shifts';
import { employeesLoading } from '../../actions/employees';
import {
  getShifts,
  getErrorMessage as getShiftsErrorMessage,
} from '../../reducers/shifts';
import {
  getEmployees,
  getErrorMessage as getEmployeesErrorMessage,
} from '../../reducers/employees';
import {
  getById as getPositionsObject,
} from '../../reducers/positions';

import ShiftsTable from './ShiftsTable';
import TableNavigation from '../shared/TableNavigation';
import EmployeesFilter from './EmployeesFilter';

import { DATE_FORMATS } from '../../constants/index';

import type { Employee, Shift, Position } from '../../api/types';

import styles from './ShiftsOverview.css';

const { APP_FORMAT } = DATE_FORMATS;

type Props = {
  cDate: string,
  shifts: Array<Shift>,
  employees: Array<Employee>,
  positions: { [string]: Position },
  errorMessage: string,
  actions: {
    employeesLoading: () => void,
    shiftsLoading: (startDate: string, endDate: string) => void,
  },
};

type State = {
  tableStartDate: string,
  employeeFilterValue: string,
};

class ShiftsOverview extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      tableStartDate: format(startOfWeek(new Date(props.cDate), { weekStartsOn: 1 }), APP_FORMAT),
      employeeFilterValue: '',
    };
  }

  state: State;

  componentDidMount() {
    this.props.actions.employeesLoading();
    this.loadMore(this.props.cDate);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errorMessage) {
      alert(nextProps.errorMessage); // eslint-disable-line no-alert
    }
    if (nextProps.cDate !== this.props.cDate) {
      this.loadMore(nextProps.cDate);
    }
  }

  loadMore = (cDate) => {
    const currentDate = new Date(cDate);
    const startDate = format(startOfWeek(currentDate, { weekStartsOn: 1 }), APP_FORMAT);
    const endDate = format(endOfWeek(currentDate, { weekStartsOn: 1 }), APP_FORMAT);
    this.setState({ tableStartDate: startDate });
    this.props.actions.shiftsLoading(startDate, endDate);
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
          <TableNavigation path="/overview/" current={cDate} stepValue={7} />
          <EmployeesFilter employees={this.props.employees} onChange={this.filterEmployees} />
        </div>
        <ShiftsTable
          startDate={this.state.tableStartDate}
          employees={employees}
          shifts={this.props.shifts}
          positions={this.props.positions}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const dateFromProps = new Date(ownProps.match.params.date);
  let cDate = format(new Date(), APP_FORMAT); // default to today
  if (ownProps.match.params.date && isValid(dateFromProps)) {
    cDate = format(dateFromProps, APP_FORMAT);
  }
  const startDate = format(startOfWeek(cDate, { weekStartsOn: 1 }), APP_FORMAT);
  return {
    cDate,
    shifts: getShifts(state, startDate),
    employees: getEmployees(state),
    positions: getPositionsObject(state),
    errorMessage: getEmployeesErrorMessage(state) || getShiftsErrorMessage(state),
  };
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ shiftsLoading, employeesLoading }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ShiftsOverview);
