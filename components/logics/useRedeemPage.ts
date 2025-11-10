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
  const [referralChecked, setReferralChecked] = useState<boolean>(false);

  const capitalizeFirstLetter = (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1);

  const handleReferralReward = async (referredBy: string) => {
    try {
      const res = await fetch(`${BASE_URL}/users/referral`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ referredBy }),
      });
      const data = await res.json();
      if (!res.ok) {
        if (__DEV__) console.warn("⚠️ Referral reward failed:", data.message);
      }
    } catch (error) {
      if (__DEV__) console.error("❌ Error calling referral endpoint:", error);
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

          if (!referralChecked && createdAtDate) {
            setReferralChecked(true);
            const now = dayjs().tz("Asia/Manila");
            const storageKey = `referralShown_${user.uid}`;

            try {
              const alreadyShown = await AsyncStorage.getItem(storageKey);

              if (!alreadyShown && now.isSame(createdAtDate, "day")) {
                setShowReferralModal(true);

                if (data.referredBy) {
                  await handleReferralReward(data.referredBy);
                }

                await AsyncStorage.setItem(storageKey, "true");
              } else {
                setShowReferralModal(false);
              }
            } catch (err) {
              if (__DEV__)
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

  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval>;

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

        setPromos((prevPromos) => {
          const hasChanged =
            JSON.stringify(prevPromos) !== JSON.stringify(activePromos);
          return hasChanged ? activePromos : prevPromos;
        });
      } catch (err) {
        if (__DEV__) console.error("Error fetching promos:", err);
      }
    };

    fetchPromos(); // initial load

    intervalId = setInterval(fetchPromos, 30000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const intervalId: ReturnType<typeof setInterval> = setInterval(() => {
      setCurrentPromo((prev) =>
        promos.length ? (prev + 1) % promos.length : 0
      );
    }, 4000);
    return () => clearInterval(intervalId);
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
