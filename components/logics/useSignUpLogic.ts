// hooks/useSignUpLogic.ts
import { useState, useEffect } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Router } from "expo-router";
import { EMAIL_API , API_URL } from "../../config"; 
export interface SignUpLogic {
  email: string;
  setEmail: (val: string) => void;
  pw: string;
  setPw: (val: string) => void;
  code: string;
  setCode: (val: string) => void;
  sent: boolean;
  busy: boolean;
  err: string | null;
  cooldown: number;
  sendCount: number;
  MAX_SENDS: number;
  sendCode: () => Promise<void>;
  verifyAndSignUp: (router: Router) => Promise<void>;
}

export function useSignUpLogic(): SignUpLogic {
  const [email, setEmail] = useState<string>("");
  const [pw, setPw] = useState<string>("");
  const [code, setCode] = useState<string>("");
  const [sent, setSent] = useState<boolean>(false);
  const [busy, setBusy] = useState<boolean>(false);
  const [err, setErr] = useState<string | null>(null);
  const [cooldown, setCooldown] = useState<number>(0);
  const [sendCount, setSendCount] = useState<number>(0);

  const MAX_SENDS = 3;
  const COOLDOWN_TIME = 60;

  // Timer
  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setInterval(() => setCooldown((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [cooldown]);

  const isValidEmail = (email: string): boolean =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  async function emailExists(email: string): Promise<boolean> {
    const res = await fetch(`${API_URL}/users/check-gmail`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ gmail: email }),
    });

    if (!res.ok) throw new Error("Failed to check email existence.");
    const data = await res.json();
    return data.exists;
  }

  async function sendCode(): Promise<void> {
    if (!email.trim()) return setErr("Please enter your email first.");
    if (!isValidEmail(email.trim()))
      return setErr("Please enter a valid email address.");

    setBusy(true);
    setErr(null);

    try {
      const exists = await emailExists(email.trim());
      if (exists) throw new Error("This email is already registered.");
      if (sendCount >= MAX_SENDS)
        throw new Error(
          "Too many attempts. Please wait before trying again."
        );

      const res = await fetch(`${EMAIL_API}/api/email/send`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ gmail: email.trim() }),
      });

      if (!res.ok) throw new Error("Failed to send verification email.");

      setSent(true);
      setSendCount((prev) => prev + 1);
      setCooldown(COOLDOWN_TIME);
    } catch (e: any) {
      setErr(e.message);
    } finally {
      setBusy(false);
    }
  }

  async function verifyAndSignUp(router: Router): Promise<void> {
    if (!code.trim()) return setErr("Please enter the verification code.");

    setBusy(true);
    setErr(null);

    try {
      const res = await fetch(`${EMAIL_API}/api/email/verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ gmail: email.trim(), code }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Verification failed");

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email.trim(),
        pw
      );
      const uid = userCredential.user.uid;

      await AsyncStorage.setItem("uid", uid);

      const backendRes = await fetch(`${API_URL}/users/newUser`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ gmail: email.trim(), uid }),
      });

      if (!backendRes.ok) throw new Error("Failed to save user in backend");

      router.replace("/");
    } catch (e: any) {
      setErr(e.message);
    } finally {
      setBusy(false);
    }
  }

  return {
    email,
    setEmail,
    pw,
    setPw,
    code,
    setCode,
    sent,
    busy,
    err,
    cooldown,
    sendCount,
    MAX_SENDS,
    sendCode,
    verifyAndSignUp,
  };
}
