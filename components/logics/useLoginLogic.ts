import { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithCredential,
  sendPasswordResetEmail,
} from "firebase/auth";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import { makeRedirectUri } from "expo-auth-session";
import { auth } from "@/lib/firebase";

WebBrowser.maybeCompleteAuthSession();

const BASE_URL = process.env.EXPO_PUBLIC_API_URL;

export default function useLoginLogic() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [pwVisible, setPwVisible] = useState(false);

  const canSubmit = email.trim().length > 3 && password.length >= 6 && !busy;

  // --- GOOGLE AUTH REQUEST ---
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId:
      process.env.EXPO_PUBLIC_FIREBASE_ANDROID_CLIENT_ID, // Firebase Android OAuth
    redirectUri: makeRedirectUri({ scheme: "heraapp" }),
  });


 // --- HANDLE GOOGLE SIGN-IN ---
useEffect(() => {
  const signInWithGoogle = async () => {
    console.log("Google response changed:", response); // Debug response
    if (response?.type !== "success") {
      if (response) console.log("Google login not successful:", response.type);
      return;
    }

    const { id_token, access_token } = response.params;
    console.log("Google tokens received:", { id_token, access_token });

    if (!id_token) {
      console.error("Google login failed: No ID token received.");
      setErr("Google login failed: No ID token received.");
      return;
    }

    const credential = GoogleAuthProvider.credential(id_token, access_token ?? undefined);

    try {
      const result = await signInWithCredential(auth, credential);
      console.log("Firebase user credential:", result.user);

      const gmail = result.user.email;
      const uid = result.user.uid;
      console.log("User info:", { gmail, uid });

      // --- Post user to backend ---
      try {
        const res = await fetch(`${BASE_URL}/users/newUser`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ gmail, uid }),
        });
        console.log("Backend response:", res.status, await res.text());
      } catch (apiErr) {
        console.warn("Failed posting to /users/newUser:", apiErr);
      }

      await AsyncStorage.setItem("uid", uid);
      router.replace("/(tabs)");
    } catch (firebaseErr: any) {
      console.error("Firebase login error:", firebaseErr);
      setErr(firebaseErr.message || "Google login failed.");
    }
  };

  signInWithGoogle();
}, [response]);


  // --- NORMALIZE ERRORS ---
  const normalize = (e: any): string => {
    const msg = String(e?.message ?? e ?? "");
    if (msg.includes("auth/invalid-email")) return "Invalid email address.";
    if (msg.includes("auth/user-not-found")) return "No account found for this email.";
    if (msg.includes("auth/wrong-password") || msg.includes("auth/invalid-credential"))
      return "Wrong email or password.";
    if (msg.includes("auth/too-many-requests")) return "Too many attempts. Try again later.";
    if (msg.includes("auth/popup-closed-by-user")) return "Sign-in cancelled.";
    return msg.replace(/^Firebase:\s*/, "").trim();
  };

  // --- EMAIL/PASSWORD LOGIN ---
  const handleLogin = async () => {
    if (!canSubmit) return;
    setBusy(true);
    setErr(null);

    try {
      const result = await signInWithEmailAndPassword(auth, email.trim(), password);
      await AsyncStorage.setItem("uid", result.user.uid);
      router.replace("/(tabs)");
    } catch (e: any) {
      setErr(normalize(e));
    } finally {
      setBusy(false);
    }
  };

  // --- FORGOT PASSWORD ---
  const handleForgotPassword = async () => {
    if (!email.trim()) {
      setErr("Enter your email first.");
      return;
    }

    setBusy(true);
    setErr(null);

    try {
      await sendPasswordResetEmail(auth, email.trim());
      setErr("Reset link sent. Check your inbox.");
    } catch (e: any) {
      setErr(normalize(e));
    } finally {
      setBusy(false);
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    busy,
    err,
    pwVisible,
    setPwVisible,
    canSubmit,
    handleLogin,
    handleForgotPassword,
    promptAsync,
    request,
  };
}
