import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as moment from 'moment';
import { bindActionCreators } from 'redux';

import { shiftsLoading } from '../actions/shifts';
import {
  getShifts,
  // getErrorMessage,
  // getLoadingState,
} from '../reducers/shifts';

const dateFormat = 'MM-DD-YYYY';
const previewFormat = 'MMM D';
const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']; // @todo move somewhere global

class ShiftTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableStartDate: moment(props.cDate, dateFormat).startOf('isoWeek').format(dateFormat),
    };
  }
  componentDidMount() {
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
  }
  render() {
    const { cDate } = this.props;
    const prevWeekDate = moment(cDate, dateFormat).subtract(7, 'days').format(dateFormat);
    const nextWeekDate = moment(cDate, dateFormat).add(7, 'days').format(dateFormat);
    return (
      <div>
        <Link
          href="overview"
          to={`/overview/${prevWeekDate}`}
        >
          Left
        </Link>
        <Link
          href="overview"
          to={`/overview/${nextWeekDate}`}
        >
          Right
        </Link>
        <div>{this.state.tableStartDate}</div>
        {weekDays
          .map((dayName, index) => (
            <div
              key={dayName}
            >
              {`${dayName}, ${moment(this.state.tableStartDate, dateFormat).add(index, 'days').format(previewFormat)}`}
            </div>
          ))}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const cDate = ownProps.match.params.date || moment().format(dateFormat);
  const startDate = moment(cDate, dateFormat).startOf('isoWeek').valueOf();
  return {
    cDate,
    shifts: getShifts(state, startDate),
  };
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ shiftsLoading }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ShiftTable);
