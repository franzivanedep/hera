import { initializeApp, getApps } from "firebase/app";
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyBJoQGmWkBdt-1AYewfOmUQ0JB_Cf5SMY8",
  authDomain: "beta-hera.firebaseapp.com",
  projectId: "beta-hera",
  storageBucket: "beta-hera.firebasestorage.app",
  messagingSenderId: "1020811142027",
  appId: "1:1020811142027:web:003c59ab3c17853556058e",
  measurementId: "G-3KS79Y2KFT"
};

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);

let auth = getAuth(app);
try {
  // @ts-ignore avoid double init during fast refresh
  if (!(auth as any)._persistor) {
    auth = initializeAuth(app, {
      persistence: getReactNativePersistence(AsyncStorage),
    });
  }
} catch {
  auth = getAuth(app);
}

export { app, auth };
