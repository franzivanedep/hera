import { useState, useEffect, useCallback } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import axios, { AxiosError, CancelTokenSource } from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BASE_URL = process.env.EXPO_PUBLIC_API_URL;

// ✅ Safe decode helper
const safeDecode = (value: any): string => {
  try {
    return decodeURIComponent(value || "");
  } catch (err) {
    console.warn("Decoding failed for:", value);
    return "";
  }
};

export default function useRewardDetailLogic() {
  const params = useLocalSearchParams();
  const router = useRouter();

  const rewardId = safeDecode(params.rewardId);
  const title = safeDecode(params.title);
  const image = safeDecode(params.image);
  const description = safeDecode(params.description);
  const pointsString = safeDecode(params.points);
  const points = Number(pointsString) || 0;

  const [loadingModalVisible, setLoadingModalVisible] = useState(false);
  const [voucherModalVisible, setVoucherModalVisible] = useState(false);
  const [notEnoughModalVisible, setNotEnoughModalVisible] = useState(false);
  const [userPoints, setUserPoints] = useState<number>(0);
  const [isFetching, setIsFetching] = useState(true);

  const imageUrl =
    typeof image === "string"
      ? image.startsWith("http")
        ? image
        : `${BASE_URL}/uploads/${image}`
      : undefined;

  // ✅ Fetch user data from backend
  const fetchUserData = useCallback(async (cancelToken: CancelTokenSource) => {
    try {
      const uid = await AsyncStorage.getItem("uid");
      if (!uid) throw new Error("Missing UID");

      const response = await axios.get(`${BASE_URL}/users/${uid}`, {
        cancelToken: cancelToken.token,
      });

      if (response.data && typeof response.data.points === "number") {
        setUserPoints(response.data.points);
      } else {
        console.warn("⚠️ Unexpected response format:", response.data);
        setUserPoints(0);
      }
    } catch (err) {
      const error = err as AxiosError;
      if (axios.isCancel(error)) return; // request cancelled

      if (error.response?.status === 404) {
        console.warn("User not found, defaulting points to 0.");
        setUserPoints(0);
      } else {
        console.error("❌ Fetch user failed:", error.message);
      }
    } finally {
      setIsFetching(false);
    }
  }, []);

  useEffect(() => {
    if (!BASE_URL) {
      console.error("❌ Missing EXPO_PUBLIC_API_URL in .env");
      return;
    }

    const cancelToken = axios.CancelToken.source();
    fetchUserData(cancelToken);

    return () => cancelToken.cancel("Request cancelled on unmount.");
  }, [fetchUserData]);

  // ✅ Handle reward redemption
  const handleRedeem = async () => {
    if (userPoints < points) {
      setNotEnoughModalVisible(true);
      return;
    }

    setLoadingModalVisible(true);
    try {
      const uid = await AsyncStorage.getItem("uid");
      if (!uid) throw new Error("User not logged in");

      await axios.post(`${BASE_URL}/rewards/redeem`, { uid, rewardId });
      setTimeout(() => {
        setLoadingModalVisible(false);
        setVoucherModalVisible(true);
      }, 1200);
    } catch (err) {
      console.error("❌ Redeem failed:", err);
      setLoadingModalVisible(false);
    }
  };

  const handleViewVoucher = () => {
    setVoucherModalVisible(false);
    router.push({
      pathname: "/voucher",
      params: {
        rewardId: encodeURIComponent(rewardId),
        title: encodeURIComponent(title),
        description: encodeURIComponent(description),
        points: encodeURIComponent(String(points)),
        image: encodeURIComponent(image),
      },
    });
  };

  const handleBackHome = () => {
    setVoucherModalVisible(false);
    router.push("/");
  };

  return {
    title,
    imageUrl,
    description,
    points,
    userPoints,
    loadingModalVisible,
    voucherModalVisible,
    notEnoughModalVisible,
    isFetching,
    setNotEnoughModalVisible,
    handleRedeem,
    handleViewVoucher,
    handleBackHome,
  };
}
