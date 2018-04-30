import React from 'react';
import format from 'date-fns/format';
import addDays from 'date-fns/add_days';
import subDays from 'date-fns/sub_days';
import { Link } from 'react-router-dom';
import { DATE_FORMATS } from '../../constants/index';

import styles from './TableNavigation.css';

const { APP_FORMAT } = DATE_FORMATS;

type Props = {
  path: string,
  current: string,
  stepValue: number,
}
const TableNavigation = ({
  path, current, stepValue,
}:
Props) => {
  const today = format(new Date(), APP_FORMAT);
  const prev = format(subDays(new Date(current), stepValue), APP_FORMAT);
  const next = format(addDays(new Date(current), stepValue), APP_FORMAT);
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
