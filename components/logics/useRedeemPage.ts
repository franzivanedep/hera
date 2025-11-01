import { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";

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

  // === Capitalize helper ===
  const capitalizeFirstLetter = (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1);

  // === Real-time user info and points ===
  useEffect(() => {
    let unsubscribeUser: (() => void) | undefined;

    const authUnsub = onAuthStateChanged(auth, (user: User | null) => {
      if (user) {
        const displayName = user.displayName || user.email?.split("@")[0] || "User";
        setUserName(capitalizeFirstLetter(displayName));

        // Listen to Firestore user document in real-time
        const userRef = doc(db, "users", user.uid);
        unsubscribeUser = onSnapshot(userRef, (snapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.data();
            setUserPoints(data.points || 0);
          } else {
            setUserPoints(0);
          }
        });
      } else {
        setUserName("Guest");
        setUserPoints(0);
      }
    });

    return () => {
      authUnsub();
      if (unsubscribeUser) unsubscribeUser();
    };
  }, []);

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
