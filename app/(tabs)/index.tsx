import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import RedeemPage from '../../components/RedeemPage';


export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF8F2" />
      <RedeemPage />
    </SafeAreaView>
  );
}
