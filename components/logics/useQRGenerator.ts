import { useState, useEffect, useCallback, useRef } from "react";
import axios from "axios";
import { onAuthStateChanged, User } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { auth } from "../../lib/firebase";

const BASE_URL = process.env.EXPO_PUBLIC_API_URL || "http://localhost:3001";

interface UserDoc {
  id: string;
  [key: string]: any;
}

export default function useQRGeneratorLogic(pollInterval = 5000) {
  const [userDoc, setUserDoc] = useState<UserDoc | null>(null);
  const [gmail, setGmail] = useState<string | null>(null);
  const [qrId, setQrId] = useState<string | null>(null);
  const [qrUsed, setQrUsed] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("Waiting for login...");
  const [showRefresh, setShowRefresh] = useState<boolean>(false);

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  /* ------------------------------------------------------------ */
  /* ✅ 1️⃣ Wait for Firebase Auth user */
  /* ------------------------------------------------------------ */
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user: User | null) => {
      if (!user?.email) {
        setGmail(null);
        setUserDoc(null);
        setMessage("Please log in first.");
        return;
      }

      setGmail(user.email);
      setMessage("Fetching user info...");

      try {
        // ✅ Try cached user first
        const cached = await AsyncStorage.getItem("userDoc");
        if (cached) {
          const parsed: UserDoc & { gmail: string } = JSON.parse(cached);
          if (parsed.gmail === user.email) {
            setUserDoc(parsed);
            setMessage("User loaded from cache.");
            return;
          }
        }

        // ✅ Otherwise fetch from backend
        const res = await axios.get(`${BASE_URL}/users/byGmail?gmail=${user.email}`);
        const userData: UserDoc = res.data;
        await AsyncStorage.setItem("userDoc", JSON.stringify({ ...userData, gmail: user.email }));
        setUserDoc(userData);
        setMessage("User loaded successfully.");
      } catch (err: any) {
        console.error("Error fetching user:", err?.response?.data || err.message || err);
        setMessage("Failed to load user data.");
        setShowRefresh(true);
      }
    });

    return () => unsubscribe();
  }, []);

  /* ------------------------------------------------------------ */
  /* ✅ 2️⃣ Auto-check QR state every few seconds */
  /* ------------------------------------------------------------ */
  useEffect(() => {
    if (!userDoc?.id) return;

    const checkOrCreateQR = async () => {
      try {
        const qrRes = await axios.get(`${BASE_URL}/points/qr/${userDoc.id}`);

        if (qrRes.data?.qrId && !qrRes.data.used) {
          // ✅ Active QR found
          setQrId(qrRes.data.qrId);
          setQrUsed(false);
          setMessage("Active QR found.");
          setShowRefresh(false);
        } else {
          // ❌ No active QR — create new
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
        setShowRefresh(true); // 👈 Only show button when this fails
      }
    };

    // ✅ Initial call
    checkOrCreateQR();

    // ✅ Re-run periodically
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(checkOrCreateQR, pollInterval);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [userDoc, pollInterval]);

  /* ------------------------------------------------------------ */
  /* ✅ 3️⃣ Manual refresh (only shown if something failed) */
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
  /* ✅ 4️⃣ Return everything the UI needs */
  /* ------------------------------------------------------------ */
  return {
    gmail,
    userDoc,
    qrId,
    qrUsed,
    message,
    showRefresh,   // 👈 Only true when failure occurs
    regenerateQR,  // 👈 Only used when showRefresh = true
  };
}
