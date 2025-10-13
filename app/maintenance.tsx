import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function MaintenancePage() {
  const [retrying, setRetrying] = useState(false);

  const handleRetry = () => {
    setRetrying(true);
    setTimeout(() => {
      setRetrying(false);
      // You can navigate back to home or reload app here
    }, 1500);
  };

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

      <TouchableOpacity
        style={[styles.button, retrying && { opacity: 0.6 }]}
        onPress={handleRetry}
        disabled={retrying}
      >
        <Ionicons name="refresh-outline" size={20} color="#fff" />
        <Text style={styles.buttonText}>
          {retrying ? 'Checking...' : 'Try Again'}
        </Text>
      </TouchableOpacity>

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
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#9E7E63',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  footer: {
    position: 'absolute',
    bottom: 20,
    fontSize: 14,
    color: '#9E7E63',
  },
});
