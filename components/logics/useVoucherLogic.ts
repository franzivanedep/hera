import { useEffect, useState, useRef } from "react";
import { Alert, Share } from "react-native";
import * as Clipboard from "expo-clipboard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter, useLocalSearchParams } from "expo-router";
import axios from "axios";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { API_URL } from "../../config";

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
  used: boolean;
  rewardId: string;
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

  // Watch login
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
      setUid(user ? user.uid : null);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const loadQR = async () => {
      if (!uid || rewardId === "unknown" || fetchedRef.current) return;
      fetchedRef.current = true;
      setLoading(true);

      const cacheKey = `rewardQR_${uid}_${rewardId}`;
      let qr: string | null = null;

      try {
        // -----------------------------
        // 1️⃣ CHECK CACHED QR — MUST MATCH REWARD ID
        // -----------------------------
        const cached = await AsyncStorage.getItem(cacheKey);
        if (cached) {
          try {
            const res = await axios.get<RewardQRResponse>(`${BASE_URL}/points/checkQR/${cached}`);
            if (res.data.rewardId !== rewardId) {
              if (__DEV__) console.log("⚠ Cached QR rewardId mismatch. Creating new.");
              qr = null;
            } else if (!res.data.used) {
              qr = cached;
              if (__DEV__) console.log("✅ Using cached QR:", qr);
            } else {
              if (__DEV__) console.log("⚠ Cached QR used. Creating new.");
              qr = null;
            }
          } catch {
            if (__DEV__) console.log("⚠ Failed checking cached QR.");
            qr = null;
          }
        }

        // -----------------------------
        // 2️⃣ CHECK ACTIVE QR FROM SERVER — MUST MATCH REWARD ID
        // -----------------------------
        if (!qr) {
          try {
            const res = await axios.get<RewardQRResponse[]>(`${BASE_URL}/points/active/rewards/${uid}`);
            const match = res.data.find(r => r.rewardId === rewardId && r.used === false);
            if (match) {
              qr = match.qrId;
              if (__DEV__) console.log("✅ Loaded active QR from server:", qr);
            } else {
              if (__DEV__) console.log("⚠ No active QR for this reward. Creating new.");
            }
          } catch {
            if (__DEV__) console.log("⚠ Failed to fetch active QR. Creating new.");
          }
        }

        // -----------------------------
        // 3️⃣ CREATE NEW QR — IF NONE MATCHED
        // -----------------------------
        if (!qr) {
          try {
            const createRes = await axios.post(`${BASE_URL}/points/createQR`, {
              uid,
              type: "rewards",
              rewardId, // tell backend this QR belongs to THIS reward
            });

            if (createRes.data?.qrId) {
              qr = createRes.data.qrId;
              if (__DEV__) console.log("✅ NEW QR CREATED:", qr);
            } else {
              throw new Error("No QR returned from server");
            }
          } catch (err: any) {
            if (__DEV__) console.error("❌ QR Create Error:", err.response?.data);
            Alert.alert(
              "Error",
              err.response?.data?.message || "Failed to create QR"
            );
            return;
          }
        }

        // -----------------------------
        // 4️⃣ SAVE TO CACHE
        // -----------------------------
        if (qr) {
          await AsyncStorage.setItem(cacheKey, qr);
        }

        setQrId(qr);
      } catch (err: any) {
        if (__DEV__) console.error("QR Load Error:", err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };

    loadQR();
  }, [uid, rewardId]);

  // Voucher details
  const voucherData: VoucherData = {
    merchant: "HERA NAIL LOUNGE & SPA",
    pointsUsed: Number(points),
    title,
    message: "Flash this E-Voucher to unlock your reward.",
    validUntil: "Dec 31, 2025",
  };

  const copyCode = async () => {
    if (!qrId) return;
    await Clipboard.setStringAsync(qrId);
    Alert.alert("Copied", "Voucher code copied");
  };

  const shareVoucher = async () => {
    if (!qrId) return;
    const shareText = `${voucherData.title}\nCode: ${qrId}\nValid until: ${voucherData.validUntil}\n${voucherData.message}`;
    await Share.share({ message: shareText, title: voucherData.title });
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
