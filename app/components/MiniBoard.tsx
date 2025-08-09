import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Board } from "../types/game";

interface MiniBoardProps {
    board: Board;
    suggestedMove?: string;
}

const getTileColor = (value: number | null) => {
    if (!value) return "#cdc1b4";

    const colors: { [key: number]: string } = {
        2: "#eee4da",
        4: "#ede0c8",
        8: "#f2b179",
        16: "#f59563",
        32: "#f67c5f",
        64: "#f65e3b",
        128: "#edcf72",
        256: "#edcc61",
        512: "#edc850",
        1024: "#edc53f",
        2048: "#edc22e",
    };

    return colors[value] || "#3c3a32";
};

const getTileTextColor = (value: number | null) => {
    if (!value) return "transparent";
    return value <= 4 ? "#776e65" : "#f9f6f2";
};

const getDirectionArrow = (direction: string) => {
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
            return "";
    }
};

export const MiniBoard: React.FC<MiniBoardProps> = ({
    board,
    suggestedMove,
}) => {
    return (
        <View style={styles.container}>
            <View style={styles.boardHeader}>
                <Text style={styles.boardTitle}>Current Board</Text>
                {suggestedMove && (
                    <View style={styles.suggestionIndicator}>
                        <Text style={styles.suggestionText}>
                            Suggested: {getDirectionArrow(suggestedMove)}
                        </Text>
                    </View>
                )}
            </View>

            <View style={styles.board}>
                {board.map((row, rowIndex) => (
                    <View key={rowIndex} style={styles.row}>
                        {row.map((cell, colIndex) => (
                            <View
                                key={`${rowIndex}-${colIndex}`}
                                style={[
                                    styles.cell,
                                    { backgroundColor: getTileColor(cell) },
                                ]}
                            >
                                {cell && (
                                    <Text
                                        style={[
                                            styles.cellText,
                                            {
                                                color: getTileTextColor(cell),
                                                fontSize:
                                                    cell >= 1000
                                                        ? 8
                                                        : cell >= 100
                                                        ? 9
                                                        : 10,
                                            },
                                        ]}
                                    >
                                        {cell}
                                    </Text>
                                )}
                            </View>
                        ))}
                    </View>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        marginVertical: 10,
    },
    boardHeader: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        marginBottom: 8,
    },
    boardTitle: {
        fontSize: 14,
        fontWeight: "600",
        color: "#776e65",
    },
    suggestionIndicator: {
        backgroundColor: "#8f7a66",
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
    },
    suggestionText: {
        fontSize: 12,
        color: "#f9f6f2",
        fontWeight: "600",
    },
    board: {
        backgroundColor: "#bbada0",
        borderRadius: 6,
        padding: 3,
        width: 120,
        height: 120,
    },
    row: {
        flexDirection: "row",
        height: 26,
        marginBottom: 2,
    },
    cell: {
        width: 26,
        height: 26,
        borderRadius: 2,
        marginRight: 2,
        justifyContent: "center",
        alignItems: "center",
    },
    cellText: {
        fontWeight: "bold",
        textAlign: "center",
    },
});
