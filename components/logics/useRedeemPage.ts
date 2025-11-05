import { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { auth, db } from "@/lib/firebase";

dayjs.extend(utc);
dayjs.extend(timezone);

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

const BASE_URL = process.env.EXPO_PUBLIC_API_URL;

export default function useRewardsPageLogic() {
  const [userName, setUserName] = useState<string>("Guest");
  const [userPoints, setUserPoints] = useState<number>(0);
  const [currentPromo, setCurrentPromo] = useState<number>(0);
  const [promos, setPromos] = useState<Promo[]>([]);
  const [showReferralModal, setShowReferralModal] = useState<boolean>(false);
  const [referralChecked, setReferralChecked] = useState<boolean>(false); // ✅ Prevent race condition

  const capitalizeFirstLetter = (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1);

  // ✅ Referral reward logic
  const handleReferralReward = async (referredBy: string) => {
    try {
      const res = await fetch(`${BASE_URL}/users/referral`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ referredBy }),
      });
      const data = await res.json();
      if (!res.ok) {
        console.warn("⚠️ Referral reward failed:", data.message);
      }
    } catch (error) {
      console.error("❌ Error calling referral endpoint:", error);
    }
  };

  useEffect(() => {
    let unsubscribeUser: (() => void) | undefined;

    const authUnsub = onAuthStateChanged(auth, (user: User | null) => {
      if (user) {
        const displayName =
          user.displayName || user.email?.split("@")[0] || "User";
        setUserName(capitalizeFirstLetter(displayName));

        const userRef = doc(db, "users", user.uid);
        unsubscribeUser = onSnapshot(userRef, async (snapshot) => {
          if (!snapshot.exists()) return;

          const data = snapshot.data();
          setUserPoints(data.points || 0);

          const createdAt = data.createdAt;
          let createdAtDate: dayjs.Dayjs | null = null;

          if (createdAt?.toDate) {
            createdAtDate = dayjs(createdAt.toDate()).tz("Asia/Manila");
          } else if (typeof createdAt === "string") {
            createdAtDate = dayjs(createdAt).tz("Asia/Manila");
          }

          // 🕒 Wait until storage is checked before possibly showing modal
          if (!referralChecked && createdAtDate) {
            setReferralChecked(true);
            const now = dayjs().tz("Asia/Manila");
            const storageKey = `referralShown_${user.uid}`;

            try {
              const alreadyShown = await AsyncStorage.getItem(storageKey);

              if (!alreadyShown && now.isSame(createdAtDate, "day")) {
                console.log("🎁 Showing referral modal for first time");
                setShowReferralModal(true);

                if (data.referredBy) {
                  await handleReferralReward(data.referredBy);
                }

                await AsyncStorage.setItem(storageKey, "true");
              } else {
                setShowReferralModal(false);
              }
            } catch (err) {
              console.error("❌ Error checking referral modal storage:", err);
            }
          }
        });
      } else {
        setUserName("Guest");
        setUserPoints(0);
        setShowReferralModal(false);
      }
    });

    return () => {
      authUnsub();
      if (unsubscribeUser) unsubscribeUser();
    };
  }, [referralChecked]);

  // Fetch promos
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
                : `${BASE_URL}${
                    reward.image_url.startsWith("/") ? "" : "/"
                  }${reward.image_url}`,
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
    const interval = setInterval(fetchPromos, 5000);
    return () => clearInterval(interval);
  }, []);

  // Promo rotation
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
    showReferralModal,
    setShowReferralModal,
    handleReferralReward,
  };
}
