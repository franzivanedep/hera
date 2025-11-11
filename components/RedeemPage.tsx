import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  Modal,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import styles from "../components/styles/RedeemPageStyles";
import { Promo, ActionItem } from "../components/logics/useRedeemPage";

type RewardsPageViewProps = {
  userName: string;
  userPoints: number;
  promos: Promo[];
  actions: ActionItem[];
  currentPromo: number;
  showReferralModal: boolean;
  setShowReferralModal: (val: boolean) => void;
  handleReferralReward: (referredBy: string) => Promise<void>; // 👈 add this

};

const RewardsPageView: React.FC<RewardsPageViewProps> = ({
  userName,
  userPoints,
  promos,
  actions,
  currentPromo,
  showReferralModal,
  setShowReferralModal,
  handleReferralReward,
}) => {
  const router = useRouter();
  const [referralCode, setReferralCode] = useState("");

const handleReferralSubmit = async () => {
  if (!referralCode.trim()) {
    alert("Please enter a referral code.");
    return;
  }

  console.log("Submitting referral code:", referralCode);

  await handleReferralReward(referralCode.trim());
  setReferralCode("");
  setShowReferralModal(false);


  router.push("/user/tour");
};

  return (
    <>
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 80,
          flexGrow: 1,
        }}
      >
        {/* ===== HEADER ===== */}
        <ImageBackground
          source={require("../assets/images/nail1.jpeg")}
          style={styles.header}
          imageStyle={styles.headerImage}
        >
          <View style={styles.headerOverlay} />
          <View style={styles.headerContent}>
            <View>
              <Text style={styles.greeting}>Hi, {userName}</Text>
              <Text style={styles.subText}>HERA NAIL LOUNGE & SPA</Text>
            </View>
            <TouchableOpacity style={styles.bellButton}>
              <Ionicons name="notifications-outline" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
        </ImageBackground>

        {/* ===== POINTS CARD ===== */}
        <View style={styles.pointsContainer}>
          <View style={styles.pointsCard}>
            <Text style={styles.pointsTitle}>Your Points</Text>
            <Text style={styles.pointsValue}>
              {userPoints ? `${userPoints.toLocaleString()} pts` : "0 pts"}
            </Text>
          </View>
        </View>

        {/* ===== ACTION GRID ===== */}
        <View style={styles.actionContainer}>
          <View style={styles.actionGrid}>
            {actions.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.actionButton}
                onPress={() => {
                  if (item.route) router.push(item.route);
                }}
              >
                <View style={styles.iconWrapper}>
                  <Ionicons name={item.icon as any} size={28} color="#9E7E63" />
                </View>
                <Text style={styles.actionText}>{item.text}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

       

        {/* ===== PERIOD’S GIFT SECTION ===== */}
        <View style={[styles.section, { marginBottom: 40 }]}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>This Period’s Gift</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>SEE ALL</Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingRight: 20 }}
          >
            {promos.length > 0 ? (
              promos.map((promo, index) => (
                <ImageBackground
                  key={index}
                  source={promo.image}
                  style={styles.rewardCard}
                  imageStyle={styles.rewardImage}
                >
                  <View style={styles.overlay} />
                  <View style={styles.rewardContent}>
                    <Text style={styles.rewardTitlePrimary}>{promo.title}</Text>
                    <Text style={styles.rewardPointsPrimary}>
                      {promo.subtitle}
                    </Text>
                  </View>
                </ImageBackground>
              ))
            ) : (
              <Text style={{ color: "#888", padding: 20 }}>
                No promos available
              </Text>
            )}
          </ScrollView>
        </View>
      </ScrollView>

      {/* ===== REFERRAL MODAL ===== */}
      <Modal
        visible={showReferralModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowReferralModal(false)}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        >
          <View
            style={{
              backgroundColor: "#fff",
              borderRadius: 12,
              padding: 20,
              width: "85%",
              position: "relative",
            }}
          >
            {/* ❌ Close button */}
            <TouchableOpacity
            onPress={() => {
              setShowReferralModal(false);
              router.push("/user/tour"); // 👈 Navigate when modal is closed
            }}
            style={{
              position: "absolute",
              right: 10,
              top: 10,
              padding: 5,
            }}
          >
            <Ionicons name="close" size={22} color="#333" />
          </TouchableOpacity>


            <Text
              style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}
            >
              Enter Referral Code
            </Text>
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: "#ccc",
                borderRadius: 8,
                padding: 10,
                marginBottom: 15,
              }}
              placeholder="Enter referral code"
              value={referralCode}
              onChangeText={setReferralCode}
            />
            <TouchableOpacity
              style={{
                backgroundColor: "#9E7E63",
                padding: 12,
                borderRadius: 8,
                alignItems: "center",
              }}
              onPress={handleReferralSubmit}
            >
              <Text style={{ color: "#fff", fontWeight: "bold" }}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default RewardsPageView;
