import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import QRCode from "react-native-qrcode-svg";
import { Ionicons } from "@expo/vector-icons";

const VoucherScreen = () => {
  const router = useRouter();

  const voucherData = {
    merchant: "HERA NAIL LOUNGE & SPA",
    pointsUsed: 200,
    voucherCode: "HRNLS748379ST",
    validUntil: "Dec 31, 2025",
    title: "Soft Gel Extension E-Voucher",
    message:
      "Flash this E-Voucher at the store to unlock your reward and enjoy your relaxing treatment!",
  };

  return (
    <View style={styles.container}>
      {/* Header */}
    

      {/* Card */}
      <View style={styles.card}>
        <QRCode
          value={voucherData.voucherCode}
          size={180}
          backgroundColor="transparent"
        />

        <Text style={styles.voucherTitle}>{voucherData.title}</Text>
        <Text style={styles.voucherMessage}>{voucherData.message}</Text>

        <View style={styles.line} />

        <View style={styles.row}>
          <Text style={styles.label}>Merchant</Text>
          <Text style={styles.value}>{voucherData.merchant}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Points Used</Text>
          <Text style={styles.value}>{voucherData.pointsUsed} pts</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Voucher Code</Text>
          <Text style={styles.value}>{voucherData.voucherCode}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Valid Until</Text>
          <Text style={styles.value}>{voucherData.validUntil}</Text>
        </View>

        <View style={styles.line} />

        <Text style={styles.footerText}>
          Level up your beauty rewards and indulge yourself with elegance and
          care.{"\n"}Exclusive perks & moments await.
        </Text>

        <Text style={styles.footerLink}>www.heranailspa.com</Text>
      </View>
    </View>
  );
};

export default VoucherScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F1E4", // soft beige background
    alignItems: "center",
    paddingTop: 60,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "85%",
    marginBottom: 25,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#3C2E23",
  },
  card: {
    backgroundColor: "#FFF",
    borderRadius: 20,
    width: "88%",
    alignItems: "center",
    paddingVertical: 25,
    paddingHorizontal: 20,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 4,
  },
  voucherTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#3C2E23",
    marginTop: 20,
  },
  voucherMessage: {
    textAlign: "center",
    color: "#5A4634",
    fontSize: 14,
    marginTop: 8,
    lineHeight: 20,
  },
  line: {
    height: 1,
    backgroundColor: "#E8DCC5",
    width: "100%",
    marginVertical: 18,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 10,
  },
  label: {
    color: "#7B6A55",
    fontSize: 14,
  },
  value: {
    color: "#3C2E23",
    fontWeight: "600",
    fontSize: 14,
  },
  footerText: {
    textAlign: "center",
    color: "#5A4634",
    fontSize: 13,
    marginTop: 10,
    lineHeight: 18,
  },
  footerLink: {
    textAlign: "center",
    color: "#A89174",
    fontWeight: "600",
    marginTop: 8,
    fontSize: 13,
  },
});
