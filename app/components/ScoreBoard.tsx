import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface ScoreBoardProps {
    score: number;
    bestScore: number;
}

export const ScoreBoard: React.FC<ScoreBoardProps> = ({ score, bestScore }) => {
    return (
        <View style={styles.container}>
            <View style={styles.scoreContainer}>
                <Text style={styles.scoreLabel}>SCORE</Text>
                <Text style={styles.scoreValue}>{score.toLocaleString()}</Text>
            </View>
            <View style={styles.scoreContainer}>
                <Text style={styles.scoreLabel}>BEST</Text>
                <Text style={styles.scoreValue}>
                    {bestScore.toLocaleString()}
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        paddingTop: 20,
        gap: 10,
    },
    scoreContainer: {
        backgroundColor: "#bbada0",
        borderRadius: 6,
        paddingVertical: 8,
        paddingHorizontal: 16,
        alignItems: "center",
        minWidth: 80,
        flex: 1,
    },
    scoreLabel: {
        fontSize: 12,
        fontWeight: "bold",
        color: "#eee4da",
        letterSpacing: 1,
    },
    scoreValue: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#ffffff",
        marginTop: 2,
    },
});
