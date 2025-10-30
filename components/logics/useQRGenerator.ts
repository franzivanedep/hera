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

export default function useQRGeneratorLogic() {
  const [gmail, setGmail] = useState<string | null>(null);
  const [userDoc, setUserDoc] = useState<UserDoc | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [qrId, setQrId] = useState<string | null>(null);
  const [message, setMessage] = useState<string>("");

  // ✅ Get logged-in Gmail
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user: User | null) => {
      const email = user?.email ?? null;
      setGmail(email);

      if (email) {
        const cached = await AsyncStorage.getItem("userDoc");
        if (cached) {
          const parsed: UserDoc & { gmail: string } = JSON.parse(cached);
          if (parsed.gmail === email) setUserDoc(parsed);
        }
      }
    });
    return () => unsubscribe();
  }, []);

  // ✅ Fetch user document & QR
  useEffect(() => {
    if (!gmail) return;

    const fetchQR = async () => {
      try {
        setLoading(true);
        setMessage("Fetching your QR...");

        const userRes = await axios.get(`${BASE_URL}/users/byGmail?gmail=${gmail}`);
        const user: UserDoc = userRes.data;

        if (!user?.id) throw new Error("User UID not found");
        const uid = user.id;

        setUserDoc({ ...user, id: uid });
        await AsyncStorage.setItem("userDoc", JSON.stringify({ ...user, gmail }));

        // Fetch QR
        const qrRes = await axios.get(`${BASE_URL}/points/qr/${uid}`);
        if (qrRes.data?.qrId) {
          setQrId(qrRes.data.qrId);
          setMessage("QR loaded successfully!");
        } else {
          // Create QR if not exists
          const createRes = await axios.post(`${BASE_URL}/points/createQR`, {
            uid,
            type: "attendance",
          });
          setQrId(createRes.data.qrId);
          setMessage("New QR created!");
        }
      } catch (err: any) {
        console.error("Error loading QR:", err?.response?.data || err.message || err);
        setMessage("Failed to fetch QR. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchQR();
  }, [gmail]);

  // ✅ Regenerate: refresh QR image (same ID)
  const regenerateQR = useCallback(() => {
    if (!qrId) return;
    setLoading(true);
    setMessage("Refreshing QR...");

    // Simulate a QR refresh
    setTimeout(() => {
      setLoading(false);
      setMessage("QR refreshed successfully!");
    }, 300); // small delay to show refresh
  }, [qrId]);

  return { gmail, loading, qrId, message, regenerateQR };
}
