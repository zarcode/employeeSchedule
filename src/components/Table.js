/* @flow */

import React from 'react';
import type { Element } from 'react';
import styles from './Table.css';

type Props = {
  rows: Array<any>,
  rowKeyExtractor: (any) => string | number,
  renderRowHeader: (any) => Element<any> | string | null,
  columns: Array<any>,
  columnKeyExtractor: (any) => string | number,
  renderColumnHeader: (any, number) => Element<any> | string | null,
  renderFirstCell: () => Element<any> | string | null,
  renderCell: (any, number) => Element<any> | string | null,
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
}:
Props) => (
  <table className={styles.table}>
    <thead>
      <tr>
        <th>{renderFirstCell()}</th>
        {columns.map((columnItem, index) => (
          <th key={`th-${columnKeyExtractor(columnItem)}`}>
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
            <td key={`td-${columnKeyExtractor(columnItem)}`}>{renderCell(rowItem, index)}</td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
);

export default Table;
