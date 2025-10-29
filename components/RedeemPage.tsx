import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
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
};

const RewardsPageView: React.FC<RewardsPageViewProps> = ({
  userName,
  userPoints,
  promos,
  actions,
  currentPromo,
}) => {
  const router = useRouter();

  return (
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

      {/* ===== PROMO BANNER (NOW SHOWS STATIC GIFT CONTENT) ===== */}
      <View style={styles.promoContainer}>
        <ImageBackground
          source={require("../assets/images/nail1.jpeg")}
          style={styles.promoBanner}
          imageStyle={styles.promoImage}
        >
          <View style={styles.promoOverlay} />
          <View style={styles.promoContent}>
            <Text style={styles.promoTitle}>Luxury Manicure Session</Text>
            <Text style={styles.promoSubtitle}>Redeem for 500 pts</Text>
          </View>
        </ImageBackground>
      </View>

      {/* ===== PERIOD’S GIFT SECTION (NOW SHOWS PROMO CONTENT) ===== */}
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
  );
};

export default RewardsPageView;
