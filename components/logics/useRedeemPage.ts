import { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/lib/firebase";

export type Promo = {
  image: any;
  title: string;
  subtitle: string;
};

export type ActionItem = {
  icon: string;
  text: string;
  route: "/referrals" | null;
};

export default function useRewardsPageLogic() {
  const [userName, setUserName] = useState<string>("Guest");
  const [currentPromo, setCurrentPromo] = useState<number>(0);

  // === Get user info from Firebase Auth ===
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
      if (user) {
        const display = user.displayName || user.email || "Guest";
        const name = display.includes("@")
          ? display.split("@")[0]
          : display;
        setUserName(capitalizeFirstLetter(name));
      } else {
        setUserName("Guest");
      }
    });

    return unsubscribe;
  }, []);

  const capitalizeFirstLetter = (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1);

  // === Promo Banners ===
  const promos: Promo[] = [
    {
      image: require("../../assets/images/header.jpg"),
      title: "✨ October Promo ✨",
      subtitle: "Get 20% OFF all manicure packages this week only!",
    },
    {
      image: require("../../assets/images/nail1.jpeg"),
      title: "💅 Refer a Friend 💅",
      subtitle: "Earn 100 bonus points when your friend books a session!",
    },
    {
      image: require("../../assets/images/header.jpg"),
      title: "🌸 New Arrivals 🌸",
      subtitle: "Discover our latest nail polish shades!",
    },
  ];

  // === Auto-rotate promos ===
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPromo((prev) => (prev + 1) % promos.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [promos.length]);

  const actions: ActionItem[] = [
    { icon: "document-text-outline", text: "Survey", route: null },
    { icon: "qr-code-outline", text: "Scan QR Code", route: null },
    { icon: "people-outline", text: "Invite Friends", route: "/referrals" },
  ];

  return {
    userName,
    currentPromo,
    promos,
    actions,
  };
}
