import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { Board, BOARD_SIZE } from "../types/game";
import { Tile } from "./Tile";

interface GameBoardProps {
    board: Board;
}

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
const BOARD_PADDING = 20;
const TILE_GAP = 8;
const MAX_BOARD_WIDTH = 350;
const AVAILABLE_WIDTH = Math.min(screenWidth * 0.85, MAX_BOARD_WIDTH);
const TILE_SIZE = (AVAILABLE_WIDTH - TILE_GAP * (BOARD_SIZE + 1)) / BOARD_SIZE;
const BOARD_WIDTH = TILE_SIZE * BOARD_SIZE + TILE_GAP * (BOARD_SIZE + 1);

export const GameBoard: React.FC<GameBoardProps> = ({ board }) => {
    return (
        <View style={styles.container}>
            <View style={styles.board}>
                {board.map((row, rowIndex) => (
                    <View key={rowIndex} style={styles.row}>
                        {row.map((cell, colIndex) => (
                            <View
                                key={`${rowIndex}-${colIndex}`}
                                style={styles.tileContainer}
                            >
                                <Tile value={cell} size={TILE_SIZE} />
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
        paddingHorizontal: BOARD_PADDING,
        paddingVertical: 10,
        alignItems: "center",
    },
    board: {
        backgroundColor: "#bbada0",
        borderRadius: 10,
        padding: TILE_GAP,
        width: BOARD_WIDTH,
        height: BOARD_WIDTH,
        elevation: 3,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    row: {
        flexDirection: "row",
        height: TILE_SIZE,
        marginBottom: TILE_GAP,
        justifyContent: "space-between",
    },
    tileContainer: {
        width: TILE_SIZE,
        height: TILE_SIZE,
        justifyContent: "center",
        alignItems: "center",
    },
});
