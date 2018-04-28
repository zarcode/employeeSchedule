import React from 'react';
import * as moment from 'moment';
import { Link } from 'react-router-dom';
import { DATES } from '../constants';

const { APP_FORMAT } = DATES;

type Props = {
  path: string,
  current: string,
  stepValue: number,
  step: string,
}
const TableNavigation = ({
  path, current, stepValue, step,
}:
Props) => {
  const today = moment().format(APP_FORMAT);
  const prev = moment(current, APP_FORMAT)
    .subtract(stepValue, step)
    .format(APP_FORMAT);
  const next = moment(current, APP_FORMAT)
    .add(stepValue, step)
    .format(APP_FORMAT);
  return (
    <div>
      <Link href="page" to={`${path}${prev}`}>
        {'<'}
      </Link>
      <Link href="page" to={`${path}${today}`}>
        Today
      </Link>
      <Link href="page" to={`${path}${next}`}>
        {'>'}
      </Link>
    </div>
  );
};

export default TableNavigation;
