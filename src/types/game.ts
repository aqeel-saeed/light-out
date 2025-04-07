export interface Cell {
  isOn: boolean;
  row: number;
  col: number;
}

export interface GameState {
  board: Cell[][];
  moves: number;
  isWon: boolean;
}

export interface GameConfig {
  size: number;
  difficulty: number;
}