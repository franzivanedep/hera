import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Modal,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import useRewardDetailLogic from "../components/logics/useDetailLogic";
import styles from "../components/styles/RewardsDetailsPage";

const RewardDetail: React.FC = () => {
  const {
    title,
    imageUrl,
    description,
    points,
    userPoints,
    loadingModalVisible,
    voucherModalVisible,
    notEnoughModalVisible,
    setNotEnoughModalVisible,
    handleRedeem,
    handleViewVoucher,
    handleBackHome,
  } = useRewardDetailLogic();

 

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {imageUrl && (
          <Image source={{ uri: imageUrl }} style={styles.headerImage} resizeMode="cover" />
        )}

        <View style={styles.content}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.points}>{points} Points</Text>
          <Text style={styles.userPoints}>Your Points: {userPoints}</Text>
          <Text style={styles.description}>
            {description ||
              "Indulge in luxury with our premium beauty service, crafted to enhance your relaxation and style."}
          </Text>
        </View>
      </ScrollView>

      {/* Redeem Button */}
      <TouchableOpacity
        style={styles.redeemButton}
        onPress={handleRedeem}
        activeOpacity={0.8}
      >
        <Text style={styles.redeemText}>Redeem</Text>
      </TouchableOpacity>

      {/* Modals */}
      <Modal transparent visible={loadingModalVisible} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <ActivityIndicator size="large" color="#5A4634" />
            <Text style={styles.modalText}>Redeeming points...</Text>
          </View>
        </View>
      </Modal>

      <Modal transparent visible={voucherModalVisible} animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.voucherContent}>
            <View style={styles.iconContainer}>
              <Ionicons name="checkmark" size={48} color="#FFF" />
            </View>
            <Text style={styles.voucherTitle}>Yaay! Your E-Voucher is Ready!</Text>
            <Text style={styles.voucherSubtitle}>
              Flash this E-Voucher at the store to redeem your reward.
            </Text>

            <TouchableOpacity
              style={styles.voucherButton}
              onPress={handleViewVoucher}
              activeOpacity={0.8}
            >
              <Text style={styles.voucherButtonText}>View E-Voucher</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.voucherButton, { backgroundColor: "#C9B79C", marginTop: 10 }]}
              onPress={handleBackHome}
              activeOpacity={0.8}
            >
              <Text style={[styles.voucherButtonText, { color: "#5A4634" }]}>
                Back to Home
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal transparent visible={notEnoughModalVisible} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.voucherContent}>
            <View style={[styles.iconContainer, { backgroundColor: "#D9534F" }]}>
              <Ionicons name="close" size={48} color="#FFF" />
            </View>
            <Text style={styles.voucherTitle}>Not Enough Points</Text>
            <Text style={styles.voucherSubtitle}>
              You need {points - userPoints} more points to redeem this reward.
            </Text>

            <TouchableOpacity
              style={[styles.voucherButton, { backgroundColor: "#C9B79C" }]}
              onPress={() => setNotEnoughModalVisible(false)}
              activeOpacity={0.8}
            >
              <Text style={[styles.voucherButtonText, { color: "#5A4634" }]}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default RewardDetail;
