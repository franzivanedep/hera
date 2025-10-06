import React from 'react';
import { View, Text, Image } from 'react-native';
import styles from './styles/RedeemPageStyles';

const Header = () => (
  <View style={styles.header}>
    <View style={styles.profile}>
      <View style={styles.avatarPlaceholder} />
      <View>
        <Text style={styles.name}>John Doe</Text>
        <Text style={styles.subText}>HERA NAIL LOUNGE & SPA</Text>
      </View>
    </View>
    <View style={styles.logoCircle}>
      <Text style={styles.logoText}>H</Text>
    </View>
  </View>
);

const PointsCard = () => (
  <View style={styles.pointsCard}>
    {/* Overlay image */}
    <Image source={require('../assets/images/nail.png')} style={styles.iconOverlay} />

    <Text style={styles.pointsLabel}>Total Points</Text>
    <Text style={styles.pointsValue}>1,250 PTS</Text>
    <Text style={styles.lastTransaction}>Last Transaction: +20 PTS (Referral)</Text>
  </View>
);

const ServiceCard = () => (
  <View style={styles.serviceCard}>
    <View style={styles.serviceHeader}>
      <Text style={styles.serviceTitle}>Soft Gel Extension</Text>
      <View style={styles.pointsTag}>
        <Text style={styles.pointsTagText}>200 PTS</Text>
      </View>
    </View>
    <View style={styles.imagePlaceholder}>
      <Text style={styles.imagePlaceholderText}>[ Image Here ]</Text>
    </View>
  </View>
);

export default function RewardsPage() {
  return (
    <View style={styles.container}>
      <Header />
      <PointsCard />
      <ServiceCard />
    </View>
  );
}
