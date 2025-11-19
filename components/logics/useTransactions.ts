import { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { auth } from "@/lib/firebase";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { API_URL } from '../../config';

dayjs.extend(utc);
dayjs.extend(timezone);

export type Tx = {
  id: string;
  title: string;
  subtitle: string;
  image?: string;
};

const BASE_URL = API_URL ;
if (!BASE_URL) throw new Error("EXPO_PUBLIC_API_URL is not defined!");

const formatCreatedAt = (createdAt?: string) => {
  if (!createdAt) return "Unknown date";
  const date = dayjs(createdAt);
  return date.isValid()
    ? date.tz("Asia/Manila").format("MMM D, YYYY h:mm A")
    : "Unknown date";
};

export const useTransactions = () => {
  const [data, setData] = useState<Tx[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let unsubscribe: (() => void) | undefined;
    const controller = new AbortController();

    const fetchTransactions = async (uid: string) => {
      try {
        const res = await fetch(`${BASE_URL}/transactions?uid=${uid}`, {
          signal: controller.signal,
        });

        if (res.status === 404) {
          setData([]);
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
        if (err.name === "AbortError") return;
        console.error("❌ Error fetching transactions:", err);
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    unsubscribe = onAuthStateChanged(auth, async (user: User | null) => {
      setLoading(true);
      setError(null);

      let uid = user?.uid || (await AsyncStorage.getItem("uid"));
      if (!uid) {
        setData([]);
        setLoading(false);
        return;
      }

      if (user?.uid) await AsyncStorage.setItem("uid", user.uid);
      fetchTransactions(uid);
    });

    return () => {
      controller.abort();
      if (unsubscribe) unsubscribe();
    };
  }, []);

  return { data, loading, error };
};
