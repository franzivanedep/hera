// hooks/useReferralsPage.ts
import { useEffect, useState } from "react";
import * as Clipboard from "expo-clipboard";
import { Alert } from "react-native";
import { getAuth } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../lib/firebase";

export const useReferralsPage = () => {
  const [referralCode, setReferralCode] = useState<string>("Loading...");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReferralCode = async () => {
      try {
        const auth = getAuth();
        const user = auth.currentUser;

        if (!user) {
          setReferralCode("No user logged in");
          setLoading(false);
          return;
        }

        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setReferralCode(data.referralNumber || "No referral found");
        } else {
          setReferralCode("User not found");
        }
      } catch (error) {
        console.error("Error fetching referral code:", error);
        setReferralCode("Error loading code");
      } finally {
        setLoading(false);
      }
    };

    fetchReferralCode();
  }, []);

  const handleCopy = async () => {
    if (referralCode && referralCode !== "Loading...") {
      await Clipboard.setStringAsync(referralCode);
      Alert.alert("Copied", "Referral code copied to clipboard!");
    }
  };

  return {
    referralCode,
    loading,
    handleCopy,
  };
};
