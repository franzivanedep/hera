// hooks/useUserInfo.ts
import { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function useUserInfo() {
  const [email, setEmail] = useState<string | null>(null);
  const [displayName, setDisplayName] = useState<string>("Guest");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
      if (user) {
        const mail = user.email?.toLowerCase() || "";
        setEmail(mail);

        const name = user.displayName || mail.split("@")[0];
        setDisplayName(name.charAt(0).toUpperCase() + name.slice(1));
      } else {
        setEmail(null);
        setDisplayName("Guest");
      }
    });

    return () => unsubscribe();
  }, []);

  return { email, displayName };
}
