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
import styles from "../components/styles/UserPageStyles";

const { width } = Dimensions.get("window");

// ---------------------------------------------------------
// ❌ Add which labels you want to disable here
// Example: ["Settings", "Help", "Legal", "App Tour"]
// ---------------------------------------------------------
const disabledButtons = ["Redemptions", "Other Activities", "Expired Points", "Redeem a Voucher"];
// ---------------------------------------------------------

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
            await signOut(auth);
            await new Promise<void>((resolve) => {
              const unsub = auth.onAuthStateChanged((user) => {
                if (!user) {
                  unsub();
                  resolve();
                }
              });
            });
            await AsyncStorage.clear();
            router.replace("/login");
          } catch (error) {
            console.warn("Logout error:", error);
          }
        },
      },
    ]);

  // -----------------------------
  // Modified Section Renderer
  // -----------------------------
  const renderSection = (title: string, items: MenuItem[]) => (
    <View style={{ marginBottom: 24 }}>
      <Text
        style={[
          styles.sectionTitle,
          width > 800 && { fontSize: 18, marginLeft: 10 },
        ]}
      >
        {title}
      </Text>

      <View style={styles.iconGrid}>
        {items.map((item, index) => {
          const isDisabled = disabledButtons.includes(item.label);

          return (
            <TouchableOpacity
              key={index}
              style={[
                styles.iconItem,
                width > 800 && { width: "20%", marginVertical: 14 },
                isDisabled && { opacity: 0.4 },
              ]}
              activeOpacity={isDisabled ? 1 : 0.7}
              onPress={() => {
                if (isDisabled) return; // Prevent press
                const key = routeMap[item.label];
                if (key) go(key);
              }}
            >
              <Ionicons
                name={item.icon}
                size={width > 800 ? 40 : 28}
                color="#3A2E23"
              />
              <Text
                style={[
                  styles.iconLabel,
                  width > 800 && { fontSize: 15 },
                ]}
              >
                {item.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={styles.container}
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
          style={[
            styles.avatarCircle,
            width > 800 && { width: 100, height: 100, borderRadius: 50 },
          ]}
        >
          <Ionicons
            name="person-outline"
            size={width > 800 ? 60 : 42}
            color="#3A2E23"
          />
        </View>

        <View style={{ marginLeft: 16 }}>
          <Text
            style={[
              styles.userName,
              width > 800 && { fontSize: 28 },
            ]}
          >
            {displayName || "Guest User"}
          </Text>
          <Text
            style={[
              styles.subText,
              width > 800 && { fontSize: 16 },
            ]}
          >
            {email || "No email"}
          </Text>
        </View>
      </View>

      {/* Sections */}
      <View style={{ paddingHorizontal: 15, paddingTop: 24 }}>
        {renderSection("Activity", activityItems)}
        {renderSection("Vouchers", voucherItems)}
        {renderSection("Support & Settings", supportItems)}
      </View>

      {/* Logout */}
      <TouchableOpacity
        onPress={handleLogout}
        style={[
          styles.logoutButton,
          width > 800 && { paddingVertical: 20, width: "90%" },
        ]}
        activeOpacity={0.8}
      >
        <Ionicons
          name="log-out-outline"
          size={width > 800 ? 30 : 24}
          color="#A64B2A"
        />
        <Text
          style={[
            styles.logoutText,
            width > 800 && { fontSize: 18 },
          ]}
        >
          Log out
        </Text>
      </TouchableOpacity>

      {/* Footer */}
      <View style={styles.footer}>
        <Text
          style={[
            styles.footerText,
            width > 800 && { fontSize: 14 },
          ]}
        >
          Software version V1.3.1(658)
        </Text>
      </View>
    </ScrollView>
  );
};

export default UserPage;
