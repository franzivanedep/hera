import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import QRCode from "react-native-qrcode-svg";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

interface Props {
  qrPayload: string | null;
  qrUsed: boolean;
  showRefresh: boolean;
  onRegenerate: () => void;
}

const QRGeneratorView: React.FC<Props> = ({ qrPayload, qrUsed, showRefresh, onRegenerate }) => {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        {/* Back Button */}
        <TouchableOpacity style={styles.backButton} onPress={() => router.push("/")}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>

        <Text style={styles.title}>Your QR Code</Text>

        {/* QR Card */}
        <View style={styles.qrCard}>
          {qrPayload && !qrUsed ? (
            <QRCode value={qrPayload} size={220} color="#5A4634" />
          ) : (
            <View style={styles.placeholder}>
              <ActivityIndicator size="large" color="#5A4634" />
              <Text style={styles.placeholderText}>Generating QR...</Text>
            </View>
          )}
        </View>

        {qrPayload && !qrUsed && (
          <>
            <Text style={styles.subtitle}>Scan this QR to earn 20 points</Text>
            <Text style={styles.qrIdText}>Or show this code to the crew:</Text>
            <Text style={styles.qrIdCode}>{qrPayload}</Text>
          </>
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
    backgroundColor: "#F7F3EE", // soft beige background
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  backButton: {
    position: "absolute",
    top: 20,
    left: 20,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
  },
  backButtonText: {
    fontSize: 18,
    color: "#5A4634",
    fontWeight: "600",
  },
  title: {
    fontSize: 30,
    fontWeight: "800",
    color: "#5A4634",
    marginBottom: 30,
  },
  qrCard: {
    width: 280,
    height: 280,
    borderRadius: 32,
    backgroundColor: "#FFF",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 10 },
    elevation: 10,
    marginBottom: 20,
  },
  placeholder: {
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderText: {
    marginTop: 12,
    color: "#BFAF8F",
    fontSize: 16,
    fontWeight: "500",
  },
  subtitle: {
    marginTop: 10,
    color: "#5A4634",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  qrIdText: {
    marginTop: 8,
    color: "#5A4634",
    fontSize: 14,
    textAlign: "center",
    fontWeight: "500",
  },
  qrIdCode: {
    marginTop: 4,
    color: "#5A4634",
    fontSize: 16,
    fontWeight: "700",
    textAlign: "center",
  },
  button: {
    marginTop: 30,
    backgroundColor: "#5A4634",
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 18,
    shadowColor: "#000",
    shadowOpacity: 0.2,
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
