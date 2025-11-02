import React from "react";
import { View, Text, TouchableOpacity, ActivityIndicator, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import QRCode from "react-native-qrcode-svg";
import styles from "../components/styles/Voucher";

interface VoucherViewProps {
  loading: boolean;
  qrId: string | null;
  voucherData: {
    merchant: string;
    pointsUsed: number;
    title: string;
    message: string;
    validUntil: string;
  };
  copyCode: () => void;
  shareVoucher: () => void;
  goHome: () => void;
}

export default function VoucherView({
  loading,
  qrId,
  voucherData,
  copyCode,
  shareVoucher,
  goHome,
}: VoucherViewProps) {
  return (
    <View style={styles.container}>
      <View style={styles.receipt}>
        <Text style={styles.merchantName}>{voucherData.merchant}</Text>
        <Text style={styles.smallMuted}>{voucherData.title}</Text>

        <View style={styles.qrBlock}>
          {loading ? (
            <ActivityIndicator size="large" color="#5A4634" />
          ) : qrId ? (
            <>
              <QRCode value={qrId} size={150} backgroundColor="transparent" />
              <Text style={styles.voucherCode}>{qrId}</Text>
            </>
          ) : (
            <Text style={styles.smallMuted}>No QR available</Text>
          )}
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
          onPress={() => Alert.alert("Tip", "Show this voucher to redeem.")}
        >
          <Text style={styles.bottomBtnText}>Show to Redeem</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.bottomBtnAlt, { width: 110 }]}
          onPress={goHome}
        >
          <Text style={styles.bottomBtnAltText}>Back Home</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
