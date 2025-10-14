import React from "react";
import { SafeAreaView, StatusBar } from "react-native";
import useRewardsPageLogic from "../../components/logics/useRedeemPage";
import RewardsPageView from "../../components/RedeemPage";

const RewardsPageController: React.FC = () => {
  const { userName, promos, actions, currentPromo } = useRewardsPageLogic();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF8F2" />
      <RewardsPageView
        userName={userName}
        promos={promos}
        actions={actions}
        currentPromo={currentPromo}
      />
    </SafeAreaView>
  );
};

export default RewardsPageController;
