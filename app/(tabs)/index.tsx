import React from "react";
import { SafeAreaView, StatusBar } from "react-native";
import useRewardsPageLogic from "../../components/logics/useRedeemPage";
import RewardsPageView from "../../components/RedeemPage";

const RewardsPageController: React.FC = () => {
  const { userName, userPoints, promos, actions, currentPromo } =
    useRewardsPageLogic(); // ✅ include userPoints from hook

  return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#FFF8F2" }}>
        <StatusBar barStyle="dark-content" backgroundColor="#FFF8F2" />

        <RewardsPageView
          userName={userName}
          userPoints={userPoints} // ✅ Pass user points here
          promos={promos}
          actions={actions}
          currentPromo={currentPromo}
        />
      </SafeAreaView>
  );
};

export default RewardsPageController;
