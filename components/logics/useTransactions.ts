// useTransactions.ts
import { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { auth } from "@/lib/firebase";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

// Extend dayjs with UTC and timezone support
dayjs.extend(utc);
dayjs.extend(timezone);

export type Tx = {
  id: string;
  title: string;
  subtitle: string;
  image?: string;
};

const BASE_URL = process.env.EXPO_PUBLIC_API_URL || "http://localhost:3001";

// Professional formatting function
const formatCreatedAt = (createdAt: string | undefined): string => {
  if (!createdAt) return "Unknown date";

  const date = dayjs(createdAt);
  if (!date.isValid()) return "Unknown date";

  // Convert UTC ISO to user's local timezone
  return date.tz(dayjs.tz.guess()).format("MMM D, YYYY h:mm A");
};

export const useTransactions = () => {
  const [data, setData] = useState<Tx[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let unsubscribe: (() => void) | undefined;

    const init = async () => {
      unsubscribe = onAuthStateChanged(auth, async (user: User | null) => {
        setLoading(true);
        setError(null);

        try {
          const uid = user?.uid || (await AsyncStorage.getItem("uid"));
          if (!uid) {
            setData([]);
            setLoading(false);
            return;
          }

          if (user?.uid) await AsyncStorage.setItem("uid", user.uid);

          const res = await fetch(`${BASE_URL}/transactions?uid=${uid}`);

          if (res.status === 404) {
            // No transactions → show empty state
            setData([]);
            setLoading(false);
            return;
          }

          const json = await res.json();

          if (!json.ok) throw new Error(json.message || "Failed to fetch transactions");

          const formatted: Tx[] = json.data.map((tx: any) => ({
            id: tx.id,
            title: tx.rewardName || tx.type || "Transaction",
            subtitle: formatCreatedAt(tx.createdAt),
            image: tx.rewardImage ? `${BASE_URL}${tx.rewardImage}` : undefined,
          }));

          setData(formatted);
        } catch (err: any) {
          console.error("❌ Error fetching transactions:", err);
          setError(err.message || "Something went wrong");
        } finally {
          setLoading(false);
        }
      });
    };

    init();

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  return { data, loading, error };
};
