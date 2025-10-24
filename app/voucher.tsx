// src/screens/VoucherScreen.tsx
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  Share,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import QRCode from "react-native-qrcode-svg";
import { Ionicons } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";
import styles from "../components/styles/Voucher";

const VoucherScreen = () => {
  const router = useRouter();
  const params = useLocalSearchParams();

  const title = Array.isArray(params.title) ? params.title[0] : params.title || "Reward Voucher";
  const description = Array.isArray(params.description)
    ? params.description[0]
    : params.description || "Enjoy your well-deserved pampering!";
  const points = Array.isArray(params.points)
    ? params.points[0]
    : params.points || "0";

  const voucherCode = `HRNLS-${Math.floor(Math.random() * 1000000)}`;
  const voucherData = {
    merchant: "HERA NAIL LOUNGE & SPA",
    pointsUsed: Number(points),
    voucherCode,
    validUntil: "Dec 31, 2025",
    title,
    message:
      "Flash this E-Voucher at the store to unlock your reward and enjoy your relaxing treatment!",
    txnId: `TXN-${Date.now()}`,
  };

  const copyCode = async () => {
    await Clipboard.setStringAsync(voucherData.voucherCode);
    Alert.alert("Copied", "Voucher code copied to clipboard");
  };

  const shareVoucher = async () => {
    try {
      const shareText = `${voucherData.title}\nCode: ${voucherData.voucherCode}\nValid until: ${voucherData.validUntil}\n${voucherData.message}`;
      await Share.share({
        message: shareText,
        title: voucherData.title,
      });
    } catch (e) {
      Alert.alert("Oops", "Couldn't open share dialog.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.receipt}>
        <View style={styles.merchantRow}>
          <View>
            <Text style={styles.merchantName}>{voucherData.merchant}</Text>
            <Text style={styles.smallMuted}>{voucherData.title}</Text>
          </View>
        </View>

        <View style={styles.dashedDivider} />

        <View style={styles.qrBlock}>
          <QRCode
            value={voucherData.voucherCode}
            size={150}
            backgroundColor="transparent"
          />
          <Text style={styles.voucherCode}>{voucherData.voucherCode}</Text>
        </View>

        <Text style={styles.message}>{voucherData.message}</Text>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Points Used</Text>
          <Text style={styles.value}>{voucherData.pointsUsed} pts</Text>
        </View>

        <TouchableOpacity style={styles.actionBtn} onPress={copyCode}>
          <Ionicons name="copy-outline" size={16} color="#5A4634" />
          <Text style={styles.actionText}>Copy Code</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionBtn, styles.actionSecondary]}
          onPress={shareVoucher}
        >
          <Ionicons name="share-outline" size={16} color="#5A4634" />
          <Text style={styles.actionText}>Share</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={[styles.bottomBtn, { flex: 1, marginRight: 8 }]}
          onPress={() =>
            Alert.alert("Tip", "Show this voucher to the cashier to redeem.")
          }
        >
          <Text style={styles.bottomBtnText}>Show to Redeem</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.bottomBtnAlt, { width: 110 }]}
          onPress={() => router.push("/")}
        >
          <Text style={styles.bottomBtnAltText}>Back Home</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default VoucherScreen;
