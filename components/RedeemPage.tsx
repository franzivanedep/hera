import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './styles/RedeemPageStyles';

export default function RewardsPage() {
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
     <ImageBackground
  source={require('../assets/images/nail1.jpeg')}
  style={styles.header}
  imageStyle={styles.headerImage}
>
  <View style={styles.headerOverlay} />
  <View style={styles.headerContent}>
    <View>
      <Text style={styles.greeting}>Hi, John Doe</Text>
      <Text style={styles.subText}>HERA NAIL LOUNGE & SPA</Text>
    </View>
    <TouchableOpacity style={styles.bellButton}>
      <Ionicons name="notifications-outline" size={24} color="#fff" />
    </TouchableOpacity>
  </View>
</ImageBackground>

      {/* Points Card */}
      <View style={styles.pointsCard}>
        <View style={styles.pointsTop}>
          <Text style={styles.pointsLabel}>Your Points</Text>
          <TouchableOpacity>
            <Ionicons name="qr-code-outline" size={20} color="#5A4634" />
          </TouchableOpacity>
        </View>
        <Text style={styles.pointsValue}>1,250</Text>
        <TouchableOpacity style={styles.detailButton}>
          <Text style={styles.detailButtonText}>DETAIL POINT</Text>
        </TouchableOpacity>
      </View>

      {/* Rewards Section */}
      <View style={styles.section}>
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
  {/* Reward 1 - Featured with background image */}
  <ImageBackground
    source={require('../assets/images/nail1.jpeg')}
    style={styles.rewardCard}
    imageStyle={styles.rewardImage}
  >
    <View style={styles.overlay} />
    <View style={styles.rewardContent}>
      <Text style={styles.rewardTitlePrimary}>Luxury Manicure Session</Text>
      <View style={styles.pointsTag}>
        <Ionicons name="star" size={14} color="#fff" style={{ marginRight: 4 }} />
        <Text style={styles.rewardPointsPrimary}>500 pts</Text>
      </View>
    </View>
  </ImageBackground>

  {/* Reward 2 */}
  <View style={styles.rewardCardPlain}>
    <Ionicons name="sparkles-outline" size={26} color="#9E7E63" style={{ marginBottom: 10 }} />
    <Text style={styles.rewardTitle}>Spa Pedicure Package</Text>
    <View style={styles.pointsTagPlain}>
      <Text style={styles.rewardPoints}>300 pts</Text>
    </View>
  </View>

  {/* Reward 3 */}
  <View style={styles.rewardCardPlain}>
    <Ionicons name="color-palette-outline" size={26} color="#9E7E63" style={{ marginBottom: 10 }} />
    <Text style={styles.rewardTitle}>Gel Polish Add-On</Text>
    <View style={styles.pointsTagPlain}>
      <Text style={styles.rewardPoints}>150 pts</Text>
    </View>
  </View>
</ScrollView>
      </View>
    </ScrollView>
  );
}
