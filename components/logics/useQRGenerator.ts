import { useState, useEffect, useCallback, useRef } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BASE_URL = process.env.EXPO_PUBLIC_API_URL || "http://localhost:3001";

interface UserDoc {
  id: string;
  [key: string]: any;
}

export default function useQRGeneratorLogic(
  qrType: "attendance" | "rewards" = "attendance",
  pollInterval = 5000
) {
  const [userDoc, setUserDoc] = useState<UserDoc | null>(null);
  const [qrId, setQrId] = useState<string | null>(null);
  const [qrUsed, setQrUsed] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("Waiting for login...");
  const [showRefresh, setShowRefresh] = useState<boolean>(false);

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // ---------------- Load UID ----------------
  useEffect(() => {
    const loadUser = async () => {
      try {
        const uid = await AsyncStorage.getItem("uid");
        if (!uid) {
          setMessage("No logged-in user found.");
          setShowRefresh(true);
          return;
        }
        setUserDoc({ id: uid });
        setMessage("User loaded successfully.");
        setShowRefresh(false);
      } catch (err: any) {
        console.error("Error loading UID:", err.message || err);
        setMessage("Failed to load user UID.");
        setShowRefresh(true);
      }
    };
    loadUser();
  }, []);

  // ---------------- Auto-check QR ----------------
  useEffect(() => {
    if (!userDoc?.id) return;

    const checkOrCreateQR = async () => {
      try {
        // 1️⃣ Fetch existing QR of this type
        const qrRes = await axios.get(`${BASE_URL}/points/qr/${userDoc.id}`, {
          params: { type: qrType },
        });

        if (qrRes.data?.qrId && !qrRes.data.used) {
          setQrId(qrRes.data.qrId);
          setQrUsed(false);
          setMessage(`Active ${qrType} QR found.`);
          setShowRefresh(false);
        } else {
          // 2️⃣ Create new QR if none exists
          setMessage(`No active ${qrType} QR found. Creating one...`);
          const newQrRes = await axios.post(`${BASE_URL}/points/createQR`, {
            uid: userDoc.id,
            type: qrType,
          });
          setQrId(newQrRes.data.qrId);
          setQrUsed(false);
          setMessage(`New ${qrType} QR created successfully.`);
          setShowRefresh(false);
        }
      } catch (err: any) {
        console.error("QR fetch/create error:", err?.response?.data || err.message || err);
        setQrId(null);
        setQrUsed(true);
        setMessage(`Failed to retrieve or create ${qrType} QR.`);
        setShowRefresh(true);
      }
    };

    // Initial call
    checkOrCreateQR();

    // Poll periodically
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(checkOrCreateQR, pollInterval);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [userDoc, qrType, pollInterval]);

  // ---------------- Manual Regenerate ----------------
  const regenerateQR = useCallback(async () => {
    if (!userDoc?.id) return;

    try {
      setMessage(`Regenerating ${qrType} QR...`);
      const res = await axios.post(`${BASE_URL}/points/createQR`, {
        uid: userDoc.id,
        type: qrType,
      });
      setQrId(res.data.qrId);
      setQrUsed(false);
      setMessage(`${qrType} QR regenerated successfully.`);
      setShowRefresh(false);
    } catch (err: any) {
      console.error("QR regenerate error:", err?.response?.data || err.message || err);
      setMessage(`Failed to regenerate ${qrType} QR.`);
      setShowRefresh(true);
    }
  }, [userDoc, qrType]);

  return {
    userDoc,
    qrId,
    qrUsed,
    message,
    showRefresh,
    regenerateQR,
  };
}
