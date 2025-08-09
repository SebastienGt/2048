export type Cell = number | null;
export type Board = Cell[][];
export type Direction = "left" | "right" | "up" | "down";

export interface GameState {
    board: Board;
    score: number;
    isGameOver: boolean;
    isWinner: boolean;
    canUndo: boolean;
}

export interface MoveResult {
    board: Board;
    moved: boolean;
    score: number;
}

export const BOARD_SIZE = 4;
export const WIN_TILE = 2048;
export const INITIAL_TILES = 2;
