import 'dotenv/config';

export default ({ config }) => ({
  expo: {
    name: "HeraLoungeSpa",
    slug: "heraapp",
    owner: "franzthegreat",
    scheme: "heraapp",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/app-icon.png",
    userInterfaceStyle: "automatic",

    extra: {
      API_URL: process.env.EXPO_PUBLIC_API_URL,
      EMAIL_API: process.env.EXPO_PUBLIC_EMAIL_API,
      FIREBASE_API_KEY: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
      FIREBASE_AUTH_DOMAIN: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
      FIREBASE_PROJECT_ID: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
      FIREBASE_STORAGE_BUCKET: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
      FIREBASE_MESSAGING_SENDER_ID: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
      FIREBASE_APP_ID: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
      FIREBASE_ANDROID_CLIENT_ID: process.env.EXPO_PUBLIC_FIREBASE_ANDROID_CLIENT_ID,
      eas: {
        projectId: "b7340c82-6470-42d1-9939-676e18c4cded",
      },
    },

    ios: {
      supportsTablet: true,
    },

    android: {
      package: "com.hera.app",   
      adaptiveIcon: {
        foregroundImage: "./assets/images/app-icon.png",
        backgroundImage: "./assets/images/android-icon-background.png",
        backgroundColor: "#E6F4FE",
      },
      permissions: [],
    },

    plugins: [
      [
        "expo-splash-screen",
        {
          image: "./assets/images/splash-icon.png",
          imageWidth: 200,
          resizeMode: "contain",
          backgroundColor: "#ffffff",
        }
      ],
      "expo-router",
      "expo-font",
      "expo-web-browser",
    ],

    web: {
      output: "static",
      favicon: "./assets/images/logo.png",
    },

    experiments: {
      typedRoutes: true,
      reactCompiler: true
    }
  }
});
