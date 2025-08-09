import { useCallback } from "react";
import { State } from "react-native-gesture-handler";
import { Direction } from "../types/game";

interface UseGesturesProps {
    onMove: (direction: Direction) => void;
    isGameOver: boolean;
}

const SWIPE_THRESHOLD = 20;

export const useGestures = ({ onMove, isGameOver }: UseGesturesProps) => {
    const handleGestureEvent = useCallback(
        (event: any) => {
            if (isGameOver) return;

            const { translationX, translationY, state } = event.nativeEvent;

            if (state === State.END) {
                const absX = Math.abs(translationX);
                const absY = Math.abs(translationY);

                // Minimum swipe distance
                if (absX < SWIPE_THRESHOLD && absY < SWIPE_THRESHOLD) return;

                if (absX > absY) {
                    // Horizontal swipe
                    if (translationX > 0) {
                        onMove("right");
                    } else {
                        onMove("left");
                    }
                } else {
                    // Vertical swipe
                    if (translationY > 0) {
                        onMove("down");
                    } else {
                        onMove("up");
                    }
                }
            }
        },
        [onMove, isGameOver]
    );

    return {
        handleGestureEvent,
    };
};
