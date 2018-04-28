import React from 'react';

const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const columnKeyExtractor = function (columnItem) {
  return columnItem;
};
const WeekTable = ({
  rows,
  rowKeyExtractor,
  renderRowHeader,
  renderColumnHeader,
  renderCell,
}) => {
  return (
    <table>
      <thead>
        <tr>
          <th>
            Week
          </th>
          {weekDays.map((columnItem, index) => (
            <th
              key={`th-${columnKeyExtractor(columnItem)}`}
            >
              {renderColumnHeader(columnItem, index)}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
      {rows.map(rowItem => (
        <tr
          key={`tr-${rowKeyExtractor(rowItem)}`}
        >
          <td>
            {renderRowHeader(rowItem)}
          </td>
          {weekDays.map((columnItem, index) => (
            <td
              key={`td-${rowKeyExtractor(rowItem)}-${columnKeyExtractor(columnItem)}`}
            >
              {renderCell(rowItem, index)}
            </td>
          ))}
        </tr>
      ))}
      </tbody>
    </table>
  );
};

export default WeekTable;
