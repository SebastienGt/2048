import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface GameControlsProps {
    onRestart: () => void;
    onUndo: () => void;
    onAIAdvice: () => void;
    canUndo: boolean;
    isGameOver: boolean;
}

export const GameControls: React.FC<GameControlsProps> = ({
    onRestart,
    onUndo,
    onAIAdvice,
    canUndo,
    isGameOver,
}) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={[styles.button, styles.restartButton]}
                onPress={onRestart}
                activeOpacity={0.7}
            >
                <Text style={styles.buttonText}>New Game</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[
                    styles.button,
                    styles.undoButton,
                    !canUndo && styles.disabledButton,
                ]}
                onPress={onUndo}
                disabled={!canUndo}
                activeOpacity={0.7}
            >
                <Text
                    style={[styles.buttonText, !canUndo && styles.disabledText]}
                >
                    Undo
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[
                    styles.button,
                    styles.aiButton,
                    isGameOver && styles.disabledButton,
                ]}
                onPress={onAIAdvice}
                disabled={isGameOver}
                activeOpacity={0.7}
            >
                <Text
                    style={[
                        styles.buttonText,
                        isGameOver && styles.disabledText,
                    ]}
                >
                    🤖 AI Help
                </Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        paddingVertical: 10,
        gap: 8,
    },
    button: {
        borderRadius: 6,
        paddingVertical: 12,
        paddingHorizontal: 16,
        alignItems: "center",
        flex: 1,
    },
    restartButton: {
        backgroundColor: "#8f7a66",
    },
    undoButton: {
        backgroundColor: "#776e65",
    },
    aiButton: {
        backgroundColor: "#ed9e22",
    },
    disabledButton: {
        backgroundColor: "#cdc1b4",
        opacity: 0.6,
    },
    buttonText: {
        color: "#f9f6f2",
        fontSize: 14,
        fontWeight: "600",
    },
    disabledText: {
        color: "#776e65",
    },
});
