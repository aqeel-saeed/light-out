import React from 'react';
import { Cell } from './Cell';
import { Cell as CellType } from '../types/game';

interface GameBoardProps {
  board: CellType[][];
  onCellClick: (row: number, col: number) => void;
  theme?: 'dark' | 'light';
}

export const GameBoard: React.FC<GameBoardProps> = ({ board, onCellClick, theme = 'dark' }) => {
  return (
    <div 
      className="grid gap-2" 
      style={{ 
        gridTemplateColumns: `repeat(${board.length}, minmax(0, 1fr))`,
        maxWidth: '400px',
        margin: '0 auto'
      }}
    >
      {board.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <Cell
            key={`${rowIndex}-${colIndex}`}
            cell={cell}
            onClick={onCellClick}
            theme={theme}
          />
        ))
      )}
    </div>
  );
};