import Constants from 'expo-constants';

const extra = Constants.expoConfig?.extra;

if (!extra) {
  throw new Error("Expo config `extra` is missing");
}

// API URL
export const API_URL = extra.API_URL;
export const EMAIL_API = extra.EMAIL_API;

// Firebase configuration
export const FIREBASE_CONFIG = {
  apiKey: extra.FIREBASE_API_KEY,
  authDomain: extra.FIREBASE_AUTH_DOMAIN,
  projectId: extra.FIREBASE_PROJECT_ID,
  storageBucket: extra.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: extra.FIREBASE_MESSAGING_SENDER_ID,
  appId: extra.FIREBASE_APP_ID,
};

// Android Client ID
export const FIREBASE_ANDROID_CLIENT_ID = extra.FIREBASE_ANDROID_CLIENT_ID;
