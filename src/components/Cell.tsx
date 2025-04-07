import React from 'react';
import { Cell as CellType } from '../types/game';

interface CellProps {
  cell: CellType;
  onClick: (row: number, col: number) => void;
  theme?: 'dark' | 'light';
}

export const Cell: React.FC<CellProps> = ({ cell, onClick, theme = 'dark' }) => {
  return (
    <button
      onClick={() => onClick(cell.row, cell.col)}
      className={`
        aspect-square rounded-lg transition-all duration-300 transform
        ${cell.isOn 
          ? theme === 'dark'
            ? 'bg-yellow-400 shadow-[0_0_15px_rgba(250,204,21,0.7)] scale-105'
            : 'bg-yellow-500 shadow-[0_0_15px_rgba(234,179,8,0.7)] scale-105'
          : theme === 'dark'
            ? 'bg-gray-700 shadow-inner scale-100'
            : 'bg-gray-200 shadow-inner scale-100'
        }
        hover:scale-105 focus:outline-none focus:ring-2 
        ${theme === 'dark' ? 'focus:ring-yellow-400' : 'focus:ring-yellow-500'}
      `}
      aria-label={`Cell ${cell.row},${cell.col} ${cell.isOn ? 'on' : 'off'}`}
    />
  );
};