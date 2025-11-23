import React, { useContext } from "react";
import { Modal, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { NetworkContext } from "../context/NetworkProvider";

const OfflineModal = () => {
  const { isOnline, isConnectionFast, refreshConnection } =
    useContext(NetworkContext);

  const shouldShow = !isOnline || !isConnectionFast;

  return (
    <Modal visible={shouldShow} animationType="fade" transparent>
      <View style={styles.overlay}>
        <View style={styles.modalBox}>
          <Text style={styles.title}>
            {isOnline ? "Slow Internet" : "No Internet"}
          </Text>

          <Text style={styles.description}>
            {isOnline
              ? "Your internet connection is poor. Please try refreshing."
              : "Please connect to the internet to continue."}
          </Text>

          <TouchableOpacity style={styles.button} onPress={refreshConnection}>
            <Text style={styles.buttonText}>Refresh</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalBox: {
    width: "80%",
    backgroundColor: "#F3EDE3", // beige
    borderRadius: 15,
    padding: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#5A4634",
    marginBottom: 10,
  },
  description: {
    textAlign: "center",
    color: "#5A4634",
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#5A4634",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
  },
});

export default OfflineModal;
