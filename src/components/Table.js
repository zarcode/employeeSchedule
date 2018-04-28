import React from 'react';

const Table = ({
  rows,
  rowKeyExtractor,
  renderRowHeader,
  columns,
  columnKeyExtractor,
  renderColumnHeader,
  renderFirstCell,
  renderCell,
}) => (
  <table>
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
            <td key={`td-${columnKeyExtractor(columnItem)}`}>
              {renderCell(rowItem, index)}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
);

export default Table;
