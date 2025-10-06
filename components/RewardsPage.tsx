import React from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "./styles/RewardsPageStyles";

interface Reward {
  id: number;
  title: string;
  image: any;
  points: number;
}

const rewardsData: Reward[] = [
  {
    id: 1,
    title: "Soft Gel Extension",
    image: require("../assets/images/nail1.jpeg"),
    points: 200,
  },
  {
    id: 2,
    title: "Gel Manicure",
    image: require("../assets/images/nail1.jpeg"),
    points: 200,
  },
  {
    id: 3,
    title: "Eyelash Extension",
    image: require("../assets/images/nail1.jpeg"),
    points: 200,
  },
];

const RewardsPage: React.FC = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.headerTitle}>Rewards</Text>

      {rewardsData.map((reward) => (
        <TouchableOpacity
          key={reward.id}
          style={styles.card}
          activeOpacity={0.85}
        >
          <Image source={reward.image} style={styles.cardImage} />

          <View style={styles.cardFooter}>
            <Text style={styles.cardTitle}>{reward.title}</Text>

            <View style={styles.pointsTag}>
              <Ionicons
                name="star"
                size={14}
                color="#FFF"
                style={{ marginRight: 4 }}
              />
              <Text style={styles.pointsText}>{reward.points} PTS</Text>
            </View>
          </View>
        </TouchableOpacity>
      ))}

      <View style={styles.footerSpace} />
    </ScrollView>
  );
};

export default RewardsPage;
