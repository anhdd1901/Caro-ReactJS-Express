import './Table.scss';

import React, { memo } from 'react';

interface PTCell {
  size: number;
  onClick: (rowIndex: number, colIndex: number, isTurnX: boolean) => void;
  value?: string;
  rowIndex: number;
  colIndex: number;
  turn: boolean;
  justMovedCell: number[] | null;
  winRow: number[][];
}

const Cell: React.FC<PTCell> = ({ size, onClick, value, rowIndex, colIndex, turn, justMovedCell, winRow }) => {
  const tableSize = Number(process.env.REACT_APP_TABLE_SIZE);
  const wonCell = winRow.length !== 0 && winRow.some((a) => a[0] === rowIndex && a[1] === colIndex);
  return (
    <div
      onClick={() => onClick(rowIndex, colIndex, turn)}
      className={`cell-container ${value ? (value === 'x' ? 'x-value' : 'o-value') : ''} ${
        justMovedCell && justMovedCell[0] === rowIndex && justMovedCell[1] === colIndex ? 'just-moved-cell' : ''
      } ${wonCell ? 'won-cell' : ''}`}
      style={{
        width: size,
        height: size,
        backgroundSize: `${(window.innerHeight - 48 - 48 - 40 - 50 - 20) / tableSize - 12}px`,
      }}
    ></div>
  );
};

interface PTRow {
  size: number;
  onClick: (rowIndex: number, colIndex: number, isTurnX: boolean) => void;
  value: string[];
  rowIndex: number;
  turn: boolean;
  justMovedCell: number[] | null;
  winRow: number[][];
}

const Row: React.FC<PTRow> = ({ size, onClick, value, rowIndex, turn, justMovedCell, winRow }) => {
  return (
    <div className="row-container">
      {value.map((a, index) => (
        <Cell
          key={index}
          turn={turn}
          rowIndex={rowIndex}
          colIndex={index}
          size={size}
          onClick={onClick}
          value={a}
          justMovedCell={justMovedCell}
          winRow={winRow}
        />
      ))}
    </div>
  );
};

interface PTTable {
  size: number;
  onClick: (rowIndex: number, colIndex: number, isTurnX: boolean) => void;
  turn: boolean;
  justMovedCell: number[] | null;
  value: string[][];
  winRow: number[][];
}

const Table: React.FC<PTTable> = ({ size, onClick, value, turn, justMovedCell, winRow }) => {
  return (
    <div className="table-container">
      {value.map((a, index) => (
        <Row
          key={index}
          turn={turn}
          rowIndex={index}
          size={size}
          onClick={onClick}
          value={a}
          justMovedCell={justMovedCell}
          winRow={winRow}
        />
      ))}
    </div>
  );
};

export default memo(Table);
