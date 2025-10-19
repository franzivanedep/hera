// src/hooks/useRewardsLogic.ts
import { useEffect, useState } from "react";
import axios from "axios";

interface Reward {
  id: string;
  name: string;
  description: string;
  image_url: string;
  points: number;
  category: string;
  is_active: boolean;
}

export default function useRewardsLogic() {
  const [rewards, setRewards] = useState<Reward[]>([]);
  const [loading, setLoading] = useState(true);

  const BASE_URL = "http://localhost:3001"; // lagay ip address ipv4
  const API_URL = `${BASE_URL}/rewards`;

  const fetchRewards = async () => {
    try {
      const res = await axios.get(API_URL);
      const data = res.data
       
        .filter((item: Reward) => item.is_active === true)
        .map((item: Reward) => ({
          ...item,
          image_url: item.image_url.startsWith("http")
            ? item.image_url
            : `${BASE_URL}${item.image_url}`,
        }));
      setRewards(data);
    } catch (err) {
      console.error("Error fetching rewards:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRewards();
    const interval = setInterval(fetchRewards, 5000); 
    return () => clearInterval(interval);
  }, []);

  return { rewards, loading };
}
