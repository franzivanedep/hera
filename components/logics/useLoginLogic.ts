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

export default function useLoginLogic() {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [busy, setBusy] = useState<boolean>(false);
  const [err, setErr] = useState<string | null>(null);
  const [pwVisible, setPwVisible] = useState<boolean>(false);

  const canSubmit = email.trim().length > 3 && password.length >= 6 && !busy;

  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: "YOUR_WEB_CLIENT_ID.apps.googleusercontent.com",
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

        const credential = GoogleAuthProvider.credential(
          id_token,
          access_token ?? undefined
        );

        try {
          const result = await signInWithCredential(auth, credential);

          // ✅ Save UID in AsyncStorage (professional)
          await AsyncStorage.setItem("uid", result.user.uid);

          router.replace("/(tabs)");
        } catch (e: any) {
          setErr(normalize(e));
        }
      }
    };

    signInWithGoogle();
  }, [response, router]);

  const normalize = (e: any): string => {
    const m = String(e?.message ?? e ?? "");
    if (m.includes("auth/invalid-email")) return "Invalid email address.";
    if (m.includes("auth/user-not-found")) return "No account found for this email.";
    if (m.includes("auth/wrong-password") || m.includes("auth/invalid-credential"))
      return "Wrong email or password.";
    if (m.includes("auth/too-many-requests")) return "Too many attempts. Try again later.";
    if (m.includes("auth/popup-closed-by-user")) return "Sign-in cancelled.";
    return m.replace(/^Firebase:\s*/, "").trim();
  };

  const handleLogin = async () => {
    if (!canSubmit) return;
    setBusy(true);
    setErr(null);

    try {
      const result = await signInWithEmailAndPassword(auth, email.trim(), password);

      // ✅ Save UID in AsyncStorage (professional)
      await AsyncStorage.setItem("uid", result.user.uid);

      router.replace("/(tabs)");
    } catch (e: any) {
      setErr(normalize(e));
    } finally {
      setBusy(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!email.trim()) {
      setErr("Enter your email first to receive a reset link.");
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
