import React from "react";
import { View, Text, StyleSheet, Modal, TouchableOpacity } from "react-native";
import { useApiError } from "../context/ApiErrorProvider";

const ApiErrorBanner: React.FC = () => {
  const { error, clearError } = useApiError();

  if (!error) return null;

  return (
    <Modal
      transparent
      animationType="fade"
      visible={!!error}
      onRequestClose={clearError}
    >
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.text}>{error}</Text>
          <TouchableOpacity style={styles.button} onPress={clearError}>
            <Text style={styles.buttonText}>Dismiss</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    backgroundColor: "#e74c3c",
    padding: 20,
    borderRadius: 12,
    width: "80%",
    alignItems: "center",
  },
  text: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: "#e74c3c",
    fontWeight: "bold",
  },
});

export default ApiErrorBanner;
