import { useState, useEffect, useCallback } from "react";
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
  const [qrId, setQrId] = useState<string | null>(null);
  const [qrUsed, setQrUsed] = useState<boolean>(false); // always true/false
  const [message, setMessage] = useState<string>("Checking QR status...");

  // Get logged-in Gmail
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user: User | null) => {
      const email = user?.email ?? null;
      if (!email) return;

      const cached = await AsyncStorage.getItem("userDoc");
      if (cached) {
        const parsed: UserDoc & { gmail: string } = JSON.parse(cached);
        setUserDoc(parsed);
      } else {
        try {
          const userRes = await axios.get(`${BASE_URL}/users/byGmail?gmail=${email}`);
          const user: UserDoc = userRes.data;
          setUserDoc(user);
          await AsyncStorage.setItem("userDoc", JSON.stringify({ ...user, gmail: email }));
        } catch (err) {
          console.error("Failed to fetch user:", err);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  // Poll QR status
  useEffect(() => {
    if (!userDoc?.id) return;

    const fetchQR = async () => {
      try {
        const qrRes = await axios.get(`${BASE_URL}/points/qr/${userDoc.id}`);
        if (qrRes.data?.qrId) {
          setQrId(qrRes.data.qrId);
          setQrUsed(qrRes.data.used);
          setMessage(qrRes.data.used ? "This QR has been used or expired." : "Your QR is active.");
        } else {
          setQrId(null);
          setQrUsed(true); // treat missing QR as expired
          setMessage("No active QR available.");
        }
      } catch (err: any) {
        console.error("Error fetching QR:", err?.response?.data || err.message || err);
        setQrId(null);
        setQrUsed(true);
        setMessage("Failed to retrieve QR status.");
      }
    };

    fetchQR(); // initial
    const interval = setInterval(fetchQR, pollInterval);

    return () => clearInterval(interval);
  }, [userDoc, pollInterval]);

  // Refresh QR manually
  const regenerateQR = useCallback(() => {
    if (!qrId) return;
    setMessage(qrUsed ? "This QR has been used or expired." : "Refreshing QR...");
  }, [qrId, qrUsed]);

  return { qrId, qrUsed, message, regenerateQR };
}
