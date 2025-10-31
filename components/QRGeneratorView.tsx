import React from "react";
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import QRCode from "react-native-qrcode-svg";

interface Props {
  qrPayload: string | null;
  qrUsed: boolean;
  message: string;
  onRegenerate: () => void;
}

const QRGeneratorView: React.FC<Props> = ({ qrPayload, qrUsed, message, onRegenerate }) => {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.title}>Your QR Code</Text>

        <View style={styles.qrCard}>
          {qrPayload && !qrUsed ? (
            <>
              <QRCode value={qrPayload} size={220} color="#5A4634" />
              <Text style={styles.qrIdText}>{qrPayload}</Text>
            </>
          ) : (
            <Text style={styles.generatingText}>{message}</Text>
          )}
        </View>

        <Text style={styles.infoText}>{message}</Text>
        <TouchableOpacity
          style={[styles.button, qrUsed && styles.buttonDisabled]}
          onPress={onRegenerate}
          disabled={qrUsed}
        >
          <Text style={styles.buttonText}>{qrUsed ? "QR Unavailable" : "Refresh QR"}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default QRGeneratorView;

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#F8F1E4" },
  container: { flex: 1, alignItems: "center", paddingHorizontal: 20, paddingTop: 50 },
  title: { fontSize: 26, fontWeight: "700", color: "#5A4634", marginBottom: 40 },
  qrCard: {
    width: 280,
    height: 280,
    borderRadius: 24,
    backgroundColor: "#FFF8EE",
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    marginBottom: 20,
    padding: 10,
  },
  generatingText: { color: "#8A7A63", textAlign: "center" },
  qrIdText: { marginTop: 10, color: "#5A4634", fontSize: 12, textAlign: "center" },
  infoText: { color: "#5A4634", textAlign: "center", marginBottom: 20, fontSize: 14.5, lineHeight: 22 },
  button: { backgroundColor: "#5A4634", paddingVertical: 14, paddingHorizontal: 35, borderRadius: 14 },
  buttonDisabled: { opacity: 0.6 },
  buttonText: { color: "#F8F1E4", fontWeight: "600", fontSize: 15 },
});
