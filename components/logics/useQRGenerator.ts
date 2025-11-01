import { useState, useEffect, useCallback, useRef } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BASE_URL = process.env.EXPO_PUBLIC_API_URL || "http://localhost:3001";

interface UserDoc {
  id: string;
  [key: string]: any;
}

export default function useQRGeneratorLogic(pollInterval = 5000) {
  const [userDoc, setUserDoc] = useState<UserDoc | null>(null);
  const [qrId, setQrId] = useState<string | null>(null);
  const [qrUsed, setQrUsed] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("Waiting for login...");
  const [showRefresh, setShowRefresh] = useState<boolean>(false);

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  /* ------------------------------------------------------------ */
  /* ✅ 1️⃣ Load UID from AsyncStorage */
  /* ------------------------------------------------------------ */
  useEffect(() => {
    const loadUser = async () => {
      try {
        const uid = await AsyncStorage.getItem("uid");
        if (!uid) {
          setMessage("No logged-in user found.");
          setShowRefresh(true);
          return;
        }

        // Only UID is needed for QR logic
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

  /* ------------------------------------------------------------ */
  /* ✅ 2️⃣ Auto-check QR state periodically */
  /* ------------------------------------------------------------ */
  useEffect(() => {
    if (!userDoc?.id) return;

    const checkOrCreateQR = async () => {
      try {
        const qrRes = await axios.get(`${BASE_URL}/points/qr/${userDoc.id}`);

        if (qrRes.data?.qrId && !qrRes.data.used) {
          setQrId(qrRes.data.qrId);
          setQrUsed(false);
          setMessage("Active QR found.");
          setShowRefresh(false);
        } else {
          setMessage("No active QR found. Creating one...");
          const newQrRes = await axios.post(`${BASE_URL}/points/createQR`, {
            uid: userDoc.id,
            type: "attendance",
            createdAt: new Date().toISOString(),
          });
          setQrId(newQrRes.data.qrId);
          setQrUsed(false);
          setMessage("New QR created successfully.");
          setShowRefresh(false);
        }
      } catch (err: any) {
        console.error("QR fetch/create error:", err?.response?.data || err.message || err);
        setQrId(null);
        setQrUsed(true);
        setMessage("Failed to retrieve or create QR. Please try again.");
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
  }, [userDoc, pollInterval]);

  /* ------------------------------------------------------------ */
  /* ✅ 3️⃣ Manual QR regeneration */
  /* ------------------------------------------------------------ */
  const regenerateQR = useCallback(async () => {
    if (!userDoc?.id) return;

    try {
      setMessage("Regenerating QR...");
      const res = await axios.post(`${BASE_URL}/points/createQR`, {
        uid: userDoc.id,
        type: "attendance",
        regeneratedAt: new Date().toISOString(),
      });
      setQrId(res.data.qrId);
      setQrUsed(false);
      setMessage("QR regenerated successfully.");
      setShowRefresh(false);
    } catch (err: any) {
      console.error("QR regenerate error:", err?.response?.data || err.message || err);
      setMessage("Failed to regenerate QR.");
      setShowRefresh(true);
    }
  }, [userDoc]);

  /* ------------------------------------------------------------ */
  /* ✅ 4️⃣ Return values for UI */
  /* ------------------------------------------------------------ */
  return {
    userDoc,
    qrId,
    qrUsed,
    message,
    showRefresh,   // true only on failure
    regenerateQR,  // used when showRefresh = true
  };
}
