/**
 * @jest-environment node
 */

import { Board } from "../types/game";
import {
    createEmptyBoard,
    getEmptyCells,
    hasValidMoves,
    hasWinningTile,
    moveBoard,
} from "../utils/gameLogic";

// Mock implementations for testing
const mockBoard: Board = [
    [null, 8, 2, 2],
    [4, 2, null, 2],
    [null, null, null, null],
    [null, null, null, 2],
];

describe("Game Logic Tests", () => {
    test("createEmptyBoard should create a 4x4 board filled with nulls", () => {
        const board = createEmptyBoard();
        expect(board).toHaveLength(4);
        expect(board[0]).toHaveLength(4);
        expect(board.every((row) => row.every((cell) => cell === null))).toBe(
            true
        );
    });

    test("moveBoard should merge tiles correctly when moving left", () => {
        const result = moveBoard(mockBoard, "left");

        expect(result.board).toEqual([
            [8, 4, null, null],
            [4, 4, null, null],
            [null, null, null, null],
            [2, null, null, null],
        ]);
        expect(result.moved).toBe(true);
        expect(result.score).toBe(8);
    });

    test("hasValidMoves should return true when empty cells exist", () => {
        const board: Board = [
            [2, null, 2, 4],
            [4, 2, 4, 2],
            [2, 4, 2, 4],
            [4, 2, 4, 2],
        ];

        expect(hasValidMoves(board)).toBe(true);
    });

    test("hasWinningTile should return true when 2048 tile exists", () => {
        const board: Board = [
            [4, null, null, 2],
            [2048, null, null, null],
            [4, 2, null, null],
            [4, null, null, null],
        ];

        expect(hasWinningTile(board)).toBe(true);
    });

    test("getEmptyCells should return correct empty cell positions", () => {
        const board: Board = [
            [2, null, 2, null],
            [null, 2, null, 2],
            [2, null, 2, null],
            [null, 2, null, 2],
        ];

        const emptyCells = getEmptyCells(board);
        expect(emptyCells).toHaveLength(8);
        expect(emptyCells).toContainEqual([0, 1]);
        expect(emptyCells).toContainEqual([0, 3]);
    });
});
