import { useState, useEffect, useCallback, useRef } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from '../../config';

const BASE_URL = API_URL  ;

interface UserDoc {
  id: string;
  [key: string]: any;
}

export default function useQRGeneratorLogic(
  qrType: "attendance" | "rewards" = "attendance",
  initialPollInterval = 10000 // start with 10s
) {
  const [userDoc, setUserDoc] = useState<UserDoc | null>(null);
  const [qrId, setQrId] = useState<string | null>(null);
  const [qrUsed, setQrUsed] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("Waiting for login...");
  const [showRefresh, setShowRefresh] = useState<boolean>(false);

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const pollIntervalRef = useRef<number>(initialPollInterval);

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
        console.error("Error loading UID:", err);
        setMessage("Failed to load user UID.");
        setShowRefresh(true);
      }
    };
    loadUser();
  }, []);

  // ---------------- Smart QR polling ----------------
  useEffect(() => {
    if (!userDoc?.id) return;

    const checkOrCreateQR = async () => {
      try {
        const qrRes = await axios.get(`${BASE_URL}/points/qr/${userDoc.id}`, {
          params: { type: qrType },
        });

        if (qrRes.data?.qrId && !qrRes.data.used) {
          setQrId(qrRes.data.qrId);
          setQrUsed(false);
          setMessage(`Active ${qrType} QR found.`);
          setShowRefresh(false);

          // ✅ Stop polling if QR is valid
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
          }
        } else {
          // Create new QR if none exists
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
        console.error("QR fetch/create error:", err);
        setQrId(null);
        setQrUsed(true);
        setMessage(`Failed to retrieve or create ${qrType} QR.`);
        setShowRefresh(true);

        // Adaptive polling: increase interval on error
        pollIntervalRef.current = Math.min(pollIntervalRef.current * 2, 60000); // max 1 min
      }
    };

    // Initial check
    checkOrCreateQR();

    // Poll only if QR is missing or used
    if (!qrId || qrUsed) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      intervalRef.current = setInterval(checkOrCreateQR, pollIntervalRef.current);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [userDoc, qrType, qrId, qrUsed]);

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

      // Reset polling interval
      pollIntervalRef.current = initialPollInterval;
    } catch (err: any) {
      console.error("QR regenerate error:", err);
      setMessage(`Failed to regenerate ${qrType} QR.`);
      setShowRefresh(true);
    }
  }, [userDoc, qrType, initialPollInterval]);

  return {
    userDoc,
    qrId,
    qrUsed,
    message,
    showRefresh,
    regenerateQR,
  };
}
