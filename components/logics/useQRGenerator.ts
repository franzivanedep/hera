import { useState, useEffect, useCallback, useRef } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "../../config";
import { useApiError } from "@/context/ApiErrorProvider"; 

const BASE_URL = API_URL;

interface UserDoc {
  id: string;
  [key: string]: any;
}

export default function useQRGeneratorLogic(
  qrType: "attendance" | "rewards" = "attendance",
  initialPollInterval = 10000 // start with 10s
) {
  const { setError } = useApiError(); // ✅ get setError
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
          setError("No logged-in user found."); // ✅ global error
          return;
        }
        setUserDoc({ id: uid });
        setMessage("User loaded successfully.");
        setShowRefresh(false);
        setError(null); // ✅ clear previous errors
      } catch (err: any) {
        console.error("Error loading UID:", err);
        setMessage("Failed to load user UID.");
        setShowRefresh(true);
        setError("Failed to load user UID."); // ✅ global error
      }
    };
    loadUser();
  }, [setError]);

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
          setError(null); // ✅ clear errors

          if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
          }
        } else {
          setMessage(`No active ${qrType} QR found. Creating one...`);
          const newQrRes = await axios.post(`${BASE_URL}/points/createQR`, {
            uid: userDoc.id,
            type: qrType,
          });
          setQrId(newQrRes.data.qrId);
          setQrUsed(false);
          setMessage(`New ${qrType} QR created successfully.`);
          setShowRefresh(false);
          setError(null); // ✅ clear errors
        }
      } catch (err: any) {
        console.error("QR fetch/create error:", err);
        setQrId(null);
        setQrUsed(true);
        setMessage(`Failed to retrieve or create ${qrType} QR.`);
        setShowRefresh(true);

        // ✅ send to global banner
        if (axios.isAxiosError(err) && err.response?.status === 500) {
          setError("Server error (500). Please try again later.");
        } else {
          setError("Failed to fetch or create QR.");
        }

        pollIntervalRef.current = Math.min(pollIntervalRef.current * 2, 60000);
      }
    };

    checkOrCreateQR();

    if (!qrId || qrUsed) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      intervalRef.current = setInterval(checkOrCreateQR, pollIntervalRef.current);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [userDoc, qrType, qrId, qrUsed, setError]);

  // ---------------- Manual Regenerate ----------------
  const regenerateQR = useCallback(async () => {
    if (!userDoc?.id) return;

    try {
      setMessage(`Regenerating ${qrType} QR...`);
      const res = await axios.post(`${BASE_URL}/points/createQR`, {
        uid: userDoc.id,
        type: qrType,
        "rewardId": null

      });
      setQrId(res.data.qrId);
      setQrUsed(false);
      setMessage(`${qrType} QR regenerated successfully.`);
      setShowRefresh(false);
      setError(null); // ✅ clear errors
      pollIntervalRef.current = initialPollInterval;
    } catch (err: any) {
      console.error("QR regenerate error:", err);
      setMessage(`Failed to regenerate ${qrType} QR.`);
      setShowRefresh(true);

      // ✅ global error
      if (axios.isAxiosError(err) && err.response?.status === 500) {
        setError("Server error (500) while regenerating QR.");
      } else {
        setError("Failed to regenerate QR.");
      }
    }
  }, [userDoc, qrType, initialPollInterval, setError]);

  return {
    userDoc,
    qrId,
    qrUsed,
    message,
    showRefresh,
    regenerateQR,
  };
}
