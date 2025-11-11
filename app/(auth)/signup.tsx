import React, { useState, useEffect } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "@/lib/firebase"; // added db for Firestore
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { collection, query, where, getDocs } from "firebase/firestore";

export default function SignUp() {
  const router = useRouter();
  const BASE_URL = process.env.EXPO_PUBLIC_API_URL;

  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [code, setCode] = useState("");
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  // For timer and send limit
  const [cooldown, setCooldown] = useState(0);
  const [sendCount, setSendCount] = useState(0);
  const MAX_SENDS = 3; // max attempts before blocking
  const COOLDOWN_TIME = 60; // seconds cooldown between sends

  // 🕒 Timer effect
  useEffect(() => {
    if (cooldown <= 0) return;
    const interval = setInterval(() => setCooldown((prev) => prev - 1), 1000);
    return () => clearInterval(interval);
  }, [cooldown]);

  // ✅ Helper: Check if email already exists in Firestore
  async function emailExists(email: string) {
    const q = query(collection(db, "users"), where("gmail", "==", email));
    const snapshot = await getDocs(q);
    return !snapshot.empty;
  }

  // ✅ Helper: Validate email format
  function isValidEmail(email: string) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  // 1️⃣ Send verification code
  async function sendCode() {
    if (!email.trim()) {
      setErr("Please enter your email first.");
      return;
    }

    if (!isValidEmail(email.trim())) {
      setErr("Please enter a valid email address.");
      return;
    }

    // Check if email exists
    setBusy(true);
    setErr(null);
    try {
      const exists = await emailExists(email.trim());
      if (exists) {
        setErr("This email is already registered.");
        setBusy(false);
        return;
      }

      if (sendCount >= MAX_SENDS) {
        setErr("Too many attempts. Please wait before trying again.");
        setBusy(false);
        return;
      }

      const res = await fetch(`${BASE_URL}/email/send`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ gmail: email.trim() }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.message || "Failed to send verification email");
      }

      setSent(true);
      setSendCount((prev) => prev + 1);
      setCooldown(COOLDOWN_TIME);
    } catch (e: any) {
      setErr(e.message);
    } finally {
      setBusy(false);
    }
  }

  // 2️⃣ Verify code & sign up
  async function verifyAndSignUp() {
    if (!code.trim()) {
      setErr("Please enter the verification code.");
      return;
    }

    setBusy(true);
    setErr(null);

    try {
      // Verify email code first
      const res = await fetch(`${BASE_URL}/email/verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ gmail: email.trim(), code }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Verification failed");

      // Create Firebase user
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email.trim(),
        pw
      );
      const uid = userCredential.user.uid;

      await AsyncStorage.setItem("uid", uid);

      const backendRes = await fetch(`${BASE_URL}/users/newUser`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ gmail: email.trim(), uid }),
      });

      if (!backendRes.ok) {
        const errData = await backendRes.json();
        throw new Error(errData.message || "Failed to save user in backend");
      }

      // Redirect to home
      router.replace("/");
    } catch (e: any) {
      setErr(e.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        padding: 24,
        backgroundColor: "#F8F1E4",
      }}
    >
      <Text
        style={{
          fontSize: 28,
          fontWeight: "700",
          textAlign: "center",
          color: "#3C2E23",
          marginBottom: 20,
        }}
      >
        {sent ? "Verify your email" : "Create your HERA account"}
      </Text>

      {!sent ? (
        <>
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            style={{
              backgroundColor: "#F3EDE3",
              padding: 15,
              borderRadius: 12,
              marginBottom: 12,
            }}
          />
          <TextInput
            placeholder="Password"
            secureTextEntry
            value={pw}
            onChangeText={setPw}
            style={{
              backgroundColor: "#F3EDE3",
              padding: 15,
              borderRadius: 12,
            }}
          />
          <TouchableOpacity
            onPress={sendCode}
            disabled={busy || cooldown > 0}
            style={{
              backgroundColor:
                busy || cooldown > 0 ? "#A19B93" : "#5A4634",
              padding: 15,
              borderRadius: 12,
              alignItems: "center",
              marginTop: 10,
            }}
          >
            {busy ? (
              <ActivityIndicator color="#FAF9F7" />
            ) : (
              <Text style={{ color: "#FAF9F7", fontWeight: "700" }}>
                {cooldown > 0
                  ? `Resend in ${cooldown}s`
                  : "Send Verification Code"}
              </Text>
            )}
          </TouchableOpacity>
          <Text
            style={{
              textAlign: "center",
              marginTop: 8,
              color: "#6A5C50",
              fontSize: 13,
            }}
          >
            {`Attempts left: ${MAX_SENDS - sendCount}`}
          </Text>

          <Text
            style={{
              textAlign: "center",
              fontSize: 12,
              color: "#6A5C50",
              marginTop: 10,
            }}
          >
            By signing up, you agree to our Terms & Privacy Policy. We only
            collect your Gmail for account verification and do not store any
            other personal information.
          </Text>
        </>
      ) : (
        <>
          <TextInput
            placeholder="Enter code"
            keyboardType="numeric"
            value={code}
            onChangeText={setCode}
            style={{
              backgroundColor: "#F3EDE3",
              padding: 15,
              borderRadius: 12,
              marginBottom: 12,
            }}
          />
          <TouchableOpacity
            onPress={verifyAndSignUp}
            disabled={busy}
            style={{
              backgroundColor: "#5A4634",
              padding: 15,
              borderRadius: 12,
              alignItems: "center",
            }}
          >
            {busy ? (
              <ActivityIndicator color="#FAF9F7" />
            ) : (
              <Text style={{ color: "#FAF9F7", fontWeight: "700" }}>
                Verify & Sign Up
              </Text>
            )}
          </TouchableOpacity>
        </>
      )}

      {err && (
        <Text
          style={{ color: "#b3261e", textAlign: "center", marginTop: 10 }}
        >
          {err}
        </Text>
      )}
    </SafeAreaView>
  );
}
