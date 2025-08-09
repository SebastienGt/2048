import React from "react";
import {
    Dimensions,
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

interface GameModalProps {
    visible: boolean;
    isWinner: boolean;
    isGameOver: boolean;
    score: number;
    onRestart: () => void;
    onContinue?: () => void;
}

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

export const GameModal: React.FC<GameModalProps> = ({
    visible,
    isWinner,
    isGameOver,
    score,
    onRestart,
    onContinue,
}) => {
    const title = isWinner ? "You Win!" : "Game Over!";
    const message = isWinner
        ? `Congratulations! You reached 2048 with a score of ${score.toLocaleString()}`
        : `Final Score: ${score.toLocaleString()}`;

    return (
        <Modal
            animationType="fade"
            transparent
            visible={visible}
            statusBarTranslucent
        >
            <View style={styles.overlay}>
                <View style={styles.modalContainer}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.message}>{message}</Text>

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={[styles.button, styles.restartButton]}
                            onPress={onRestart}
                            activeOpacity={0.7}
                        >
                            <Text style={styles.buttonText}>Try Again</Text>
                        </TouchableOpacity>

                        {isWinner && onContinue && (
                            <TouchableOpacity
                                style={[styles.button, styles.continueButton]}
                                onPress={onContinue}
                                activeOpacity={0.7}
                            >
                                <Text style={styles.buttonText}>
                                    Keep Going
                                </Text>
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        justifyContent: "center",
        alignItems: "center",
    },
    modalContainer: {
        backgroundColor: "#faf8ef",
        borderRadius: 10,
        padding: 30,
        alignItems: "center",
        maxWidth: screenWidth * 0.8,
        elevation: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#776e65",
        marginBottom: 10,
        textAlign: "center",
    },
    message: {
        fontSize: 16,
        color: "#776e65",
        textAlign: "center",
        marginBottom: 25,
        lineHeight: 22,
    },
    buttonContainer: {
        flexDirection: "row",
        gap: 15,
    },
    button: {
        borderRadius: 6,
        paddingVertical: 12,
        paddingHorizontal: 20,
        alignItems: "center",
        minWidth: 100,
    },
    restartButton: {
        backgroundColor: "#8f7a66",
    },
    continueButton: {
        backgroundColor: "#ed9e22",
    },
    buttonText: {
        color: "#f9f6f2",
        fontSize: 16,
        fontWeight: "600",
    },
});
