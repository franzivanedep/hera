import { Stack, useRouter, useSegments } from "expo-router";
import { ThemeProvider, DefaultTheme } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { AuthProvider, useAuth } from "@/providers/AuthProvider";
import { useMaintenanceStatus } from "../components/logics/useMaintenanceStatus";
import MaintenancePage from "../app/maintenance";
import { ActivityIndicator, View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// 🧩 Network
import { NetworkProvider } from "../context/NetworkProvider";
import OfflineModal from "../components/offlineBanner"; 

// 🧩 API Error
import { ApiErrorProvider } from "../context/ApiErrorProvider";
import ApiErrorBanner from "../components/ApiErrorBanner";

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
  }, [user, loading, segments, router]);

  return <>{children}</>;
}

export default function RootLayout() {
  const { isMaintenance, loading } = useMaintenanceStatus();

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#9E7E63" />
      </View>
    );
  }

  if (isMaintenance) {
    return <MaintenancePage />;
  }

  return (
    <ThemeProvider value={BeigeTheme}>
      <AuthProvider>
        <ApiErrorProvider>
          <NetworkProvider>
            <SafeAreaView style={styles.safeArea}>

              {/* 🔴 Offline Modal */}
              <OfflineModal />

              {/* 🔴 API error banner */}
              <ApiErrorBanner />

              {/* Main content */}
              <View style={styles.mainContent}>
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
              </View>
            </SafeAreaView>
          </NetworkProvider>
        </ApiErrorProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FAF9F7",
  },
  mainContent: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
