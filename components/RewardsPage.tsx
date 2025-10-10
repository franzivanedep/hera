import React from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import styles from "./styles/RewardsPageStyles";

interface Reward {
  id: number;
  title: string;
  image: any;
  points: number;
  description: string;
}

const rewardsData: Reward[] = [
  {
    id: 1,
    title: "Soft Gel Extension",
    image: require("../assets/images/nail1.jpeg"),
    points: 200,
    description:
      "Our premium soft gel extension service ensures a natural, lightweight, and long-lasting nail enhancement perfect for everyday style.",
  },
  {
    id: 2,
    title: "Gel Manicure",
    image: require("../assets/images/nail1.jpeg"),
    points: 200,
    description:
      "A glossy, chip-free manicure with rich gel colors that last for weeks.",
  },
  {
    id: 3,
    title: "Eyelash Extension",
    image: require("../assets/images/nail1.jpeg"),
    points: 200,
    description:
      "Add volume and elegance with our gentle eyelash extensions designed for comfort and beauty.",
  },
];

const RewardsPage: React.FC = () => {
  const router = useRouter();

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <Image
          source={require("../assets/images/header.jpg")}
          style={styles.headerImage}
          resizeMode="cover"
        />
        <Text style={styles.headerTitle}>Rewards</Text>
      </View>

      {/* Rewards List */}
      {rewardsData.map((reward) => (
        <TouchableOpacity
          key={reward.id}
          style={styles.card}
          activeOpacity={0.9}
          onPress={() =>
            router.push({
              pathname: "/details",
              params: {
                title: reward.title,
                image: reward.image,
                points: reward.points.toString(),
                description: reward.description,
              },
            })
          }
        >
          <Image source={reward.image} style={styles.cardImage} />

          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>{reward.title}</Text>

            <View style={styles.pointsRow}>
              <Ionicons name="star" size={14} color="#5A4634" />
              <Text style={styles.pointsText}>{reward.points} pts</Text>
            </View>
          </View>
        </TouchableOpacity>
      ))}

      <View style={styles.footerSpace} />
    </ScrollView>
  );
};

export default RewardsPage;
