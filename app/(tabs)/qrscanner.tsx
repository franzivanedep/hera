import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
} from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';

const { height } = Dimensions.get('window');

export default function QrScanner() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scannedData, setScannedData] = useState<string | null>(null);
  const [manualCode, setManualCode] = useState<string>('');

  if (!permission) {
    return (
      <View style={styles.centerScreen}>
        <Text style={styles.loadingText}>Requesting camera permission...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.permissionContainer}>
        <Text style={styles.permissionTitle}>Camera Access Needed</Text>
        <Text style={styles.permissionDesc}>
          We need access to your camera to scan QR codes.
        </Text>
        <TouchableOpacity style={styles.permissionButton} onPress={requestPermission}>
          <Text style={styles.permissionButtonText}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const handleBarCodeScanned = ({ data }: { data: string }) => {
    setScannedData(data);
  };

  const handleManualSubmit = () => {
    if (manualCode.trim().length === 0) return;
    setScannedData(manualCode.trim());
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{ flex: 1 }}
    >
      <View style={styles.container}>
        <CameraView
          onBarcodeScanned={scannedData ? undefined : handleBarCodeScanned}
          barcodeScannerSettings={{
            barcodeTypes: ['qr'],
          }}
          style={styles.camera}
        />

        {/* Overlay text */}
        <View style={styles.overlay}>
          <Text style={styles.overlayText}>
            {scannedData ? `Scanned: ${scannedData}` : 'Scan a QR code'}
          </Text>
          {scannedData && (
            <TouchableOpacity
              style={[styles.button, { marginTop: 10 }]}
              onPress={() => setScannedData(null)}
            >
              <Text style={styles.buttonText}>Scan Again</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Manual input section */}
        <View style={styles.manualContainer}>
          <Text style={styles.manualTitle}>Or Input QR Code</Text>
          <Text style={styles.manualDesc}>
            You can enter the QR code manually if an error occurs while scanning
          </Text>

          <Text style={styles.label}>QR Code</Text>
          <View style={styles.inputRow}>
            <TextInput
              placeholder="Input here"
              placeholderTextColor="#aaa"
              value={manualCode}
              onChangeText={setManualCode}
              style={styles.input}
            />
            <TouchableOpacity style={styles.submitButton} onPress={handleManualSubmit}>
              <Text style={styles.submitText}>SUBMIT</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  camera: { flex: 1 },
  overlay: {
    position: 'absolute',
    top: 60,
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
    padding: 12,
    borderRadius: 12,
  },
  overlayText: { color: '#fff', fontSize: 16, fontWeight: '500' },
  button: {
    backgroundColor: '#5a4634',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  buttonText: { color: '#fff', fontWeight: '600' },

  /** Manual input (raised higher) **/
  manualContainer: {
    backgroundColor: '#fff',
    padding: 22,
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    position: 'absolute',
    bottom: height * 0.15, // raised higher (about 15% above bottom)
    left: 0,
    right: 0,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 10,
  },
  manualTitle: { fontSize: 16, fontWeight: '700', color: '#333', marginBottom: 6 },
  manualDesc: { fontSize: 13, color: '#777', marginBottom: 16 },
  label: { fontSize: 14, fontWeight: '600', marginBottom: 6, color: '#333' },
  inputRow: { flexDirection: 'row', alignItems: 'center' },
  input: {
    flex: 1,
    height: 45,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 15,
    marginRight: 10,
    color: '#000',
  },
  submitButton: {
    backgroundColor: '#f59e0b',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 8,
  },
  submitText: { color: '#fff', fontWeight: '700', fontSize: 14 },

  /** Permission screen (modern) **/
  permissionContainer: {
    flex: 1,
    backgroundColor: '#faf7f2',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  permissionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#5a4634',
    marginBottom: 10,
  },
  permissionDesc: {
    fontSize: 15,
    color: '#776d5c',
    textAlign: 'center',
    marginBottom: 20,
  },
  permissionButton: {
    backgroundColor: '#5a4634',
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 30,
    shadowColor: '#5a4634',
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 6,
  },
  permissionButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 15,
    letterSpacing: 0.5,
  },

  /** Loading state **/
  centerScreen: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  loadingText: { color: '#333', fontSize: 16 },
});
