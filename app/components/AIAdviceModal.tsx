import React from "react";
import {
    ActivityIndicator,
    Dimensions,
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { AIAdvice } from "../services/aiService";
import { Board } from "../types/game";
import { MiniBoard } from "./MiniBoard";

interface AIAdviceModalProps {
    visible: boolean;
    advice: AIAdvice | null;
    loading: boolean;
    error: string | null;
    currentBoard: Board;
    onClose: () => void;
    onUseAdvice: () => void;
}

const { width: screenWidth } = Dimensions.get("window");

const getDirectionIcon = (direction: string) => {
    switch (direction) {
        case "up":
            return "↑";
        case "down":
            return "↓";
        case "left":
            return "←";
        case "right":
            return "→";
        default:
            return "?";
    }
};

const getDirectionName = (direction: string) => {
    return direction.charAt(0).toUpperCase() + direction.slice(1);
};

const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.8) return "#4CAF50";
    if (confidence >= 0.6) return "#FF9800";
    return "#F44336";
};

export const AIAdviceModal: React.FC<AIAdviceModalProps> = ({
    visible,
    advice,
    loading,
    error,
    currentBoard,
    onClose,
    onUseAdvice,
}) => {
    return (
        <Modal
            animationType="fade"
            transparent
            visible={visible}
            statusBarTranslucent
        >
            <View style={styles.overlay}>
                <View style={styles.modalContainer}>
                    <View style={styles.header}>
                        <Text style={styles.title}>🤖 AI Assistant</Text>
                        <TouchableOpacity
                            onPress={onClose}
                            style={styles.closeButton}
                        >
                            <Text style={styles.closeText}>✕</Text>
                        </TouchableOpacity>
                    </View>

                    <MiniBoard
                        board={currentBoard}
                        suggestedMove={advice?.suggestedMove}
                    />

                    {loading && (
                        <View style={styles.loadingContainer}>
                            <ActivityIndicator size="large" color="#8f7a66" />
                            <Text style={styles.loadingText}>
                                Analyzing board...
                            </Text>
                        </View>
                    )}

                    {error && (
                        <View style={styles.errorContainer}>
                            <Text style={styles.errorIcon}>⚠️</Text>
                            <Text style={styles.errorText}>{error}</Text>
                        </View>
                    )}

                    {advice && !loading && !error && (
                        <View style={styles.adviceContainer}>
                            <View style={styles.moveSection}>
                                <Text style={styles.suggestionLabel}>
                                    Suggested Move
                                </Text>
                                <View style={styles.moveDisplay}>
                                    <Text style={styles.directionIcon}>
                                        {getDirectionIcon(advice.suggestedMove)}
                                    </Text>
                                    <Text style={styles.directionText}>
                                        {getDirectionName(advice.suggestedMove)}
                                    </Text>
                                </View>
                            </View>

                            <View style={styles.confidenceSection}>
                                <Text style={styles.confidenceLabel}>
                                    Confidence
                                </Text>
                                <View style={styles.confidenceBar}>
                                    <View
                                        style={[
                                            styles.confidenceFill,
                                            {
                                                width: `${
                                                    advice.confidence * 100
                                                }%`,
                                                backgroundColor:
                                                    getConfidenceColor(
                                                        advice.confidence
                                                    ),
                                            },
                                        ]}
                                    />
                                </View>
                                <Text style={styles.confidenceText}>
                                    {Math.round(advice.confidence * 100)}%
                                </Text>
                            </View>

                            <View style={styles.reasoningSection}>
                                <Text style={styles.reasoningLabel}>
                                    AI Reasoning
                                </Text>
                                <Text style={styles.reasoningText}>
                                    {advice.reasoning}
                                </Text>
                            </View>

                            <View style={styles.buttonContainer}>
                                <TouchableOpacity
                                    style={[styles.button, styles.useButton]}
                                    onPress={onUseAdvice}
                                    activeOpacity={0.7}
                                >
                                    <Text style={styles.buttonText}>
                                        Use This Move
                                    </Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={[
                                        styles.button,
                                        styles.dismissButton,
                                    ]}
                                    onPress={onClose}
                                    activeOpacity={0.7}
                                >
                                    <Text
                                        style={[
                                            styles.buttonText,
                                            styles.dismissText,
                                        ]}
                                    >
                                        I'll Decide
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
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
        borderRadius: 12,
        padding: 20,
        maxWidth: screenWidth * 0.9,
        minWidth: screenWidth * 0.8,
        maxHeight: "85%",
        elevation: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 15,
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#776e65",
    },
    closeButton: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: "#cdc1b4",
        justifyContent: "center",
        alignItems: "center",
    },
    closeText: {
        fontSize: 16,
        color: "#776e65",
        fontWeight: "bold",
    },
    loadingContainer: {
        alignItems: "center",
        paddingVertical: 20,
    },
    loadingText: {
        marginTop: 10,
        fontSize: 14,
        color: "#776e65",
    },
    errorContainer: {
        alignItems: "center",
        paddingVertical: 20,
    },
    errorIcon: {
        fontSize: 24,
        marginBottom: 10,
    },
    errorText: {
        fontSize: 14,
        color: "#F44336",
        textAlign: "center",
        lineHeight: 20,
    },
    adviceContainer: {
        gap: 15,
    },
    moveSection: {
        alignItems: "center",
    },
    suggestionLabel: {
        fontSize: 14,
        color: "#776e65",
        fontWeight: "600",
        marginBottom: 8,
    },
    moveDisplay: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#8f7a66",
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 8,
        gap: 8,
    },
    directionIcon: {
        fontSize: 24,
        color: "#f9f6f2",
    },
    directionText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#f9f6f2",
    },
    confidenceSection: {
        alignItems: "center",
    },
    confidenceLabel: {
        fontSize: 14,
        color: "#776e65",
        fontWeight: "600",
        marginBottom: 6,
    },
    confidenceBar: {
        width: "100%",
        height: 6,
        backgroundColor: "#cdc1b4",
        borderRadius: 3,
        overflow: "hidden",
    },
    confidenceFill: {
        height: "100%",
        borderRadius: 3,
    },
    confidenceText: {
        fontSize: 12,
        color: "#776e65",
        marginTop: 4,
        fontWeight: "600",
    },
    reasoningSection: {
        backgroundColor: "#eee4da",
        padding: 12,
        borderRadius: 8,
    },
    reasoningLabel: {
        fontSize: 14,
        color: "#776e65",
        fontWeight: "600",
        marginBottom: 6,
    },
    reasoningText: {
        fontSize: 13,
        color: "#776e65",
        lineHeight: 18,
    },
    buttonContainer: {
        flexDirection: "row",
        gap: 10,
        marginTop: 5,
    },
    button: {
        borderRadius: 6,
        paddingVertical: 10,
        paddingHorizontal: 14,
        alignItems: "center",
        flex: 1,
    },
    useButton: {
        backgroundColor: "#8f7a66",
    },
    dismissButton: {
        backgroundColor: "transparent",
        borderWidth: 2,
        borderColor: "#cdc1b4",
    },
    buttonText: {
        color: "#f9f6f2",
        fontSize: 14,
        fontWeight: "600",
    },
    dismissText: {
        color: "#776e65",
    },
});
