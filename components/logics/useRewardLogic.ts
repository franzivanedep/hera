// src/hooks/useRewardsLogic.ts
import useSWR from "swr";
import axios, { isAxiosError } from "axios";
import { useEffect, useRef, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "../../config";

export interface Reward {
  id: string;
  name: string;
  description: string;
  image_url: string;
  points: number;
  category: string;
  is_active: boolean;
  is_active_reward?: boolean; // ✅ USER ACTIVE FLAG
}

// --- fetcher ---
const fetcher = async (url: string) => {
  try {
    const res = await axios.get(url);
    return Array.isArray(res.data) ? res.data : [];
  } catch (err: any) {
    if (isAxiosError(err) && err.response?.status === 429) {
      if (__DEV__) console.warn("Rate limit hit");
      return [];
    }
    if (__DEV__) console.error("Rewards fetch error:", err);
    return [];
  }
};

export default function useRewardsLogic() {
  const BASE_URL = `${API_URL}/rewards`;

  const prevRewardsRef = useRef<Reward[]>([]);
  const [activeRewardIds, setActiveRewardIds] = useState<Set<string>>(new Set());

  // --- SWR rewards ---
  const { data, error, mutate } = useSWR(BASE_URL, fetcher, {
    refreshInterval: 5 * 60 * 1000,
    revalidateOnFocus: false,
    dedupingInterval: 5 * 60 * 1000,
  });

  // --- load ACTIVE rewards (user specific) ---
  useEffect(() => {
    const loadActiveRewards = async () => {
      try {
        const uid = await AsyncStorage.getItem("uid");
        if (!uid) return;

        const res = await axios.get(
          `${API_URL}/points/active/rewards/${uid}`
        );

        // Accepts ["id1", "id2"] OR [{ rewardId }]
        const ids = Array.isArray(res.data)
          ? res.data.map((r: any) => r.rewardId ?? r)
          : [];

        setActiveRewardIds(new Set(ids));
      } catch (err) {
        if (__DEV__) console.warn("Failed to fetch active rewards");
      }
    };

    loadActiveRewards();
  }, []);

  // --- compare rewards ---
  useEffect(() => {
    if (!Array.isArray(data)) return;

    const prevIds = prevRewardsRef.current.map(r => r.id);
    const newIds = data.map(r => r.id);

    const hasNew = newIds.some(id => !prevIds.includes(id));
    if (hasNew) {
      prevRewardsRef.current = data;
    }
  }, [data]);

  // --- map rewards ---
  const rewards: Reward[] = Array.isArray(data)
    ? data
        .filter(r => r.is_active)
        .map(r => ({
          ...r,
          image_url: r.image_url.startsWith("http")
            ? r.image_url
            : `${API_URL}${r.image_url.startsWith("/") ? "" : "/"}${r.image_url}`,
          is_active_reward: activeRewardIds.has(r.id), // ✅ KEY LINE
        }))
    : [];

  return {
    rewards,
    loading: !data && !error,
    error,
    refresh: mutate,
  };
}
