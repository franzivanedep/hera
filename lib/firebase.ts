// lib/firebase.ts
import { initializeApp, getApps, getApp } from "firebase/app";
import {
  getAuth,
  initializeAuth,
  getReactNativePersistence,
  type Auth,
} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";

// ✅ Import Firebase config from config.ts
import { FIREBASE_CONFIG } from "../config";

// ✅ Reuse existing app if already initialized
const app = getApps().length ? getApp() : initializeApp(FIREBASE_CONFIG);

// ✅ Initialize Auth with AsyncStorage persistence
let auth: Auth;
try {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
} catch {
  auth = getAuth(app);
}

// ✅ Initialize Firestore
const db = getFirestore(app);

export { app, auth, db };
