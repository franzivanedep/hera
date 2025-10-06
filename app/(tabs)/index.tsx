import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import RewardsPage from '../../components/RewardsPage';

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF8F2" />
      <RewardsPage />
    </SafeAreaView>
  );
}
