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

// ✅ Pull your API base URL from .env
const BASE_URL = process.env.EXPO_PUBLIC_API_URL; 

export default function useRewardsPageLogic() {
  const [userName, setUserName] = useState<string>("Guest");
  const [userPoints, setUserPoints] = useState<number>(0);
  const [currentPromo, setCurrentPromo] = useState<number>(0);
  const [promos, setPromos] = useState<Promo[]>([]);

  // === Get user info and points ===
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user: User | null) => {
      if (user) {
        const email = user.email?.toLowerCase() || "";
        const displayName = user.displayName || email.split("@")[0];
        setUserName(capitalizeFirstLetter(displayName));

        try {
          const res = await fetch(`${BASE_URL}/users`);
          const users = await res.json();

          const foundUser = users.find(
            (u: any) => u.gmail?.toLowerCase() === email
          );

          setUserPoints(foundUser?.points || 0);
        } catch (err) {
          console.error("Error fetching user points:", err);
        }
      } else {
        setUserName("Guest");
        setUserPoints(0);
      }
    });

    return unsubscribe;
  }, []);

  const capitalizeFirstLetter = (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1);

  // === Fetch Promos from /rewards ===
  useEffect(() => {
    const fetchPromos = async () => {
      try {
        const res = await fetch(`${BASE_URL}/rewards`);
        const data = await res.json();

        const activePromos = data
          .filter((reward: any) => reward.is_active === true)
          .map((reward: any) => ({
            image: {
              uri: reward.image_url.startsWith("http")
                ? reward.image_url
                : `${BASE_URL}${reward.image_url.startsWith("/") ? "" : "/"}${reward.image_url}`,
            },
            title: reward.name,
            subtitle: reward.description,
          }));

        setPromos(activePromos);
      } catch (err) {
        console.error("Error fetching promos:", err);
      }
    };

    fetchPromos();
    const interval = setInterval(fetchPromos, 5000); // refresh every 5s
    return () => clearInterval(interval);
  }, []);

  // === Auto-rotate promos ===
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPromo((prev) =>
        promos.length ? (prev + 1) % promos.length : 0
      );
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
    userPoints,
    currentPromo,
    promos,
    actions,
  };
}
