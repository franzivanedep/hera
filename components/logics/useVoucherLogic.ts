import { useEffect, useState } from "react";
import { Alert, Share } from "react-native"; // ✅ Import Share here
import * as Clipboard from "expo-clipboard";
import { useRouter, useLocalSearchParams } from "expo-router";
import QRCode from "react-native-qrcode-svg";
import axios from "axios";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/lib/firebase";

const BASE_URL = process.env.EXPO_PUBLIC_API_URL;

export default function useVoucherLogic() {
  const router = useRouter();
  const params = useLocalSearchParams();

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

  // ✅ Firebase auth listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
      setUid(user ? user.uid : null);
    });
    return () => unsubscribe();
  }, []);

  // ✅ Fetch existing active QR
  const fetchActiveQR = async (userId: string) => {
    try {
      const res = await axios.get(`${BASE_URL}/points/active/${userId}/rewards`);
      if (res.data?.qrId) {
        setQrId(res.data.qrId);
        console.log("✅ Existing active QR loaded:", res.data.qrId);
      }
    } catch {
      console.log("ℹ️ No existing active QR found.");
    }
  };

  // ✅ Generate or reuse QR
  useEffect(() => {
    const generateRewardQR = async () => {
      if (!uid || rewardId === "unknown") return;

      try {
        setLoading(true);
        const res = await axios.post(`${BASE_URL}/points/createQR`, {
          uid,
          type: "rewards",
          rewardId,
        });
        setQrId(res.data.qrId);
      } catch (error: any) {
        const msg = error.response?.data?.message;
        console.warn("⚠️ QR creation response:", msg);

        if (msg?.toLowerCase().includes("active qr already exists")) {
          await fetchActiveQR(uid);
        } else {
          Alert.alert("Error", msg || "Failed to generate QR");
        }
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
