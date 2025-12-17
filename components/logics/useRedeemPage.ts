import { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { auth, db } from "@/lib/firebase";
import { API_URL } from "../../config";

dayjs.extend(utc);
dayjs.extend(timezone);

export type Promo = {
  image: { uri: string };
  title: string;
  subtitle: string;
};

export type ActionItem = {
  icon: string;
  text: string;
  route: "/user/transactions" | "/referrals" | "/qr" | null;
};

const BASE_URL = API_URL;

export default function useRewardsPageLogic() {
  const [userName, setUserName] = useState<string>("Guest");
  const [userPoints, setUserPoints] = useState<number>(0);
  const [currentPromo, setCurrentPromo] = useState<number>(0);
  const [promos, setPromos] = useState<Promo[]>([]);
  const [showReferralModal, setShowReferralModal] = useState<boolean>(false);

  const capitalizeFirstLetter = (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1);

  // --- Referral Reward POST ---
  const handleReferralReward = async (referredBy: string) => {
    const currentUser = auth.currentUser;
    if (!currentUser || !referredBy) {
      if (__DEV__) console.warn("⚠️ Cannot submit referral, UID or code missing");
      return;
    }

    try {
      if (__DEV__)
        console.log("Submitting referral:", { referredBy, uid: currentUser.uid });

      const res = await fetch(`${BASE_URL}/users/referral`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ referredBy, uid: currentUser.uid }),
      });

      const data = await res.json();

      if (!res.ok && __DEV__) {
        console.warn("⚠️ Referral reward failed:", data.message || data);
      } else if (__DEV__) {
        console.log("✅ Referral logged successfully:", data);
      }
    } catch (error) {
      if (__DEV__) console.error("❌ Error calling referral endpoint:", error);
    }
  };

  // --- AUTH + USER POINTS + REFERRAL MODAL RESTORED ---
  useEffect(() => {
  let unsubscribeUser: (() => void) | undefined;

  const authUnsub = onAuthStateChanged(auth, async (user: User | null) => {
    if (!user) {
      setUserName("Guest");
      setUserPoints(0);
      setShowReferralModal(false);
      return;
    }

    const userRef = doc(db, "users", user.uid);
    const displayName =
      user.displayName || user.email?.split("@")[0] || "User";
    setUserName(capitalizeFirstLetter(displayName));

    unsubscribeUser = onSnapshot(userRef, async (snapshot) => {
      if (!snapshot.exists()) return;
      const data = snapshot.data();
      setUserPoints(data.points || 0);

      // --------------------------- SHOW REFERRAL MODAL ONCE ---------------------------
      const createdAt = data.createdAt;
      if (!createdAt) return;

      const createdAtDate = createdAt.toDate
        ? dayjs(createdAt.toDate()).tz("Asia/Manila")
        : dayjs(createdAt).tz("Asia/Manila");

      const now = dayjs().tz("Asia/Manila");
      const storageKey = `referralShown_${user.uid}`;
      const alreadyShown = await AsyncStorage.getItem(storageKey);

      // Show modal ONLY if:
      // 1. Today is the account creation date
      // 2. Modal was not shown before
      if (!alreadyShown && now.isSame(createdAtDate, "day")) {
        setShowReferralModal(true);
        await AsyncStorage.setItem(storageKey, "true"); // mark as shown
      }
    });
  });

  return () => {
    authUnsub();
    if (unsubscribeUser) unsubscribeUser();
  };
}, []);

  // --- PROMOS WITH RATE-LIMIT SAFE FETCHING ---
  useEffect(() => {
    let intervalId: ReturnType<typeof setTimeout>;
    let backoff = 180_000; // 3 minutes

    const fetchPromos = async () => {
      try {
        const res = await fetch(`${BASE_URL}/rewards`);
        const data = await res.json();

        if (!res.ok || data.error) {
          if (__DEV__)
            console.warn("Promos API error:", data.error || res.statusText);
          setPromos([]);
          backoff = Math.min(backoff * 2, 1_800_000);
        } else {
          backoff = 180_000;
          const rewardsArray: any[] = Array.isArray(data) ? data : [];
          const activePromos: Promo[] = rewardsArray
            .filter((reward) => reward.is_active)
            .map((reward) => ({
              image: {
                uri: reward.image_url.startsWith("http")
                  ? reward.image_url
                  : `${BASE_URL}${
                      reward.image_url.startsWith("/") ? "" : "/"
                    }${reward.image_url}`,
              },
              title: reward.name,
              subtitle: reward.description,
            }));

          setPromos((prevPromos) =>
            JSON.stringify(prevPromos) !== JSON.stringify(activePromos)
              ? activePromos
              : prevPromos
          );
        }
      } catch (err) {
        if (__DEV__) console.error("❌ Error fetching promos:", err);
        setPromos([]);
        backoff = Math.min(backoff * 2, 1_800_000);
      } finally {
        intervalId = setTimeout(fetchPromos, backoff);
      }
    };

    fetchPromos();

    return () => clearTimeout(intervalId);
  }, []);

  // --- ROTATE PROMO ---
  useEffect(() => {
    const intervalId: ReturnType<typeof setInterval> = setInterval(() => {
      setCurrentPromo((prev) =>
        promos.length ? (prev + 1) % promos.length : 0
      );
    }, 4000);

    return () => clearInterval(intervalId);
  }, [promos.length]);

  const actions: ActionItem[] = [
   { icon: "receipt-outline", text: "Transactions", route: "/user/transactions" },
  { icon: "qr-code-outline", text: "Show QR", route: "/qr"},

  { icon: "people-outline", text: "Invite Friends", route: "/referrals" },
  ];

  return {
    userName,
    userPoints,
    currentPromo,
    promos,
    actions,
    showReferralModal,
    setShowReferralModal,
    handleReferralReward,
  };
}
