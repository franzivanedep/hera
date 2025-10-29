import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, ActivityIndicator } from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "expo-router";

export default function SignUp() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

async function handleSignUp() {
  setBusy(true);
  setErr(null);

  try {
    // 1️⃣ Create user in Firebase
    await createUserWithEmailAndPassword(auth, email.trim(), pw);

    // 2️⃣ Send only the email to backend
    const BASE_URL = process.env.EXPO_PUBLIC_API_URL; // make sure this is set
    await fetch(`${BASE_URL}/users/newUser`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ gmail: email.trim() }), // only email
    });

    // 3️⃣ Navigate after signup
    router.replace("/"); 

  } catch (e: any) {
    const m = String(e?.message ?? e ?? "");
    if (m.includes("auth/email-already-in-use")) setErr("Email already in use.");
    else if (m.includes("auth/invalid-email")) setErr("Invalid email.");
    else if (m.includes("auth/weak-password")) setErr("Password should be at least 6 characters.");
    else setErr(m.replace(/^Firebase:\s*/,"").trim());
  } finally {
    setBusy(false);
  }
}


  return (
    <SafeAreaView style={{ flex: 1, padding: 24, justifyContent: "center", backgroundColor: "#F8F1E4" }}>
      <Text style={{ fontSize: 28, fontWeight: "700", color: "#3C2E23", textAlign: "center", marginBottom: 20 }}>
        Create your HERA account
      </Text>
      <TextInput
        placeholder="Email"
        autoCapitalize="none"
        keyboardType="email-address"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        style={styles.input}
        value={pw}
        onChangeText={setPw}
      />
      {err ? <Text style={{ color: "#b3261e", textAlign: "center", marginBottom: 8 }}>{err}</Text> : null}
      <TouchableOpacity style={styles.btn} onPress={handleSignUp} disabled={busy}>
        {busy ? <ActivityIndicator color="#FAF9F7" /> : <Text style={styles.btnText}>Sign Up</Text>}
      </TouchableOpacity>
      <Text style={{ textAlign: "center", marginTop: 14 }}>
        Already have an account?{" "}
        <Text onPress={() => router.replace("/(auth)/login")} style={styles.link}>
          Log in
        </Text>
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  input: { backgroundColor: "#F3EDE3", borderRadius: 12, padding: 15, marginBottom: 12, color: "#3C2E23", fontSize: 16 },
  btn: { backgroundColor: "#5A4634", paddingVertical: 15, borderRadius: 12, alignItems: "center", marginTop: 6 },
  btnText: { color: "#FAF9F7", fontSize: 18, fontWeight: "700" },
  link: { color: "#5A4634", fontWeight: "700", textDecorationLine: "underline" }
});
