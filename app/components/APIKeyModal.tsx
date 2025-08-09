import React, { useState } from "react";
import {
    Dimensions,
    Modal,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

interface APIKeyModalProps {
    visible: boolean;
    onClose: () => void;
    onSubmit: (apiKey: string) => void;
}

const { width: screenWidth } = Dimensions.get("window");

export const APIKeyModal: React.FC<APIKeyModalProps> = ({
    visible,
    onClose,
    onSubmit,
}) => {
    const [apiKey, setApiKey] = useState("");

    const handleSubmit = () => {
        if (apiKey.trim()) {
            onSubmit(apiKey.trim());
            setApiKey("");
        }
    };

    const handleClose = () => {
        setApiKey("");
        onClose();
    };

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
                        <Text style={styles.title}>🔑 API Key Required</Text>
                        <TouchableOpacity
                            onPress={handleClose}
                            style={styles.closeButton}
                        >
                            <Text style={styles.closeText}>✕</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.content}>
                        <Text style={styles.description}>
                            To get AI suggestions, please enter your OpenAI API
                            key. This will only be used for this session and
                            won't be stored.
                        </Text>

                        <View style={styles.inputSection}>
                            <Text style={styles.inputLabel}>
                                OpenAI API Key
                            </Text>
                            <TextInput
                                style={styles.input}
                                value={apiKey}
                                onChangeText={setApiKey}
                                placeholder="sk-..."
                                secureTextEntry
                                autoCapitalize="none"
                                autoCorrect={false}
                            />
                        </View>

                        <Text style={styles.helpText}>
                            Get your API key from platform.openai.com/api-keys
                        </Text>

                        <View style={styles.buttonContainer}>
                            <TouchableOpacity
                                style={[styles.button, styles.submitButton]}
                                onPress={handleSubmit}
                                disabled={!apiKey.trim()}
                                activeOpacity={0.7}
                            >
                                <Text
                                    style={[
                                        styles.buttonText,
                                        !apiKey.trim() && styles.disabledText,
                                    ]}
                                >
                                    Get AI Advice
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[styles.button, styles.cancelButton]}
                                onPress={handleClose}
                                activeOpacity={0.7}
                            >
                                <Text
                                    style={[
                                        styles.buttonText,
                                        styles.cancelText,
                                    ]}
                                >
                                    Cancel
                                </Text>
                            </TouchableOpacity>
                        </View>
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
        borderRadius: 12,
        padding: 20,
        maxWidth: screenWidth * 0.9,
        minWidth: screenWidth * 0.8,
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
        marginBottom: 20,
    },
    title: {
        fontSize: 20,
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
    content: {
        gap: 15,
    },
    description: {
        fontSize: 14,
        color: "#776e65",
        lineHeight: 20,
        textAlign: "center",
    },
    inputSection: {
        gap: 8,
    },
    inputLabel: {
        fontSize: 14,
        color: "#776e65",
        fontWeight: "600",
    },
    input: {
        borderWidth: 2,
        borderColor: "#cdc1b4",
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 10,
        fontSize: 14,
        color: "#776e65",
        backgroundColor: "#ffffff",
    },
    helpText: {
        fontSize: 12,
        color: "#8f7a66",
        textAlign: "center",
        fontStyle: "italic",
    },
    buttonContainer: {
        flexDirection: "row",
        gap: 10,
        marginTop: 10,
    },
    button: {
        borderRadius: 6,
        paddingVertical: 12,
        paddingHorizontal: 16,
        alignItems: "center",
        flex: 1,
    },
    submitButton: {
        backgroundColor: "#8f7a66",
    },
    cancelButton: {
        backgroundColor: "transparent",
        borderWidth: 2,
        borderColor: "#cdc1b4",
    },
    buttonText: {
        color: "#f9f6f2",
        fontSize: 14,
        fontWeight: "600",
    },
    disabledText: {
        opacity: 0.5,
    },
    cancelText: {
        color: "#776e65",
    },
});
