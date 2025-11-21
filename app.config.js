import 'dotenv/config';

export default ({ config }) => ({
  ...config,
  expo: {
    ...config.expo,
    name: "hera Lounge & Spa",       
    slug: "heraapp",
    owner: "franzthegreat",
    scheme: "heraapp",               
    version: "1.0.0",
    icon: "./assets/images/logo.png", 
    userInterfaceStyle: "automatic",
    extra: {
      ...config.expo?.extra,
      eas: {
        projectId: "b7340c82-6470-42d1-9939-676e18c4cded",
        ...(config.expo?.extra?.eas || {}),
      },
      API_URL: process.env.EXPO_PUBLIC_API_URL,
      FIREBASE_API_KEY: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
      FIREBASE_AUTH_DOMAIN: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
      FIREBASE_PROJECT_ID: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
      FIREBASE_STORAGE_BUCKET: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
      FIREBASE_MESSAGING_SENDER_ID: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
      FIREBASE_APP_ID: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
      FIREBASE_ANDROID_CLIENT_ID: process.env.EXPO_PUBLIC_FIREBASE_ANDROID_CLIENT_ID,
    },
    ios: {
      supportsTablet: true,
      icon: "./assets/images/logo.png", // Optional: iOS specific icon
    },
    android: {
      package: "hera.com",
      adaptiveIcon: {
        foregroundImage: "./assets/images/android-icon-foreground.png",
        backgroundImage: "./assets/images/android-icon-background.png",
        backgroundColor: "#E6F4FE",
        monochromeImage: "./assets/images/android-icon-monochrome.png",
      },
      edgeToEdgeEnabled: true,
      predictiveBackGestureEnabled: false,
      permissions: [],
    },
    web: {
      output: "static",
      favicon: "./assets/images/favicon.png",
    },
  },
});
