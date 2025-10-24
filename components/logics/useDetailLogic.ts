import { useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";

// ✅ Set your backend base URL
const BASE_URL = "http://192.168.1.19:3001"; // ⚠️ Replace with your actual IPv4 or API URL

export default function useRewardDetailLogic() {
  const { title, image, description, points } = useLocalSearchParams();
  const router = useRouter();

  const [loadingModalVisible, setLoadingModalVisible] = useState(false);
  const [voucherModalVisible, setVoucherModalVisible] = useState(false);

  // ✅ Construct image URL properly
  const imageUrl =
    typeof image === "string"
      ? image.startsWith("http")
        ? image
        : `${BASE_URL}/uploads/${image}`
      : undefined;

  const handleRedeem = () => {
    setLoadingModalVisible(true);
    setTimeout(() => {
      setLoadingModalVisible(false);
      setVoucherModalVisible(true);
    }, 2000);
  };

  const handleViewVoucher = () => {
    setVoucherModalVisible(false);
    router.push({
      pathname: "/voucher",
      params: {
        title: String(title),
        description: String(description),
        points: String(points),
        image: String(image),
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
    loadingModalVisible,
    voucherModalVisible,
    setVoucherModalVisible,
    handleRedeem,
    handleViewVoucher,
    handleBackHome,
  };
}
