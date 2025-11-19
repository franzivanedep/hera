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
import { API_URL, FIREBASE_ANDROID_CLIENT_ID } from '../../config';

WebBrowser.maybeCompleteAuthSession();

const BASE_URL = API_URL;

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
    androidClientId: FIREBASE_ANDROID_CLIENT_ID,
    redirectUri: makeRedirectUri({ scheme: "heraapp" }),
  });

  // --- HANDLE GOOGLE SIGN-IN ---
  useEffect(() => {
    const signInWithGoogle = async () => {
      if (response?.type !== "success") return;

      const { id_token, access_token } = response.params;
      if (!id_token) {
        setErr("Google login failed. Please try again.");
        return;
      }

      const credential = GoogleAuthProvider.credential(id_token, access_token ?? undefined);

      try {
        const result = await signInWithCredential(auth, credential);
        const gmail = result.user.email;
        const uid = result.user.uid;

        // Post user to backend
        try {
          await fetch(`${BASE_URL}/users/newUser`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ gmail, uid }),
          });
        } catch {
          // silently fail in production
        }

        await AsyncStorage.setItem("uid", uid);
        router.replace("/(tabs)");
      } catch {
        setErr("Google login failed. Please try again.");
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
    return "An unexpected error occurred. Please try again.";
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
