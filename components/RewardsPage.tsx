import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import styles from "../components/styles/RewardsPageStyles";
import useRewardsLogic from "../components/logics/useRewardLogic";

const RewardsPage: React.FC = () => {
  const router = useRouter();
  const { rewards, loading } = useRewardsLogic();

  if (loading) {
    return (
      <View
        style={[
          styles.container,
          { justifyContent: "center", alignItems: "center" },
        ]}
      >
        <ActivityIndicator size="large" color="#8B6F47" />
        <Text style={{ marginTop: 10 }}>Loading rewards...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header Image */}
        <View style={styles.headerCard}>
          <Image
            source={require("../assets/images/header.jpg")}
            style={styles.headerImage}
            resizeMode="cover"
          />
        </View>

        {/* Page Title */}
        <Text style={styles.pageTitle}>Rewards</Text>

        {/* Rewards List */}
        {rewards.map((reward) => (
          <TouchableOpacity
            key={reward.id}
            style={styles.card}
            activeOpacity={0.9}
            onPress={() =>
              router.push({
                pathname: "/details",
                params: {
                  title: String(reward.name),
                  image: String(reward.image_url),
                  points: String(reward.points),
                  description: String(reward.description),
                },
              })
            }
          >
            <Image source={{ uri: reward.image_url }} style={styles.cardImage} />
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>{reward.name}</Text>

              <View style={styles.pointsRow}>
                <Ionicons name="star" size={14} color="#8B6F47" />
                <Text style={styles.pointsText}>{reward.points} pts</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}

        {/* Footer Space */}
        <View style={styles.footerSpace} />
      </ScrollView>
    </View>
  );
};

export default RewardsPage;
