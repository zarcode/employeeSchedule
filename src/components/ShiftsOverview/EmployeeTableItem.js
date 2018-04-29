import React from 'react';
import type { EmployeeViewModel } from './ShiftsTable';

import styles from './EmployeeTableItem.css';

const noAvatar = require('../../assets/img/no-avatar.png');

type Props = {
  employee: EmployeeViewModel,
};

const EmployeeTableItem = ({ employee }: Props) =>
  (
    <div>
      <img
        className={styles.avatar}
        src={employee.avatar ? employee.avatar : noAvatar}
        alt={`${employee.firstName} ${employee.lastName}`}
      />
      <div
        className={styles.name}
      >
        <div>
          {employee.firstName}
        </div>
        <div>
          {employee.lastName}
        </div>
      </div>
    </div>
  );

export default EmployeeTableItem;
