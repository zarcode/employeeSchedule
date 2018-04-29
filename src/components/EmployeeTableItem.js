import React from 'react';
import type { Employee } from '../api/types';

import styles from './EmployeeTableItem.css';

const noAvatar = require('../assets/img/no-avatar.png');

const EmployeeTableItem = ({ employee }: Employee) =>
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
