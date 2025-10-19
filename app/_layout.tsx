import { Stack, useRouter, useSegments } from "expo-router";
import { ThemeProvider, DefaultTheme } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { AuthProvider, useAuth } from "@/providers/AuthProvider";

export const unstable_settings = { anchor: "(tabs)" };

// ✅ keep DefaultTheme’s fonts etc., only override colors
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
  return (
    <ThemeProvider value={BeigeTheme}>
      <AuthProvider>
        <Guard>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="user" options={{ headerShown: false }} /> {/* ← add this */}
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
