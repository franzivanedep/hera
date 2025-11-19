// src/hooks/useRewardsLogic.ts
import useSWR from "swr";
import axios, { isAxiosError } from "axios";
import { useEffect, useRef } from "react";
import { API_URL } from '../../config';

export interface Reward {
  id: string;
  name: string;
  description: string;
  image_url: string;
  points: number;
  category: string;
  is_active: boolean;
}

// --- fetcher using BASE_URL ---
const fetcher = async (url: string) => {
  try {
    const res = await axios.get(url);
    if (!Array.isArray(res.data)) return [];
    return res.data;
  } catch (err: any) {
    if (isAxiosError(err) && err.response?.status === 429) {
      if (__DEV__) console.warn("Rate limit reached, returning empty rewards.");
      return [];
    }
    if (__DEV__) console.error("Error fetching rewards:", err);
    return [];
  }
};

export default function useRewardsLogic() {
  const BASE_URL = `${API_URL}/rewards`; // ✅ use API_URL from config

  // store previous rewards to compare
  const prevRewardsRef = useRef<Reward[]>([]);

  // --- SWR ---
  const { data, error, mutate } = useSWR(BASE_URL, fetcher, {
    refreshInterval: 5 * 60 * 1000, // automatic update every 5 min
    revalidateOnFocus: false,       // no auto-refresh when switching tabs
    dedupingInterval: 5 * 60 * 1000, // deduplicate multiple requests in 5 min
  });

  // compare new rewards with previous rewards
  useEffect(() => {
    if (!Array.isArray(data)) return;
    const prevIds = prevRewardsRef.current.map(r => r.id);
    const newIds = data.map(r => r.id);

    // Only update if there’s actually a new reward
    const hasNew = newIds.some(id => !prevIds.includes(id));
    if (hasNew) {
      prevRewardsRef.current = data;
    }
  }, [data]);

  // --- map rewards and fix image URLs ---
  const rewards: Reward[] = Array.isArray(data)
    ? data
        .filter(r => r.is_active)
        .map(r => ({
          ...r,
          image_url: r.image_url.startsWith("http")
            ? r.image_url
            : `${API_URL}${r.image_url.startsWith("/") ? "" : "/"}${r.image_url}`, // ✅ replaced process.env with API_URL
        }))
    : [];

  return { rewards, loading: !data && !error, error, refresh: mutate };
}
