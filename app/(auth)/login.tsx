import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithCredential, sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/lib/firebase";

import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { makeRedirectUri } from "expo-auth-session";

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [pwVisible, setPwVisible] = useState(false);
  const canSubmit = email.trim().length > 3 && password.length >= 6 && !busy;

  // ✅ Setup Google Auth Request
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: "YOUR_WEB_CLIENT_ID.apps.googleusercontent.com", // from Google Cloud
    androidClientId: "YOUR_ANDROID_CLIENT_ID.apps.googleusercontent.com",
    iosClientId: "YOUR_IOS_CLIENT_ID.apps.googleusercontent.com",
    webClientId: "YOUR_WEB_CLIENT_ID.apps.googleusercontent.com",
    redirectUri: makeRedirectUri({ scheme: "heraapp" }),
  });

  useEffect(() => {
    const signInWithGoogle = async () => {
      if (response?.type === "success") {
        const { id_token, access_token } = response.params;
        if (!id_token) {
          setErr("Google login failed: no ID token received.");
          return;
        }

        const credential = GoogleAuthProvider.credential(id_token, access_token ?? undefined);
        try {
          await signInWithCredential(auth, credential);
          router.replace("/(tabs)");
        } catch (e: any) {
          setErr(normalize(e));
        }
      }
    };
    signInWithGoogle();
  }, [response]);

  function normalize(e: any) {
    const m = String(e?.message ?? e ?? "");
    if (m.includes("auth/invalid-email")) return "Invalid email address.";
    if (m.includes("auth/user-not-found")) return "No account found for this email.";
    if (m.includes("auth/wrong-password") || m.includes("auth/invalid-credential"))
      return "Wrong email or password.";
    if (m.includes("auth/too-many-requests")) return "Too many attempts. Try again later.";
    if (m.includes("auth/popup-closed-by-user")) return "Sign-in cancelled.";
    return m.replace(/^Firebase:\s*/,"").trim();
  }

  async function handleLogin() {
    if (!canSubmit) return;
    setBusy(true);
    setErr(null);
    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
      router.replace("/(tabs)");
    } catch (e) {
      setErr(normalize(e));
    } finally {
      setBusy(false);
    }
  }

  async function handleForgotPassword() {
    if (!email.trim()) {
      setErr("Enter your email first to receive a reset link.");
      return;
    }
    setBusy(true);
    setErr(null);
    try {
      await sendPasswordResetEmail(auth, email.trim());
      setErr("Reset link sent. Check your inbox.");
    } catch (e) {
      setErr(normalize(e));
    } finally {
      setBusy(false);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require("../../assets/images/models.png")}
        style={styles.background}
        imageStyle={{ opacity: 0.22 }}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          style={{ flex: 1, justifyContent: "center" }}
        >
          <View style={styles.overlay}>
            <Text style={styles.brand}>HERA Nail Lounge & Spa</Text>
            <Text style={styles.welcome}>Welcome Back, Gorgeous</Text>

            <TextInput
              placeholder="Email"
              placeholderTextColor="#7D6B5A"
              style={styles.input}
              autoCapitalize="none"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
              returnKeyType="next"
            />

            <View style={{ position: "relative" }}>
              <TextInput
                placeholder="Password"
                placeholderTextColor="#7D6B5A"
                secureTextEntry={!pwVisible}
                style={[styles.input, { paddingRight: 70 }]}
                value={password}
                onChangeText={setPassword}
                onSubmitEditing={handleLogin}
                returnKeyType="done"
              />
              <TouchableOpacity
                onPress={() => setPwVisible(v => !v)}
                style={styles.eye}
              >
                <Text style={{ color: "#5A4634", fontWeight: "600" }}>
                  {pwVisible ? "Hide" : "Show"}
                </Text>
              </TouchableOpacity>
            </View>

            {err ? <Text style={styles.errorText}>{err}</Text> : null}

            <TouchableOpacity
              style={[styles.loginButton, { opacity: canSubmit ? 1 : 0.7 }]}
              onPress={handleLogin}
              disabled={!canSubmit}
            >
              {busy ? (
                <ActivityIndicator color="#FAF9F7" />
              ) : (
                <Text style={styles.loginText}>Log In</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity onPress={handleForgotPassword}>
              <Text style={styles.forgot}>Forgot password?</Text>
            </TouchableOpacity>

            <Text style={styles.orText}>or</Text>

            <TouchableOpacity
              style={styles.googleButton}
              onPress={() => promptAsync()}
              disabled={!request || busy}
            >
              <Text style={styles.googleText}>Continue with Google</Text>
            </TouchableOpacity>

            <Text style={styles.signupRow}>
              Don’t have an account?{" "}
              <Text onPress={() => router.push("/(auth)/signup")} style={styles.link}>
                Sign up
              </Text>
            </Text>

            <Text style={styles.footerText}>
              By continuing, you agree to our <Text style={styles.link}>Terms</Text> &{" "}
              <Text style={styles.link}>Privacy Policy</Text>.
            </Text>
          </View>
        </KeyboardAvoidingView>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8F1E4" },
  background: { flex: 1, justifyContent: "center" },
  overlay: { paddingHorizontal: 30, justifyContent: "center" },
  brand: {
    fontSize: 30, fontWeight: "700", color: "#3C2E23",
    textAlign: "center", marginBottom: 8, letterSpacing: 1,
  },
  welcome: { fontSize: 16, color: "#5A4634", textAlign: "center", marginBottom: 24 },
  input: {
    backgroundColor: "#F3EDE3", borderRadius: 12, padding: 15, marginBottom: 15,
    color: "#3C2E23", fontSize: 16,
  },
  eye: { position: "absolute", right: 12, top: 15, padding: 6 },
  loginButton: {
    backgroundColor: "#5A4634", paddingVertical: 15, borderRadius: 12, marginTop: 4,
    alignItems: "center",
  },
  loginText: { color: "#FAF9F7", fontSize: 18, fontWeight: "600" },
  errorText: { color: "#b3261e", textAlign: "center", marginBottom: 8, fontSize: 13 },
  forgot: { textAlign: "center", color: "#7D6B5A", marginTop: 10 },
  orText: { textAlign: "center", color: "#7D6B5A", marginVertical: 15 },
  googleButton: { backgroundColor: "#E2D6C4", paddingVertical: 15, borderRadius: 12, alignItems: "center" },
  googleText: { color: "#3C2E23", fontSize: 16, fontWeight: "500" },
  signupRow: { textAlign: "center", color: "#5A4634", marginTop: 18, fontSize: 14 },
  footerText: { textAlign: "center", color: "#7D6B5A", marginTop: 18, fontSize: 12 },
  link: { color: "#5A4634", fontWeight: "700", textDecorationLine: "underline" },
});
