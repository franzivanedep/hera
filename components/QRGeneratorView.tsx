import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import QRCode from "react-native-qrcode-svg";
import { SafeAreaView } from "react-native-safe-area-context";

interface Props {
  qrPayload: string | null;
  qrUsed: boolean;
  showRefresh: boolean;
  onRegenerate: () => void;
}

const QRGeneratorView: React.FC<Props> = ({ qrPayload, qrUsed, showRefresh, onRegenerate }) => {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.title}>Your QR Code</Text>

        <View style={styles.qrCard}>
          {qrPayload && !qrUsed ? (
            <QRCode value={qrPayload} size={220} color="#5A4634" />
          ) : (
            <View style={styles.placeholder}>
              <Text style={styles.placeholderText}>Generating QR...</Text>
            </View>
          )}
        </View>

        {qrPayload && !qrUsed && (
          <Text style={styles.qrIdText}>{qrPayload}</Text>
        )}

        {showRefresh && (
          <TouchableOpacity style={styles.button} onPress={onRegenerate}>
            <Text style={styles.buttonText}>Refresh QR</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};

export default QRGeneratorView;

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#FAF6F0",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#5A4634",
    marginBottom: 50,
  },
  qrCard: {
    width: 280,
    height: 280,
    borderRadius: 28,
    backgroundColor: "#FFF8EE",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 5 },
    elevation: 10,
    marginBottom: 20,
  },
  placeholder: {
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderText: {
    color: "#BFAF8F",
    fontSize: 16,
    fontWeight: "500",
  },
  qrIdText: {
    marginTop: 15,
    color: "#5A4634",
    fontSize: 14,
    textAlign: "center",
    fontWeight: "500",
  },
  button: {
    marginTop: 30,
    backgroundColor: "#5A4634",
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 18,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 15,
    shadowOffset: { width: 0, height: 5 },
    elevation: 6,
  },
  buttonText: {
    color: "#FAF6F0",
    fontWeight: "600",
    fontSize: 16,
  },
});
