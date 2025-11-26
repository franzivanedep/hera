import { useState, useEffect } from "react";
import { Linking } from "react-native";
import axios from "axios";
import { API_URL } from "../../config";

// Use your local IP for development

export interface Branch {
  id: string;
  name: string;
  address: string;
  image?: string; // URL from backend
  services?: string[];
  openingHours?: string[];
  contact?: { phone: string; email: string };
}

export const useBranches = () => {
  const [branches, setBranches] = useState<Branch[]>([]);
  const [selectedBranch, setSelectedBranch] = useState<Branch | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch branches from backend
  const fetchBranches = async () => {
    setLoading(true);
    try {
      const res = await axios.get<Branch[]>(`${API_URL}/branches`);

      // Normalize image URLs for React Native
      const normalizedBranches = res.data.map(branch => ({
        ...branch,
        image: branch.image
          ? branch.image.startsWith("http")
            ? branch.image.replace("localhost:3001", "192.168.100.19:3001")
            : `${API_URL}${branch.image.startsWith("/") ? "" : "/"}${branch.image}`
          : undefined,
      }));

      setBranches(normalizedBranches);
    } catch (err: any) {
      console.error("Failed to fetch branches:", err);
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBranches();
  }, []);

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
    fetchBranches, // optional to refresh manually
  };
};
