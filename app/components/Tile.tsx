import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";
import { Cell } from "../types/game";

interface TileProps {
    value: Cell;
    size: number;
}

const getTileStyles = (value: number) => {
    const styles: {
        [key: number]: { backgroundColor: string; color: string };
    } = {
        2: { backgroundColor: "#eee4da", color: "#776e65" },
        4: { backgroundColor: "#ede0c8", color: "#776e65" },
        8: { backgroundColor: "#f2b179", color: "#f9f6f2" },
        16: { backgroundColor: "#f59563", color: "#f9f6f2" },
        32: { backgroundColor: "#f67c5f", color: "#f9f6f2" },
        64: { backgroundColor: "#f65e3b", color: "#f9f6f2" },
        128: { backgroundColor: "#edcf72", color: "#f9f6f2" },
        256: { backgroundColor: "#edcc61", color: "#f9f6f2" },
        512: { backgroundColor: "#edc850", color: "#f9f6f2" },
        1024: { backgroundColor: "#edc53f", color: "#f9f6f2" },
        2048: { backgroundColor: "#edc22e", color: "#f9f6f2" },
    };

    return styles[value] || { backgroundColor: "#3c3a32", color: "#f9f6f2" };
};

const getFontSize = (value: number, size: number) => {
    const baseSize = size * 0.35;
    if (value >= 1000) return baseSize * 0.8;
    if (value >= 100) return baseSize * 0.9;
    return baseSize;
};

export const Tile: React.FC<TileProps> = ({ value, size }) => {
    const scaleAnim = useRef(new Animated.Value(value ? 1 : 0)).current;
    const opacityAnim = useRef(new Animated.Value(value ? 1 : 0)).current;

    useEffect(() => {
        if (value !== null) {
            Animated.parallel([
                Animated.spring(scaleAnim, {
                    toValue: 1,
                    friction: 8,
                    tension: 100,
                    useNativeDriver: true,
                }),
                Animated.timing(opacityAnim, {
                    toValue: 1,
                    duration: 200,
                    useNativeDriver: true,
                }),
            ]).start();
        } else {
            scaleAnim.setValue(0);
            opacityAnim.setValue(0);
        }
    }, [value, scaleAnim, opacityAnim]);

    if (value === null) {
        return (
            <View
                style={[styles.emptyContainer, { width: size, height: size }]}
            />
        );
    }

    const tileStyle = getTileStyles(value);

    return (
        <Animated.View
            style={[
                styles.tile,
                {
                    width: size,
                    height: size,
                    backgroundColor: tileStyle.backgroundColor,
                    transform: [{ scale: scaleAnim }],
                    opacity: opacityAnim,
                },
            ]}
        >
            <Text
                style={[
                    styles.tileText,
                    {
                        color: tileStyle.color,
                        fontSize: getFontSize(value, size),
                    },
                ]}
            >
                {value}
            </Text>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    emptyContainer: {
        backgroundColor: "rgba(238, 228, 218, 0.35)",
        borderRadius: 6,
    },
    tile: {
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 6,
        elevation: 2,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
    },
    tileText: {
        fontWeight: "bold",
        textAlign: "center",
    },
});
