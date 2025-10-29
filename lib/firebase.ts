import { initializeApp, getApps, getApp } from "firebase/app";
import {
  getAuth,
  initializeAuth,
  getReactNativePersistence,
  type Auth, // ✅ import the Auth type
} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyAie-wZNOKpjuLeRfIeNf88Z1Z4QPnNxN0",
  authDomain: "hera-a378b.firebaseapp.com",
  projectId: "hera-a378b",
  storageBucket: "hera-a378b.appspot.com", // ✅ FIXED: should end with .appspot.com
  messagingSenderId: "981959582947",
  appId: "1:981959582947:web:2d528540b9092901c951d6"
};
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

// ✅ Typed properly
let auth: Auth;
try {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
} catch {
  auth = getAuth(app);
}

export { app, auth };
