import React from "react";
import { SafeAreaView, StatusBar } from "react-native";
import RewardsPage from "../../components/RewardsPage";

const Rewards: React.FC = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFF8F2" }}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF8F2" />
      <RewardsPage />
    </SafeAreaView>
  );
};

export default Rewards;
