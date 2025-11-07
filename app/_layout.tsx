import { Stack, useRouter, useSegments } from "expo-router";
import { ThemeProvider, DefaultTheme } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { AuthProvider, useAuth } from "@/providers/AuthProvider";
import { useMaintenanceStatus } from "../components/logics/useMaintenanceStatus"; // ✅ Import your hook
import MaintenancePage from "../app/maintenance"; // ✅ Import maintenance screen
import { ActivityIndicator, View } from "react-native";

export const unstable_settings = { anchor: "(tabs)" };

const BeigeTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#5A4634",
    background: "#FAF9F7",
    card: "#F3EDE3",
    text: "#3C2E23",
    border: "#E2D6C4",
    notification: "#CBBBA0",
  },
};

function Guard({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;
    const inAuth = segments[0] === "(auth)";
    if (!user && !inAuth) router.replace("/(auth)/login");
    if (user && inAuth) router.replace("/(tabs)");
  }, [user, loading, segments]);

  return <>{children}</>;
}

export default function RootLayout() {
  const { isMaintenance, loading } = useMaintenanceStatus();

  // ✅ Show loading spinner while checking maintenance
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#9E7E63" />
      </View>
    );
  }

  // ✅ If maintenance mode is ON → show Maintenance Page
  if (isMaintenance) {
    return <MaintenancePage />;
  }

  // ✅ Otherwise, show normal app
  return (
    <ThemeProvider value={BeigeTheme}>
      <AuthProvider>
        <Guard>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="user" options={{ headerShown: false }} />
            <Stack.Screen
              name="modal"
              options={{
                presentation: "modal",
                headerShown: true,
                title: "Modal",
                headerStyle: { backgroundColor: "#F3EDE3" },
                headerTintColor: "#3C2E23",
                headerTitleStyle: { fontWeight: "600" },
              }}
            />
          </Stack>
          <StatusBar style="dark" backgroundColor="#FAF9F7" />
        </Guard>
      </AuthProvider>
    </ThemeProvider>
  );
}
