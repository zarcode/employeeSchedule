import React from 'react';
import * as moment from 'moment';
import { Link } from 'react-router-dom';
import { DATES } from '../constants';

import styles from './TableNavigation.css';

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
    <div className={styles.filters}>
      <Link className={styles.button} href={`${path}${prev}`} to={`${path}${prev}`}>
        {'<'}
      </Link>
      <Link className={`${styles.button} ${styles.today}`} href={`${path}${today}`} to={`${path}${today}`}>
        Today
      </Link>
      <Link className={styles.button} href={`${path}${next}`} to={`${path}${next}`}>
        {'>'}
      </Link>
    </div>
  );
};

export default TableNavigation;
