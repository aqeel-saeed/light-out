import { useState, useCallback, useEffect } from "react";
import { Cell, GameState, GameConfig } from "../types/game";

const createInitialBoard = (size: number): Cell[][] => {
  return Array.from({ length: size }, (_, row) =>
    Array.from({ length: size }, (_, col) => ({
      isOn: false,
      row,
      col,
    }))
  );
};

const randomizeBoard = (board: Cell[][], difficulty: number): Cell[][] => {
  const newBoard = JSON.parse(JSON.stringify(board));
  const moves = Math.floor(board.length * board.length * difficulty);

  for (let i = 0; i < moves; i++) {
    const row = Math.floor(Math.random() * board.length);
    const col = Math.floor(Math.random() * board.length);
    toggleLights(newBoard, row, col);
  }

  return newBoard;
};

const toggleLights = (board: Cell[][], row: number, col: number): void => {
  const size = board.length;
  const positions = [
    [row, col],
    [row - 1, col],
    [row + 1, col],
    [row, col - 1],
    [row, col + 1],
  ];

  positions.forEach(([r, c]) => {
    if (r >= 0 && r < size && c >= 0 && c < size) {
      board[r][c].isOn = !board[r][c].isOn;
    }
  });
};

const checkWin = (board: Cell[][]): boolean => {
  return board.every((row) => row.every((cell) => !cell.isOn));
};

export const useGame = (config: GameConfig) => {
  const [gameState, setGameState] = useState<GameState>(() => ({
    board: randomizeBoard(createInitialBoard(config.size), config.difficulty),
    moves: 0,
    isWon: false,
  }));

  useEffect(() => {
    setGameState({
      board: randomizeBoard(createInitialBoard(config.size), config.difficulty),
      moves: 0,
      isWon: false,
    });
  }, [config.size, config.difficulty]);

  const handleCellClick = useCallback((row: number, col: number) => {
    setGameState((prev) => {
      const newBoard = JSON.parse(JSON.stringify(prev.board));
      toggleLights(newBoard, row, col);
      const isWon = checkWin(newBoard);

      return {
        board: newBoard,
        moves: prev.moves + 1,
        isWon,
      };
    });
  }, []);

  const resetGame = useCallback(() => {
    setGameState({
      board: randomizeBoard(createInitialBoard(config.size), config.difficulty),
      moves: 0,
      isWon: false,
    });
  }, [config.size, config.difficulty]);

  return {
    gameState,
    handleCellClick,
    resetGame,
  };
};
