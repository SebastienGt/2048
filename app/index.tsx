import React, { useState } from "react";
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";
import { AIAdviceModal } from "./components/AIAdviceModal";
import { APIKeyModal } from "./components/APIKeyModal";
import { GameBoard } from "./components/GameBoard";
import { GameControls } from "./components/GameControls";
import { GameModal } from "./components/GameModal";
import { ScoreBoard } from "./components/ScoreBoard";
import { useGame } from "./hooks/useGame";
import { useGestures } from "./hooks/useGestures";
import { useKeyboard } from "./hooks/useKeyboard";
import { AIAdvice, getAIAdvice } from "./services/aiService";

export default function Index() {
    const { gameState, bestScore, move, undo, restart, continueAfterWin } =
        useGame();

    const { handleGestureEvent } = useGestures({
        onMove: move,
        isGameOver: gameState.isGameOver,
    });

    useKeyboard({
        onMove: move,
        isGameOver: gameState.isGameOver,
    });

    const [showAPIKeyModal, setShowAPIKeyModal] = useState(false);
    const [showAIAdviceModal, setShowAIAdviceModal] = useState(false);
    const [aiAdvice, setAIAdvice] = useState<AIAdvice | null>(null);
    const [aiLoading, setAILoading] = useState(false);
    const [aiError, setAIError] = useState<string | null>(null);
    const [apiKey, setApiKey] = useState<string>("");

    const handleRestart = () => {
        restart();
    };

    const handleAIAdvice = () => {
        if (!apiKey) {
            setShowAPIKeyModal(true);
        } else {
            requestAIAdvice(apiKey);
        }
    };

    const handleAPIKeySubmit = (key: string) => {
        setApiKey(key);
        setShowAPIKeyModal(false);
        requestAIAdvice(key);
    };

    const requestAIAdvice = async (key: string) => {
        setAILoading(true);
        setAIError(null);
        setShowAIAdviceModal(true);

        try {
            const advice = await getAIAdvice(gameState.board, key);
            setAIAdvice(advice);
        } catch (error) {
            setAIError(
                error instanceof Error
                    ? error.message
                    : "Failed to get AI advice"
            );
        } finally {
            setAILoading(false);
        }
    };

    const handleUseAIAdvice = () => {
        if (aiAdvice) {
            move(aiAdvice.suggestedMove);
            setShowAIAdviceModal(false);
            setAIAdvice(null);
        }
    };

    const handleCloseAIAdvice = () => {
        setShowAIAdviceModal(false);
        setAIAdvice(null);
        setAIError(null);
    };

    const showModal = gameState.isGameOver || gameState.isWinner;

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#faf8ef" />

            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.header}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>2048</Text>
                        <Text style={styles.subtitle}>
                            Join the tiles, get to{" "}
                            <Text style={styles.highlight}>2048!</Text>
                        </Text>
                    </View>
                </View>

                <ScoreBoard score={gameState.score} bestScore={bestScore} />

                <GameControls
                    onRestart={handleRestart}
                    onUndo={undo}
                    onAIAdvice={handleAIAdvice}
                    canUndo={gameState.canUndo}
                    isGameOver={gameState.isGameOver}
                />

                <PanGestureHandler onHandlerStateChange={handleGestureEvent}>
                    <View style={styles.gameContainer}>
                        <GameBoard board={gameState.board} />

                        <View style={styles.instructions}>
                            <Text style={styles.instructionText}>
                                HOW TO PLAY: Swipe to move tiles or use arrow
                                keys. When two tiles with the same number touch,
                                they merge into one!
                            </Text>
                        </View>
                    </View>
                </PanGestureHandler>
            </ScrollView>

            <GameModal
                visible={showModal}
                isWinner={gameState.isWinner}
                isGameOver={gameState.isGameOver}
                score={gameState.score}
                onRestart={restart}
                onContinue={gameState.isWinner ? continueAfterWin : undefined}
            />

            <APIKeyModal
                visible={showAPIKeyModal}
                onClose={() => setShowAPIKeyModal(false)}
                onSubmit={handleAPIKeySubmit}
            />

            <AIAdviceModal
                visible={showAIAdviceModal}
                advice={aiAdvice}
                loading={aiLoading}
                error={aiError}
                currentBoard={gameState.board}
                onClose={handleCloseAIAdvice}
                onUseAdvice={handleUseAIAdvice}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#faf8ef",
    },
    scrollContent: {
        flexGrow: 1,
        paddingBottom: 20,
    },
    header: {
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 10,
    },
    titleContainer: {
        alignItems: "center",
    },
    title: {
        fontSize: 40,
        fontWeight: "bold",
        color: "#776e65",
        textAlign: "center",
    },
    subtitle: {
        fontSize: 13,
        color: "#776e65",
        textAlign: "center",
        marginTop: 5,
        lineHeight: 18,
    },
    highlight: {
        fontWeight: "bold",
        color: "#f67c5f",
    },
    gameContainer: {
        alignItems: "center",
    },
    instructions: {
        paddingHorizontal: 20,
        paddingTop: 15,
        paddingBottom: 10,
    },
    instructionText: {
        fontSize: 12,
        color: "#776e65",
        textAlign: "center",
        lineHeight: 18,
    },
});
