import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "./styles/UserPageStyles";

interface MenuItem {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
}

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

  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <View style={styles.avatarCircle}>
          <Ionicons name="person-outline" size={38} color="#9B6B43" />
        </View>
        <View>
          <Text style={styles.userName}>John Doe</Text>
          <Text style={styles.subText}>View and edit profile</Text>
        </View>
      </View>

      {/* Menu Section */}
      <View style={styles.menuSection}>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.menuItem}
            activeOpacity={0.7}
          >
            <View style={styles.menuLeft}>
              <Ionicons name={item.icon} size={22} color="#4A2E14" />
              <Text style={styles.menuLabel}>{item.label}</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#A88B73" />
          </TouchableOpacity>
        ))}
      </View>

      {/* Footer Section */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Software version V1.3.1(658)</Text>
      </View>
    </ScrollView>
  );
};

export default UserPage;
