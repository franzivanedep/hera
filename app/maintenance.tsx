import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function MaintenancePage() {
  return (
    <View style={styles.container}>
      <Ionicons name="construct-outline" size={100} color="#9E7E63" style={styles.icon} />
      <Text style={styles.title}>We’re Polishing Things Up!</Text>
      <Text style={styles.subtitle}>
        Our app is currently under maintenance.{"\n"}We’ll be back shortly looking even better!
      </Text>

      <Image
        source={require('../assets/images/nail1.jpeg')}
        style={styles.image}
        resizeMode="cover"
      />

      <Text style={styles.footer}>HERA Nail Lounge & Spa 💅</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F1E4',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  icon: {
    marginBottom: 20,
  },
  title: {
    fontSize: 26,
    color: '#6B4E3D',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#8B6F5A',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 22,
  },
  image: {
    width: 180,
    height: 180,
    borderRadius: 20,
    marginBottom: 30,
  },
  footer: {
    position: 'absolute',
    bottom: 20,
    fontSize: 14,
    color: '#9E7E63',
  },
});
