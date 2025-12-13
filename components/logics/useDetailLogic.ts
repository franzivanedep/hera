import { useState, useEffect } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { onAuthStateChanged } from "firebase/auth";
import axios from "axios";
import { auth } from "@/lib/firebase";
import { API_URL } from "../../config";

const BASE_URL = API_URL;

export default function useRewardDetailLogic() {
  const params = useLocalSearchParams();
  const router = useRouter();

  // Decode params
  const rewardId = params.rewardId ? decodeURIComponent(String(params.rewardId)) : "";
  const title = params.title ? decodeURIComponent(String(params.title)) : "";
  const image = params.image ? decodeURIComponent(String(params.image)) : "";
  const description = params.description ? decodeURIComponent(String(params.description)) : "";
  const points = params.points ? Number(decodeURIComponent(String(params.points))) : 0;

  const [userPoints, setUserPoints] = useState<number>(0);
  const [uid, setUid] = useState<string | null>(null);
  const [loadingModalVisible, setLoadingModalVisible] = useState(false);
  const [notEnoughModalVisible, setNotEnoughModalVisible] = useState(false);

  // Full image URL
  const imageUrl =
    image && !image.startsWith("http") ? `${BASE_URL}/uploads/${image}` : image;

  // Get logged-in user UID and points
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUid(user.uid);
        try {
          const res = await axios.get(`${BASE_URL}/users/${user.uid}`);
          setUserPoints(res.data.points || 0);
        } catch (err) {
          console.error("Error fetching user points:", err);
        }
      }
    });
    return () => unsubscribe();
  }, []);

  // Redeem logic
  const handleRedeem = async () => {
    if (!rewardId || !uid) {
      console.warn("Missing reward ID or user UID — cannot redeem.");
      return;
    }

    // Check if user has enough points
    if (userPoints < points) {
      setNotEnoughModalVisible(true);
      return;
    }

    try {
      // ✅ Check if reward is active for the user
      const activeRes = await axios.get(`${BASE_URL}/points/active/rewards/${uid}`);
      const activeIds: string[] = Array.isArray(activeRes.data)
        ? activeRes.data.map((r: any) => r.rewardId ?? r)
        : [];

      if (activeIds.includes(rewardId)) {
        // Reward already active → go straight to voucher
        router.push({
          pathname: "/voucher",
          params: {
            rewardId: encodeURIComponent(String(rewardId)),
            title: encodeURIComponent(String(title)),
            description: encodeURIComponent(String(description)),
            points: encodeURIComponent(String(points)),
            image: encodeURIComponent(String(image)),
          },
        });
        return;
      }

      // Otherwise, show "redeeming" modal briefly
      setLoadingModalVisible(true);
      setTimeout(() => {
        setLoadingModalVisible(false);
        router.push({
          pathname: "/voucher",
          params: {
            rewardId: encodeURIComponent(String(rewardId)),
            title: encodeURIComponent(String(title)),
            description: encodeURIComponent(String(description)),
            points: encodeURIComponent(String(points)),
            image: encodeURIComponent(String(image)),
          },
        });
      }, 2000);
    } catch (err) {
      console.error("Error checking active reward:", err);
      // Optionally show some error modal here
    }
  };

  const handleBackHome = () => {
    router.push("/");
  };

  return {
    rewardId,
    title,
    imageUrl,
    description,
    points,
    userPoints,
    loadingModalVisible,
    notEnoughModalVisible,
    setNotEnoughModalVisible,
    handleRedeem,
    handleBackHome,
  };
}
