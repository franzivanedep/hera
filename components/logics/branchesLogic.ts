import { useState, useEffect, useRef, useCallback } from "react";
import { Linking } from "react-native";
import axios from "axios";
import { API_URL } from "../../config";

export interface Branch {
  id: string;
  name: string;
  address: string;
  image?: string;
  services?: string[];
  openingHours?: string[];
  contact?: { phone: string; email: string };
}

export const useBranches = (pollInterval = 60000) => {
  const [branches, setBranches] = useState<Branch[]>([]);
  const [selectedBranch, setSelectedBranch] = useState<Branch | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const lastFetchedRef = useRef<number>(0);
  const inProgressRef = useRef<boolean>(false); // prevent overlapping fetches

  const normalizeImage = useCallback((branch: Branch) => {
    return {
      ...branch,
      image: branch.image
        ? branch.image.startsWith("http")
          ? branch.image
          : `${API_URL}${branch.image.startsWith("/") ? "" : "/"}${branch.image}`
        : undefined,
    };
  }, []);

  const fetchBranches = useCallback(async (force = false) => {
    const now = Date.now();
    if (!force && now - lastFetchedRef.current < pollInterval) return; // skip if too soon
    if (inProgressRef.current) return; // skip if fetch already in progress

    inProgressRef.current = true;
    try {
      // Only show loading on first fetch or forced fetch
      if (branches.length === 0 || force) setLoading(true);

      const res = await axios.get<Branch[]>(`${API_URL}/branches/get`);
      const normalizedBranches = res.data.map(normalizeImage);

      // Only update state if branches changed
      const hasNew = normalizedBranches.length !== branches.length ||
        normalizedBranches.some((b, i) => b.id !== branches[i]?.id);

      if (hasNew) setBranches(normalizedBranches);

      lastFetchedRef.current = now;
    } catch (err: any) {
      console.error("Failed to fetch branches:", err);
      setError(err.message || "Something went wrong");
    } finally {
      inProgressRef.current = false;
      setLoading(false);
    }
  }, [branches, normalizeImage, pollInterval]);

  useEffect(() => {
    fetchBranches(true); // initial fetch
    const interval = setInterval(() => fetchBranches(), pollInterval);
    return () => clearInterval(interval);
  }, [fetchBranches, pollInterval]);

  const openBranchModal = (branch: Branch) => setSelectedBranch(branch);
  const closeBranchModal = () => setSelectedBranch(null);

  const openMap = (address: string) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
    Linking.openURL(url);
  };

  return {
    branches,
    selectedBranch,
    loading,
    error,
    openBranchModal,
    closeBranchModal,
    openMap,
    fetchBranches,
  };
};
