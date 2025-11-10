import React, { useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import { useAuth } from "@/providers/AuthProvider";
import { useRouter } from "expo-router";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/(auth)/login"); // ✅ Navigate only after render
    }
  }, [user, loading, router]); // ✅ Added router

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#FAF9F7",
        }}
      >
        <ActivityIndicator size="large" color="#5A4634" />
      </View>
    );
  }

  // Only show children if user is logged in
  if (!user) return null;

  return <>{children}</>;
};

export default ProtectedRoute;
