import React from "react";
import { View, Text, TouchableOpacity, ScrollView, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { signOut } from "firebase/auth";
import { auth } from "../lib/firebase";                 // sibling folder
import styles from "./styles/UserPageStyles";            // inside components/styles
import { go, type UserSubRoute } from "./logics/usermenu";

interface MenuItem { icon: keyof typeof Ionicons.glyphMap; label: string; }

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
  const menuItems: MenuItem[] = [
    { icon: "receipt-outline", label: "Transactions" },
    { icon: "gift-outline", label: "Redemptions" },
    { icon: "star-outline", label: "Other Activities" },
    { icon: "alert-circle-outline", label: "Expired Points" },
    { icon: "ticket-outline", label: "Redeem a Voucher" },
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
          try { await signOut(auth); } catch {}
          try { await AsyncStorage.multiRemove(["session", "token", "profile"]); } catch {}
          router.replace("/login");
        },
      },
    ]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatarCircle}>
          <Ionicons name="person-outline" size={38} color="#9B6B43" />
        </View>
        <View>
          <Text style={styles.userName}>John Doe</Text>
          <Text style={styles.subText}>View and edit profile</Text>
        </View>
      </View>

      <View style={styles.menuSection}>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.menuItem}
            activeOpacity={0.7}
            onPress={() => {
              const key = routeMap[item.label];
              if (key) go(key);
            }}
          >
            <View style={styles.menuLeft}>
              <Ionicons name={item.icon} size={22} color="#4A2E14" />
              <Text style={styles.menuLabel}>{item.label}</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#A88B73" />
          </TouchableOpacity>
        ))}

        <TouchableOpacity onPress={handleLogout} style={styles.menuItem} activeOpacity={0.7}>
          <View style={styles.menuLeft}>
            <Ionicons name="log-out-outline" size={22} color="#6B5B4F" />
            <Text style={styles.menuLabel}>Log out</Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color="#A88B73" />
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Software version V1.3.1(658)</Text>
      </View>
    </ScrollView>
  );
};

export default UserPage;
