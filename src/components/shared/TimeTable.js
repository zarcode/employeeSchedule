/* @flow */

import React from 'react';
import type { Element } from 'react';
import styles from './TimeTable.css';

type Props = {
  rows: Array<any>,
  rowKeyExtractor: (any) => string | number,
  renderRowHeader: (any) => Element<any> | string | null,
  columns: Array<any>,
  columnKeyExtractor: (any) => string | number,
  renderColumnHeader: (any, number) => Element<any> | string | null,
  renderFirstCell: () => Element<any> | string | null,
  renderCell: (any, number) => Element<any> | string | null,
  highLightCell: (number) => boolean,
};
const Table = ({
  rows,
  rowKeyExtractor,
  renderRowHeader,
  columns,
  columnKeyExtractor,
  renderColumnHeader,
  renderFirstCell,
  renderCell,
  highLightCell,
}:
Props) => (
  <table className={styles.table}>
    <thead>
      <tr>
        <th>{renderFirstCell()}</th>
        {columns.map((columnItem, index) => (
          <th
            key={`th-${columnKeyExtractor(columnItem)}`}
            className={highLightCell(index) ? styles.highlighted : 'regular'}
          >
            {renderColumnHeader(columnItem, index)}
          </th>
        ))}
      </tr>
    </thead>
    <tbody>
      {rows.map(rowItem => (
        <tr key={`tr-${rowKeyExtractor(rowItem)}`}>
          <td>{renderRowHeader(rowItem)}</td>
          {columns.map((columnItem, index) => (
            <td
              key={`td-${columnKeyExtractor(columnItem)}`}
              className={highLightCell(index) ? styles.highlighted : 'regular'}
            >
              {renderCell(rowItem, index)}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
);

export default Table;
