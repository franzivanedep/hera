import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  Share,
} from "react-native";
import { useRouter } from "expo-router";
import QRCode from "react-native-qrcode-svg";
import { Ionicons } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";
import styles from "../components/styles/Voucher";

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
    txnId: "TXN-20251011-9091",
  };

  const now = new Date();
  const formattedDate = now.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  const formattedTime = now.toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
  });

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
      {/* Receipt Card */}
      <View style={styles.receipt}>
        <View style={styles.merchantRow}>
          <View>
            <Text style={styles.merchantName}>{voucherData.merchant}</Text>
            <Text style={styles.smallMuted}>{voucherData.title}</Text>
          </View>
          <View style={styles.meta}>
            <Text style={styles.smallMuted}>{formattedDate}</Text>
            <Text style={styles.smallMuted}>{formattedTime}</Text>
          </View>
        </View>

        <View style={styles.dashedDivider} />

        <View style={styles.qrBlock}>
          <View style={styles.qrWrap}>
            <QRCode
              value={voucherData.voucherCode}
              size={150}
              backgroundColor="transparent"
            />
          </View>

          <View style={styles.codeBlock}>
            <Text style={styles.codeLabel}>VOUCHER CODE</Text>
            <Text style={styles.voucherCode}>{voucherData.voucherCode}</Text>

            <View style={styles.codeActions}>
              <TouchableOpacity style={styles.actionBtn} onPress={copyCode}>
                <Ionicons name="copy-outline" size={16} color="#5A4634" />
                <Text style={styles.actionText}>Copy</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.actionBtn, styles.actionSecondary]}
                onPress={() => router.push("/")}
              >
                <Ionicons name="home-outline" size={16} color="#5A4634" />
                <Text style={styles.actionText}>Home</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.dashedDivider} />

        <View style={styles.infoRow}>
          <Text style={styles.label}>Points Used</Text>
          <Text style={styles.value}>{voucherData.pointsUsed} pts</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Valid Until</Text>
          <Text style={styles.value}>{voucherData.validUntil}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Transaction</Text>
          <Text style={styles.value}>{voucherData.txnId}</Text>
        </View>

        <View style={styles.dashedDivider} />

        <Text style={styles.message}>{voucherData.message}</Text>

        <View style={styles.tearLineWrap}>
          <View style={styles.tearLeft} />
          <View style={styles.tearRight} />
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerMuted}>
            Present this voucher on arrival. Not redeemable for cash. Subject to
            merchant terms.
          </Text>
          <Text style={styles.website}>www.heranailspa.com</Text>
        </View>
      </View>

      {/* Bottom sticky action */}
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
