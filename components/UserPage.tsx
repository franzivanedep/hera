import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { signOut } from "firebase/auth";
import { auth } from "../lib/firebase";
import { go, type UserSubRoute } from "./logics/usermenu";
import useUserInfo from "@/hooks/useUserInfo";

const { width } = Dimensions.get("window");

interface MenuItem {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
}

const routeMap: Record<string, UserSubRoute> = {
  Transactions: "transactions",
  Redemptions: "redemptions",
  "Other Activities": "activities",
  "Expired Points": "expired",
  "Redeem a Voucher": "redeem",
  "App Tour": "tour",
  Help: "help",
  Settings: "settings",
  Legal: "legal",
};

const UserPage: React.FC = () => {
  const { email, displayName } = useUserInfo();

  const activityItems: MenuItem[] = [
    { icon: "receipt-outline", label: "Transactions" },
    { icon: "gift-outline", label: "Redemptions" },
    { icon: "star-outline", label: "Other Activities" },
    { icon: "alert-circle-outline", label: "Expired Points" },
  ];

  const voucherItems: MenuItem[] = [
    { icon: "ticket-outline", label: "Redeem a Voucher" },
  ];

  const supportItems: MenuItem[] = [
    { icon: "compass-outline", label: "App Tour" },
    { icon: "help-circle-outline", label: "Help" },
    { icon: "settings-outline", label: "Settings" },
    { icon: "document-text-outline", label: "Legal" },
  ];

 const handleLogout = () =>
  Alert.alert("Log out", "Are you sure you want to log out?", [
    { text: "Cancel", style: "cancel" },
    {
      text: "Log out",
      onPress: async () => {
        try {
          // 🔹 Step 1: Forcefully sign out from Firebase
          await signOut(auth);

          // 🔹 Step 2: Wait for Firebase to actually clear the user
          await new Promise<void>((resolve) => {
            const unsub = auth.onAuthStateChanged((user) => {
              if (!user) {
                unsub();
                resolve();
              }
            });
          });

          // 🔹 Step 3: Fully clear local storage
          await AsyncStorage.clear();


          // 🔹 Step 4: Navigate safely AFTER user is null
          router.replace("/login");
        } catch (error) {
          console.warn("Logout error:", error);
        }
      },
    },
  ]);

  const renderSection = (title: string, items: MenuItem[]) => (
    <View style={{ marginBottom: 20 }}>
      <Text
        style={{
          fontSize: 16,
          fontWeight: "700",
          color: "#3A2E23",
          marginLeft: 20,
          marginBottom: 12,
        }}
      >
        {title}
      </Text>

      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "flex-start",
          paddingHorizontal: 10,
        }}
      >
        {items.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={{
              width: width / 4,
              alignItems: "center",
              marginVertical: 12,
            }}
            activeOpacity={0.7}
            onPress={() => {
              const key = routeMap[item.label];
              if (key) go(key);
            }}
          >
            <Ionicons name={item.icon} size={28} color="#3A2E23" />
            <Text
              style={{
                fontSize: 13,
                color: "#3A2E23",
                marginTop: 6,
                textAlign: "center",
              }}
            >
              {item.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{ backgroundColor: "#F8F4EF", flex: 1 }}
      contentContainerStyle={{ paddingBottom: 60 }}
    >
      {/* Header */}
      <View
        style={{
          paddingHorizontal: 20,
          paddingTop: 32,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <View
          style={{
            width: 72,
            height: 72,
            borderRadius: 36,
            backgroundColor: "#E8DCC3",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Ionicons name="person-outline" size={42} color="#3A2E23" />
        </View>
        <View style={{ marginLeft: 16 }}>
          <Text style={{ fontSize: 22, fontWeight: "700", color: "#3A2E23" }}>
            {displayName || "Guest User"}
          </Text>
          {email ? (
            <Text style={{ fontSize: 14, color: "#6E6258" }}>{email}</Text>
          ) : (
            <Text style={{ fontSize: 14, color: "#6E6258" }}>No email</Text>
          )}
        </View>
      </View>

      {/* Sections */}
      <View style={{ paddingTop: 24 }}>
        {renderSection("Activity", activityItems)}
        {renderSection("Vouchers", voucherItems)}
        {renderSection("Support & Settings", supportItems)}
      </View>

      {/* Logout */}
      <TouchableOpacity
        onPress={handleLogout}
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#E8DCC3",
          paddingVertical: 18,
          borderRadius: 16,
          width: width - 40,
          alignSelf: "center",
          marginTop: 10,
        }}
        activeOpacity={0.8}
      >
        <Ionicons name="log-out-outline" size={24} color="#A64B2A" />
        <Text
          style={{
            fontSize: 16,
            fontWeight: "600",
            color: "#A64B2A",
            marginLeft: 8,
          }}
        >
          Log out
        </Text>
      </TouchableOpacity>

      {/* Footer */}
      <View
        style={{
          alignItems: "center",
          marginTop: 16,
          marginBottom: 24,
        }}
      >
        <Text style={{ color: "#8B7E74", fontSize: 13 }}>
          Software version V1.3.1(658)
        </Text>
      </View>
    </ScrollView>
  );
};

export default UserPage;
