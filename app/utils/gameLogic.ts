/**
 *
 * Instead of having 4 methods differents, we do one
 * But rotate the board so that we can only do the left logic and can use it every time.
 *
 */

import {
    Board,
    BOARD_SIZE,
    Cell,
    Direction,
    INITIAL_TILES,
    MoveResult,
    WIN_TILE,
} from "../types/game";

/**
 * Creates an empty board filled with null values
 */
export const createEmptyBoard = (): Board => {
    return Array(BOARD_SIZE)
        .fill(null)
        .map(() => Array(BOARD_SIZE).fill(null));
};

/**
 * Gets all empty cell positions on the board
 */
export const getEmptyCells = (board: Board): Array<[number, number]> => {
    const emptyCells: Array<[number, number]> = [];
    for (let row = 0; row < BOARD_SIZE; row++) {
        for (let col = 0; col < BOARD_SIZE; col++) {
            if (board[row][col] === null) {
                emptyCells.push([row, col]);
            }
        }
    }
    return emptyCells;
};

/**
 * Adds a random tile (2 or 4) to a random empty cell
 * 90% chance for 2, 10% chance for 4
 */
export const addRandomTile = (board: Board): Board => {
    const emptyCells = getEmptyCells(board);
    if (emptyCells.length === 0) return board;

    const newBoard = board.map((row) => [...row]);
    const randomIndex = Math.floor(Math.random() * emptyCells.length);
    const [row, col] = emptyCells[randomIndex];
    const value = Math.random() < 0.9 ? 2 : 4;

    newBoard[row][col] = value;
    return newBoard;
};

/**
 * Generates initial board with random 2s
 */
export const generateInitialBoard = (): Board => {
    let board = createEmptyBoard();

    for (let i = 0; i < INITIAL_TILES; i++) {
        board = addRandomTile(board);
    }

    return board;
};

/**
 * Moves and merges a single row to the left
 */
const moveRowLeft = (
    row: Cell[]
): { row: Cell[]; score: number; moved: boolean } => {
    const filteredRow = row.filter((cell) => cell !== null);
    const newRow: Cell[] = [...filteredRow];
    let score = 0;
    let moved = false;

    for (let i = 0; i < newRow.length - 1; i++) {
        if (newRow[i] === newRow[i + 1] && newRow[i] !== null) {
            newRow[i] = (newRow[i] as number) * 2;
            score += newRow[i] as number;
            newRow.splice(i + 1, 1);
            moved = true;
        }
    }

    while (newRow.length < BOARD_SIZE) {
        newRow.push(null);
    }

    if (!moved) {
        moved = !row.every((cell, index) => cell === newRow[index]);
    }

    return { row: newRow, score, moved };
};

/**
 * Rotates board 90 degrees clockwise
 */
const rotateBoard = (board: Board): Board => {
    const newBoard: Board = createEmptyBoard();
    for (let row = 0; row < BOARD_SIZE; row++) {
        for (let col = 0; col < BOARD_SIZE; col++) {
            newBoard[col][BOARD_SIZE - 1 - row] = board[row][col];
        }
    }
    return newBoard;
};

/**
 * Rotates board 90 degrees counter-clockwise
 */
const rotateCounterClockwise = (board: Board): Board => {
    const newBoard: Board = createEmptyBoard();
    for (let row = 0; row < BOARD_SIZE; row++) {
        for (let col = 0; col < BOARD_SIZE; col++) {
            newBoard[BOARD_SIZE - 1 - col][row] = board[row][col];
        }
    }
    return newBoard;
};

/**
 * Moves board in specified direction
 */
export const moveBoard = (board: Board, direction: Direction): MoveResult => {
    let workingBoard = board.map((row) => [...row]);
    let totalScore = 0;
    let hasMoved = false;

    // Rotate board to always work with left movement
    switch (direction) {
        case "right":
            workingBoard = rotateBoard(rotateBoard(workingBoard));
            break;
        case "up":
            workingBoard = rotateCounterClockwise(workingBoard);
            break;
        case "down":
            workingBoard = rotateBoard(workingBoard);
            break;
    }

    for (let i = 0; i < BOARD_SIZE; i++) {
        const result = moveRowLeft(workingBoard[i]);
        workingBoard[i] = result.row;
        totalScore += result.score;
        if (result.moved) hasMoved = true;
    }

    switch (direction) {
        case "right":
            workingBoard = rotateBoard(rotateBoard(workingBoard));
            break;
        case "up":
            workingBoard = rotateBoard(workingBoard);
            break;
        case "down":
            workingBoard = rotateCounterClockwise(workingBoard);
            break;
    }

    return {
        board: workingBoard,
        moved: hasMoved,
        score: totalScore,
    };
};

/**
 * Checks if there are any valid moves available
 */
export const hasValidMoves = (board: Board): boolean => {
    if (getEmptyCells(board).length > 0) return true;

    // Check for possible merges
    for (let row = 0; row < BOARD_SIZE; row++) {
        for (let col = 0; col < BOARD_SIZE; col++) {
            const current = board[row][col];

            // Check right neighbor
            if (col < BOARD_SIZE - 1 && current === board[row][col + 1]) {
                return true;
            }

            // Check bottom neighbor
            if (row < BOARD_SIZE - 1 && current === board[row + 1][col]) {
                return true;
            }
        }
    }

    return false;
};

/**
 * Checks if the board contains the winning tile
 */
export const hasWinningTile = (board: Board): boolean => {
    for (let row = 0; row < BOARD_SIZE; row++) {
        for (let col = 0; col < BOARD_SIZE; col++) {
            if (board[row][col] === WIN_TILE) {
                return true;
            }
        }
    }
    return false;
};

/**
 * Deep clones a board
 */
export const cloneBoard = (board: Board): Board => {
    return board.map((row) => [...row]);
};
