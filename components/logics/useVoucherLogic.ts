import { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { auth } from "@/lib/firebase";

export type Tx = {
  id: string;
  title: string;
  subtitle: string;
  image?: string;
};

const BASE_URL = process.env.EXPO_PUBLIC_API_URL || "http://localhost:3001";

export const useTransactions = () => {
  const [data, setData] = useState<Tx[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const formatCreatedAt = (createdAt: any): string => {
    if (!createdAt) return "Unknown date";

    try {
      // Always parse as Date
      const date = new Date(createdAt);
      if (!isNaN(date.getTime())) {
        return date.toLocaleString("en-US", {
          dateStyle: "medium",
          timeStyle: "short",
        });
      }
    } catch (err) {
      console.warn("Failed to parse createdAt:", createdAt, err);
    }

    return "Unknown date";
  };

  useEffect(() => {
    let unsubscribe: (() => void) | undefined;

    const init = async () => {
      unsubscribe = onAuthStateChanged(auth, async (user: User | null) => {
        try {
          setLoading(true);
          setError(null);

          const uid = user?.uid || (await AsyncStorage.getItem("uid"));
          if (!uid) {
            setData([]);
            setLoading(false);
            return;
          }

          if (user?.uid) await AsyncStorage.setItem("uid", user.uid);

          const res = await fetch(`${BASE_URL}/transactions?uid=${uid}`);
          const json = await res.json();

          if (!json.ok) {
            throw new Error(json.message || "Failed to fetch transactions");
          }

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
