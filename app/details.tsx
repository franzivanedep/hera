import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Modal,
  ActivityIndicator,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router"; // ✅ useRouter imported here
import { Ionicons } from "@expo/vector-icons";
import styles from "../components/styles/RewardsDetailsPage";

const RewardDetail: React.FC = () => {
  const { title, image, description, points } = useLocalSearchParams();
  const router = useRouter(); // ✅ Initialize the router hook
  const [loadingModalVisible, setLoadingModalVisible] = useState(false);
  const [voucherModalVisible, setVoucherModalVisible] = useState(false);

  const handleRedeem = () => {
    setLoadingModalVisible(true);

    // simulate redeem process
    setTimeout(() => {
      setLoadingModalVisible(false);
      setVoucherModalVisible(true);
    }, 2000);
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Image source={image as any} style={styles.headerImage} />
        <View style={styles.content}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.points}>{points} Points</Text>
          <Text style={styles.description}>
            {description ||
              "Indulge in luxury with our premium nail and beauty service, crafted to enhance your relaxation and style."}
          </Text>
        </View>
      </ScrollView>

      {/* Redeem Button */}
      <TouchableOpacity style={styles.redeemButton} onPress={handleRedeem}>
        <Text style={styles.redeemText}>Redeem</Text>
      </TouchableOpacity>

      {/* Loading Modal */}
      <Modal transparent visible={loadingModalVisible} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <ActivityIndicator size="large" color="#5A4634" />
            <Text style={styles.modalText}>Redeeming points...</Text>
          </View>
        </View>
      </Modal>

      {/* Reward Ready Modal */}
      <Modal transparent visible={voucherModalVisible} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.voucherContent}>
            <View style={styles.iconContainer}>
              <Ionicons name="checkmark" size={48} color="#FFF" />
            </View>
            <Text style={styles.voucherTitle}>Yaay! Your E-Voucher is Ready!</Text>
            <Text style={styles.voucherSubtitle}>
              Time to treat yourself! Flash this E-Voucher at the store and redeem your reward.
            </Text>

            <TouchableOpacity
              style={styles.voucherButton}
              onPress={() => {
                setVoucherModalVisible(false);
                router.push("/voucher"); // ✅ router is now defined
              }}
            >
              <Text style={styles.voucherButtonText}>View E-Voucher</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default RewardDetail;
  