import { useEffect } from "react";
import { Platform } from "react-native";
import { Direction } from "../types/game";

interface UseKeyboardProps {
    onMove: (direction: Direction) => void;
    isGameOver: boolean;
}

export const useKeyboard = ({ onMove, isGameOver }: UseKeyboardProps) => {
    useEffect(() => {
        if (Platform.OS !== "web") return;

        const handleKeyPress = (event: KeyboardEvent) => {
            if (isGameOver) return;

            const arrowKeys = [
                "ArrowUp",
                "ArrowDown",
                "ArrowLeft",
                "ArrowRight",
            ];
            if (arrowKeys.includes(event.key)) {
                event.preventDefault();
            }

            switch (event.key) {
                case "ArrowUp":
                    onMove("up");
                    break;
                case "ArrowDown":
                    onMove("down");
                    break;
                case "ArrowLeft":
                    onMove("left");
                    break;
                case "ArrowRight":
                    onMove("right");
                    break;
                default:
                    break;
            }
        };

        if (typeof window !== "undefined") {
            window.addEventListener("keydown", handleKeyPress);
        }

        return () => {
            if (typeof window !== "undefined") {
                window.removeEventListener("keydown", handleKeyPress);
            }
        };
    }, [onMove, isGameOver]);
};
