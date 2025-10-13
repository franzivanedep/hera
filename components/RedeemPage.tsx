import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import styles from './styles/RedeemPageStyles';

export default function RewardsPage() {
  const router = useRouter();

  // === Auto-changing promo images and text ===
  const promos = [
    {
      image: require('../assets/images/header.jpg'),
      title: '✨ October Promo ✨',
      subtitle: 'Get 20% OFF all manicure packages this week only!',
    },
    {
      image: require('../assets/images/nail1.jpeg'),
      title: '💅 Refer a Friend 💅',
      subtitle: 'Earn 100 bonus points when your friend books a session!',
    },
    {
      image: require('../assets/images/header.jpg'),
      title: '🌸 New Arrivals 🌸',
      subtitle: 'Discover our latest nail polish shades!',
    },
  ];

  const [currentPromo, setCurrentPromo] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPromo((prev) => (prev + 1) % promos.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  type RoutePath = '/referrals' | null;

  const actions: { icon: any; text: string; route: RoutePath }[] = [
    { icon: 'document-text-outline', text: 'Survey', route: null },
    { icon: 'qr-code-outline', text: 'Scan QR Code', route: null },
    { icon: 'people-outline', text: 'Invite Friends', route: '/referrals' },
  ];

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

      {/* ===== POINTS CARD ===== */}
      <View style={styles.pointsContainer}>
        <View style={styles.pointsCard}>
          <Text style={styles.pointsTitle}>Your Points</Text>
          <Text style={styles.pointsValue}>249,560</Text>
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

      {/* ===== SINGLE AUTO-CHANGING PROMO BANNER ===== */}
      <View style={styles.promoContainer}>
        <ImageBackground
          source={promos[currentPromo].image}
          style={styles.promoBanner}
          imageStyle={styles.promoImage}
        >
          <View style={styles.promoOverlay} />
          <View style={styles.promoContent}>
            <Text style={styles.promoTitle}>{promos[currentPromo].title}</Text>
            <Text style={styles.promoSubtitle}>
              {promos[currentPromo].subtitle}
            </Text>
          </View>
        </ImageBackground>
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
          {/* Reward 1 */}
          <ImageBackground
            source={require('../assets/images/nail1.jpeg')}
            style={styles.rewardCard}
            imageStyle={styles.rewardImage}
          >
            <View style={styles.overlay} />
            <View style={styles.rewardContent}>
              <Text style={styles.rewardTitlePrimary}>
                Luxury Manicure Session
              </Text>
              <View style={styles.pointsTag}>
                <Ionicons
                  name="star"
                  size={14}
                  color="#fff"
                  style={{ marginRight: 4 }}
                />
                <Text style={styles.rewardPointsPrimary}>500 pts</Text>
              </View>
            </View>
          </ImageBackground>

          {/* Reward 2 */}
          <View style={styles.rewardCardPlain}>
            <Ionicons
              name="sparkles-outline"
              size={26}
              color="#9E7E63"
              style={{ marginBottom: 10 }}
            />
            <Text style={styles.rewardTitle}>Spa Pedicure Package</Text>
            <View style={styles.pointsTagPlain}>
              <Text style={styles.rewardPoints}>300 pts</Text>
            </View>
          </View>

          {/* Reward 3 */}
          <View style={styles.rewardCardPlain}>
            <Ionicons
              name="color-palette-outline"
              size={26}
              color="#9E7E63"
              style={{ marginBottom: 10 }}
            />
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
