import { useEffect, useState, useRef } from "react";
import { Alert, Share } from "react-native";
import * as Clipboard from "expo-clipboard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter, useLocalSearchParams } from "expo-router";
import axios from "axios";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { API_URL } from '../../config';

const BASE_URL = API_URL;

interface VoucherData {
  merchant: string;
  pointsUsed: number;
  title: string;
  message: string;
  validUntil: string;
}

interface RewardQRResponse {
  qrId: string;
  used?: boolean;
}

export default function useVoucherLogic() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const rewardId = Array.isArray(params.rewardId)
    ? params.rewardId[0]
    : params.rewardId || "unknown";

  const title = Array.isArray(params.title)
    ? params.title[0]
    : params.title || "Reward Voucher";

  const points = Array.isArray(params.points)
    ? params.points[0]
    : params.points || "0";

  const [uid, setUid] = useState<string | null>(null);
  const [qrId, setQrId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const fetchedRef = useRef(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
      setUid(user ? user.uid : null);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchOrCreateRewardQR = async () => {
      if (!uid || rewardId === "unknown" || fetchedRef.current) return;
      fetchedRef.current = true;
      setLoading(true);

      try {
        const cacheKey = `rewardQR_${uid}_${rewardId}`;
        let qr: string | null = null;

        // 1️⃣ Try cached QR
        const cachedQr = await AsyncStorage.getItem(cacheKey);
        if (cachedQr) {
          try {
            const checkRes = await axios.get<RewardQRResponse>(
              `${BASE_URL}/points/checkQR/${cachedQr}`
            );
            if (!checkRes.data.used) {
              qr = cachedQr;
              if (__DEV__) console.log("✅ Loaded QR from cache:", qr);
            } else {
              if (__DEV__) console.log("⚠ Cached QR used, will create new.");
            }
          } catch {
            if (__DEV__) console.log("⚠ /checkQR failed, will try server or create new QR");
          }
        }

        // 2️⃣ Try server active QR if cache invalid
        if (!qr) {
          try {
            const res = await axios.get<RewardQRResponse>(
              `${BASE_URL}/points/active/rewards/${uid}`
            );
            if (res.data?.qrId && !res.data.used) {
              qr = res.data.qrId;
              if (__DEV__) console.log("✅ Loaded existing unused QR from server:", qr);
            } else {
              if (__DEV__) console.log("⚠ No unused QR, will create new...");
            }
          } catch {
            if (__DEV__) console.log("⚠ Failed to fetch active QR from server, creating new...");
          }
        }

        // 3️⃣ Always create new QR if qr is still null
        if (!qr) {
          const createRes = await axios.post(`${BASE_URL}/points/createQR`, {
            uid,
            type: "rewards",
            rewardId,
          });
          if (createRes.data?.qrId) {
            qr = createRes.data.qrId;
            if (__DEV__) console.log("✅ New QR created:", qr);
          } else {
            throw new Error("No QR returned from server");
          }
        }

        setQrId(qr);
        if (qr) {
          await AsyncStorage.setItem(cacheKey, qr);
        }
      } catch (err: any) {
        if (__DEV__) console.error(
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

  const voucherData: VoucherData = {
    merchant: "HERA NAIL LOUNGE & SPA",
    pointsUsed: Number(points),
    title,
    message: "Flash this E-Voucher to unlock your reward.",
    validUntil: "Dec 31, 2025",
  };

  const copyCode = async () => {
    if (!qrId) return;
    try {
      await Clipboard.setStringAsync(qrId);
      Alert.alert("Copied", "Voucher code copied to clipboard");
    } catch {
      Alert.alert("Error", "Failed to copy voucher code.");
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
