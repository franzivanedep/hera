import React from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import styles from "./styles/RewardsDetailsPage";

const RewardDetail: React.FC = () => {
  const { title, image, description, points } = useLocalSearchParams();
  const router = useRouter();

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Image source={image as any} style={styles.headerImage} />
        <View style={styles.content}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.points}>{points} Points</Text>
          <Text style={styles.description}>{description}</Text>
        </View>
      </ScrollView>

      <TouchableOpacity
        style={styles.redeemButton}
        onPress={() => alert("Reward Redeemed!")}
      >
        <Text style={styles.redeemText}>Redeem Reward</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RewardDetail;
