// components/ReferralsPageView.tsx
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

type ReferralsPageViewProps = {
  referralCode: string;
  loading: boolean;
  onCopy: () => void;
};

export const ReferralsPageView: React.FC<ReferralsPageViewProps> = ({
  referralCode,
  loading,
  onCopy,
}) => {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.sparkleIcon}>
          <Ionicons name="sparkles-outline" size={24} color="#b48a64" />
        </View>

        <View style={styles.topRightButton}>
          <TouchableOpacity style={styles.myReferralsButton}>
            <Text style={styles.myReferralsText}>My Referrals</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.pointsSection}>
          <View style={styles.pointsBackground} />
          <Text style={styles.pointsValue}>50</Text>
          <View style={styles.pointsLabel}>
            <Text style={styles.pointsText}>Points</Text>
            <Ionicons name="heart" size={16} color="#d2a679" />
          </View>
        </View>

        <Text style={styles.inviteText}>
          Invite friends and earn up to{" "}
          <Text style={styles.highlight}>50 points</Text>
        </Text>

     

   
      </View>

      {/* Referral Code */}
      <View style={styles.codeCard}>
        <Text style={styles.codeLabel}>Your Referral Code</Text>
        <View style={styles.codeBox}>
          <Text style={styles.code}>
            {loading ? "Loading..." : referralCode}
          </Text>
          <TouchableOpacity
            style={styles.copyButton}
            onPress={onCopy}
            disabled={loading}
          >
            <Ionicons name="copy-outline" size={18} color="#8b5e3c" />
            <Text style={styles.copyText}>Copy</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Divider */}
      <View style={styles.divider}>
        <View style={styles.iconCircle}>
          <Ionicons name="cut-outline" size={20} color="#8b5e3c" />
        </View>
        <Text style={styles.dividerText}>
          Share your beauty, share your points!
        </Text>
      </View>



    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#faf6f1" },
  content: { alignItems: "center", padding: 20 },
  header: { width: "100%", alignItems: "center", marginTop: 30 },
  sparkleIcon: { position: "absolute", left: 20, top: 10 },
  topRightButton: { width: "100%", alignItems: "flex-end", marginBottom: 20 },
  myReferralsButton: {
    backgroundColor: "#ffffffb3",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#e5d7c5",
  },
  myReferralsText: { fontSize: 13, color: "#6b5b4b", fontWeight: "600" },
  pointsSection: { alignItems: "center", marginVertical: 10 },
  pointsBackground: {
    position: "absolute",
    width: 100,
    height: 100,
    backgroundColor: "#e3c9a8",
    borderRadius: 50,
    opacity: 0.3,
  },
  pointsValue: { fontSize: 64, fontWeight: "800", color: "#8b5e3c" },
  pointsLabel: { flexDirection: "row", alignItems: "center", marginTop: 4 },
  pointsText: { fontSize: 18, fontWeight: "600", color: "#8b5e3c", marginRight: 4 },
  inviteText: { fontSize: 16, color: "#5c4632", marginTop: 20, textAlign: "center", fontWeight: "600" },
  highlight: { color: "#8b5e3c", fontWeight: "700" },
  offerTimer: { flexDirection: "row", alignItems: "center", marginTop: 6 },
  offerText: { fontSize: 13, color: "#6b5b4b", marginLeft: 6 },
  timer: { color: "#8b5e3c", fontWeight: "600" },
  description: { fontSize: 13, color: "#6b5b4b", marginTop: 10, textAlign: "center", lineHeight: 18 },
  codeCard: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 16,
    marginTop: 25,
    borderWidth: 1,
    borderColor: "#f2e3d1",
    width: "100%",
  },
  codeLabel: { fontSize: 12, color: "#888", marginBottom: 6 },
  codeBox: {
    backgroundColor: "#f7f1ea",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  code: { fontFamily: "monospace", fontSize: 16, fontWeight: "600", color: "#8b5e3c" },
  copyButton: { flexDirection: "row", alignItems: "center" },
  copyText: { color: "#8b5e3c", marginLeft: 6, fontWeight: "500", fontSize: 13 },
  divider: { flexDirection: "row", alignItems: "center", marginTop: 35 },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#8b5e3c10",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },
  dividerText: { color: "#6b5b4b", fontSize: 13, fontWeight: "600" },
  shareRow: { flexDirection: "row", justifyContent: "space-around", width: "100%", marginTop: 20 },
  shareButtonWrapper: { alignItems: "center" },
  shareButton: {
    width: 48,
    height: 48,
    backgroundColor: "#8b5e3c",
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    elevation: 2,
  },
  shareLabel: { marginTop: 6, fontSize: 12, color: "#6b5b4b", fontWeight: "500" },
  footerText: {
    marginTop: 30,
    fontSize: 12,
    color: "#a08b75",
    textAlign: "center",
    marginBottom: 50,
    lineHeight: 18,
  },
});
