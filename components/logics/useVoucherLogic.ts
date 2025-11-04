import { useEffect, useState } from "react";
import { Alert, Share } from "react-native";
import * as Clipboard from "expo-clipboard";
import { useRouter, useLocalSearchParams } from "expo-router";
import axios from "axios";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/lib/firebase";

const BASE_URL = process.env.EXPO_PUBLIC_API_URL || "http://localhost:3001";

interface VoucherData {
  merchant: string;
  pointsUsed: number;
  title: string;
  message: string;
  validUntil: string;
}

interface RewardQRResponse {
  qrId: string;
}

export default function useVoucherLogic() {
  const router = useRouter();
  const params = useLocalSearchParams();

  /* ---------------- Reward parameters ---------------- */
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

  /* ---------------- State ---------------- */
  const [uid, setUid] = useState<string | null>(null);
  const [qrId, setQrId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  /* ---------------- Firebase auth listener ---------------- */
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
      setUid(user ? user.uid : null);
    });
    return () => unsubscribe();
  }, []);

  /* ---------------- Fetch or create rewards QR ---------------- */
  useEffect(() => {
    const fetchOrCreateRewardQR = async () => {
      if (!uid || rewardId === "unknown") return;
      setLoading(true);

      try {
        // 1️⃣ Fetch existing unused reward QR
        const res = await axios.get<RewardQRResponse>(
          `${BASE_URL}/points/active/rewards/${uid}`
        );

        if (res.data?.qrId) {
          setQrId(res.data.qrId);
          console.log("✅ Existing unused reward QR loaded:", res.data.qrId);
        } else {
          // 2️⃣ No QR found → create a new one
          const createRes = await axios.post(`${BASE_URL}/points/createQR`, {
            uid,
            type: "rewards",
            rewardId,
          });
          setQrId(createRes.data.qrId);
          console.log("✅ New reward QR created:", createRes.data.qrId);
        }
      } catch (err: any) {
        console.error(
          "Error fetching or creating reward QR:",
          err.response?.data || err.message
        );
        Alert.alert(
          "Error",
          err.response?.data?.message || "Failed to fetch or create reward QR"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchOrCreateRewardQR();
  }, [uid, rewardId]);

  /* ---------------- Voucher display data ---------------- */
  const voucherData: VoucherData = {
    merchant: "HERA NAIL LOUNGE & SPA",
    pointsUsed: Number(points),
    title,
    message: "Flash this E-Voucher to unlock your reward.",
    validUntil: "Dec 31, 2025",
  };

  /* ---------------- Copy QR code ---------------- */
  const copyCode = async () => {
    if (!qrId) return;
    try {
      await Clipboard.setStringAsync(qrId);
      Alert.alert("Copied", "Voucher code copied to clipboard");
    } catch {
      Alert.alert("Error", "Failed to copy voucher code.");
    }
  };

  /* ---------------- Share QR code ---------------- */
  const shareVoucher = async () => {
    if (!qrId) return;
    try {
      const shareText = `${voucherData.title}\nCode: ${qrId}\nValid until: ${voucherData.validUntil}\n${voucherData.message}`;
      await Share.share({ message: shareText, title: voucherData.title });
    } catch {
      Alert.alert("Error", "Couldn't open share dialog.");
    }
  };

  /* ---------------- Navigation ---------------- */
  const goHome = () => router.push("/");

  return {
    loading,
    qrId,
    voucherData,
    copyCode,
    shareVoucher,
    goHome,
  };
}
