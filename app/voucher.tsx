// src/screens/VoucherScreen.tsx
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  Share,
  ActivityIndicator,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import QRCode from "react-native-qrcode-svg";
import { Ionicons } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";
import axios from "axios";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/lib/firebase";
import styles from "../components/styles/Voucher";

const BASE_URL = process.env.EXPO_PUBLIC_API_URL;

const VoucherScreen = () => {
  const router = useRouter();
  const params = useLocalSearchParams();

  // ✅ Parse route params safely
  const rewardId = Array.isArray(params.rewardId)
    ? params.rewardId[0]
    : params.rewardId || "unknown";

  const title = Array.isArray(params.title)
    ? params.title[0]
    : params.title || "Reward Voucher";

  const description = Array.isArray(params.description)
    ? params.description[0]
    : params.description || "Enjoy your reward!";

  const points = Array.isArray(params.points)
    ? params.points[0]
    : params.points || "0";

  const [uid, setUid] = useState<string | null>(null);
  const [qrId, setQrId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // ✅ Firebase Auth Listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
      if (user) setUid(user.uid);
      else setUid(null);
    });
    return () => unsubscribe();
  }, []);

  // ✅ Generate reward QR
  useEffect(() => {
    const generateRewardQR = async () => {
      if (!uid || rewardId === "unknown") return;

      try {
        setLoading(true);
        const res = await axios.post(`${BASE_URL}/points/createQR`, {
          uid,
          type: "rewards",
          rewardId, // ✅ Document ID used here
        });
        setQrId(res.data.qrId);
      } catch (error: any) {
        console.error("Error creating reward QR:", error);
        Alert.alert("Error", error.response?.data?.message || "Failed to generate QR");
      } finally {
        setLoading(false);
      }
    };
    generateRewardQR();
  }, [uid, rewardId]);

  const voucherData = {
    merchant: "HERA NAIL LOUNGE & SPA",
    pointsUsed: Number(points),
    title,
    message: "Flash this E-Voucher to unlock your reward.",
    validUntil: "Dec 31, 2025",
  };

  const copyCode = async () => {
    if (qrId) {
      await Clipboard.setStringAsync(qrId);
      Alert.alert("Copied", "Voucher code copied to clipboard");
    }
  };

  const shareVoucher = async () => {
    if (!qrId) return;
    try {
      const shareText = `${voucherData.title}\nCode: ${qrId}\nValid until: ${voucherData.validUntil}\n${voucherData.message}`;
      await Share.share({ message: shareText, title: voucherData.title });
    } catch {
      Alert.alert("Error", "Couldn't open share dialog.");
    }
  };

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

        <TouchableOpacity style={[styles.actionBtn, styles.actionSecondary]} onPress={shareVoucher}>
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
          onPress={() => router.push("/")}
        >
          <Text style={styles.bottomBtnAltText}>Back Home</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default VoucherScreen;
