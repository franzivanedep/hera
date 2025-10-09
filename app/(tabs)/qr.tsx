import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import QRCode from 'react-native-qrcode-svg';

// Elegant beige-themed QR generator with static payload "john doe"
const QRGeneratorTab: React.FC = () => {
  const [generating, setGenerating] = React.useState<boolean>(true);
  const [key, setKey] = React.useState<number>(0);

  const payload = 'john doe';

  const generateQR = () => {
    setGenerating(true);
    setTimeout(() => {
      setKey(k => k + 1);
      setGenerating(false);
    }, 400);
  };

  useFocusEffect(
    React.useCallback(() => {
      generateQR();
    }, [])
  );

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        {/* Header Section */}
        <View style={styles.header}>
          <Text style={styles.title}>Your QR Code</Text>
          <Text style={styles.subtitle}>User: {payload}</Text>
        </View>

        {/* QR Display Card */}
        <View style={styles.qrCard}>
          {generating ? (
            <View style={styles.loaderWrap}>
              <ActivityIndicator size="large" color="#5A4634" />
              <Text style={styles.generatingText}>Generating QR...</Text>
            </View>
          ) : (
            <QRCode value={payload} size={220} key={key} color="#5A4634" />
          )}
        </View>

        {/* Info & Button */}
        <View style={styles.infoBox}>
          <Text style={styles.infoText}>
            This QR represents your username. Share it for quick scanning.
          </Text>

          <TouchableOpacity style={styles.button} onPress={generateQR}>
            <Text style={styles.buttonText}>Regenerate QR</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default QRGeneratorTab;

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#F8F1E4', // beige background
  },
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
  },

  // Header
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#5A4634', // deep brown
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 16,
    color: '#8A7A63',
  },

  // QR Card
  qrCard: {
    width: 280,
    height: 280,
    borderRadius: 24,
    backgroundColor: '#FFF8EE', // soft ivory
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#5A4634',
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 5,
    marginBottom: 40,
  },
  loaderWrap: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  generatingText: {
    marginTop: 10,
    color: '#8A7A63',
  },

  // Info
  infoBox: {
    alignItems: 'center',
    paddingHorizontal: 25,
  },
  infoText: {
    color: '#5A4634',
    textAlign: 'center',
    marginBottom: 20,
    fontSize: 14.5,
    lineHeight: 22,
  },

  // Button
  button: {
    backgroundColor: '#5A4634',
    paddingVertical: 14,
    paddingHorizontal: 35,
    borderRadius: 14,
    shadowColor: '#5A4634',
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 3,
  },
  buttonText: {
    color: '#F8F1E4',
    fontWeight: '600',
    fontSize: 15,
  },
});