import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, SafeAreaView } from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "expo-router";

export default function SignUp() {
  const router = useRouter();
  const BASE_URL = process.env.EXPO_PUBLIC_API_URL;

  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [code, setCode] = useState("");
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function sendCode() {
    setBusy(true);
    try {
      const res = await fetch(`${BASE_URL}/email/send`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ gmail: email.trim() }),
      });
      if (!res.ok) throw new Error("Failed to send verification email");
      setSent(true);
    } catch (e: any) {
      setErr(e.message);
    } finally {
      setBusy(false);
    }
  }

  async function verifyAndSignUp() {
    setBusy(true);
    try {
      const res = await fetch(`${BASE_URL}/email/verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ gmail: email.trim(), code }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Verification failed");

      // Proceed only if verified
      await createUserWithEmailAndPassword(auth, email.trim(), pw);
      await fetch(`${BASE_URL}/users/newUser`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ gmail: email.trim() }),
      });

      router.replace("/");
    } catch (e: any) {
      setErr(e.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "center", padding: 24, backgroundColor: "#F8F1E4" }}>
      <Text style={{ fontSize: 28, fontWeight: "700", textAlign: "center", color: "#3C2E23", marginBottom: 20 }}>
        {sent ? "Verify your email" : "Create your HERA account"}
      </Text>

      {!sent ? (
        <>
          <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={{ backgroundColor: "#F3EDE3", padding: 15, borderRadius: 12, marginBottom: 12 }} />
          <TextInput placeholder="Password" secureTextEntry value={pw} onChangeText={setPw} style={{ backgroundColor: "#F3EDE3", padding: 15, borderRadius: 12 }} />
          <TouchableOpacity onPress={sendCode} disabled={busy} style={{ backgroundColor: "#5A4634", padding: 15, borderRadius: 12, alignItems: "center", marginTop: 10 }}>
            {busy ? <ActivityIndicator color="#FAF9F7" /> : <Text style={{ color: "#FAF9F7", fontWeight: "700" }}>Send Verification Code</Text>}
          </TouchableOpacity>
        </>
      ) : (
        <>
          <TextInput placeholder="Enter code" keyboardType="numeric" value={code} onChangeText={setCode} style={{ backgroundColor: "#F3EDE3", padding: 15, borderRadius: 12, marginBottom: 12 }} />
          <TouchableOpacity onPress={verifyAndSignUp} disabled={busy} style={{ backgroundColor: "#5A4634", padding: 15, borderRadius: 12, alignItems: "center" }}>
            {busy ? <ActivityIndicator color="#FAF9F7" /> : <Text style={{ color: "#FAF9F7", fontWeight: "700" }}>Verify & Sign Up</Text>}
          </TouchableOpacity>
        </>
      )}
      {err && <Text style={{ color: "#b3261e", textAlign: "center", marginTop: 10 }}>{err}</Text>}
    </SafeAreaView>
  );
}
