import { useCallback, useEffect, useState } from "react";
import { Direction, GameState } from "../types/game";
import {
    addRandomTile,
    generateInitialBoard,
    hasValidMoves,
    hasWinningTile,
    moveBoard,
} from "../utils/gameLogic";

export const useGame = () => {
    const [gameState, setGameState] = useState<GameState>(() => ({
        board: generateInitialBoard(),
        score: 0,
        isGameOver: false,
        isWinner: false,
        canUndo: false,
    }));

    // Could make an array of every precedent moves
    const [previousState, setPreviousState] = useState<GameState | null>(null);
    const [bestScore, setBestScore] = useState<number>(() => {
        // TODO: Get from AsyncStorage
        return 0;
    });

    useEffect(() => {
        const isWinner = hasWinningTile(gameState.board);
        const isGameOver = !hasValidMoves(gameState.board);

        if (
            isWinner !== gameState.isWinner ||
            isGameOver !== gameState.isGameOver
        ) {
            setGameState((prev) => ({
                ...prev,
                isWinner,
                isGameOver,
            }));
        }

        if (gameState.score > bestScore) {
            setBestScore(gameState.score);
        }
    }, [
        gameState.board,
        gameState.score,
        gameState.isWinner,
        gameState.isGameOver,
        bestScore,
    ]);

    const move = useCallback(
        (direction: Direction) => {
            if (gameState.isGameOver) return;

            setPreviousState({ ...gameState });

            const result = moveBoard(gameState.board, direction);

            if (result.moved) {
                const boardWithNewTile = addRandomTile(result.board);

                setGameState((prev) => ({
                    ...prev,
                    board: boardWithNewTile,
                    score: prev.score + result.score,
                    canUndo: true,
                }));
            }
        },
        [gameState]
    );

    const undo = useCallback(() => {
        if (previousState && gameState.canUndo) {
            setGameState({
                ...previousState,
                canUndo: false,
            });
            setPreviousState(null);
        }
    }, [previousState, gameState.canUndo]);

    const restart = useCallback(() => {
        setGameState({
            board: generateInitialBoard(),
            score: 0,
            isGameOver: false,
            isWinner: false,
            canUndo: false,
        });
        setPreviousState(null);
    }, []);

    const continueAfterWin = useCallback(() => {
        setGameState((prev) => ({
            ...prev,
            isWinner: false,
        }));
    }, []);

    return {
        gameState,
        bestScore,
        move,
        undo,
        restart,
        continueAfterWin,
    };
};
