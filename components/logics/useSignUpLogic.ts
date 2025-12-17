import { useState, useEffect } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Router } from "expo-router";
import { EMAIL_API, API_URL } from "../../config";

const POLICY_VERSION = "1.0";

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
  agreed: boolean;
  setAgreed: (val: boolean) => void;
  sendCode: () => Promise<void>;
  verifyAndSignUp: (router: Router) => Promise<void>;
}

export function useSignUpLogic(): SignUpLogic {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [code, setCode] = useState("");
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [cooldown, setCooldown] = useState(0);
  const [sendCount, setSendCount] = useState(0);
  const [agreed, setAgreed] = useState(false);

  const MAX_SENDS = 3;
  const COOLDOWN_TIME = 60;

  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setInterval(() => setCooldown((c) => c - 1), 1000);
    return () => clearInterval(timer);
  }, [cooldown]);

  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  async function emailExists(email: string) {
    const res = await fetch(`${API_URL}/users/check-gmail`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ gmail: email }),
    });
    const data = await res.json();
    return data.exists;
  }

  async function sendCode() {
    if (!email.trim()) return setErr("Please enter your email.");
    if (!isValidEmail(email)) return setErr("Invalid email address.");
    if (!agreed)
      return setErr("You must agree to the Privacy Policy to use this app.");

    setBusy(true);
    setErr(null);

    try {
      if (await emailExists(email))
        throw new Error("This email is already registered.");
      if (sendCount >= MAX_SENDS)
        throw new Error("Too many attempts. Please wait.");

      const res = await fetch(`${EMAIL_API}/api/email/send`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ gmail: email }),
      });

      if (!res.ok) throw new Error("Failed to send verification email.");

      setSent(true);
      setSendCount((c) => c + 1);
      setCooldown(COOLDOWN_TIME);
    } catch (e: any) {
      setErr(e.message);
    } finally {
      setBusy(false);
    }
  }

  async function verifyAndSignUp(router: Router) {
    if (!code.trim()) return setErr("Enter the verification code.");

    setBusy(true);
    setErr(null);

    try {
      const res = await fetch(`${EMAIL_API}/api/email/verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ gmail: email, code }),
      });

      if (!res.ok) throw new Error("Verification failed.");

      const cred = await createUserWithEmailAndPassword(auth, email, pw);
      const uid = cred.user.uid;

      await AsyncStorage.setItem("uid", uid);

      await fetch(`${API_URL}/users/newUser`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          gmail: email,
          uid,
          policyAccepted: true,
          policyVersion: POLICY_VERSION,
          policyAcceptedAt: new Date().toISOString(),
        }),
      });

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
    agreed,
    setAgreed,
    sendCode,
    verifyAndSignUp,
  };
}
