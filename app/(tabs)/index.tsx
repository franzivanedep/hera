import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar  } from "react-native";
import useRewardsPageLogic from "../../components/logics/useRedeemPage";
import RewardsPageView from "../../components/RedeemPage";

const RewardsPageController: React.FC = () => {
  const {
    userName,
    userPoints,
    promos,
    actions,
    currentPromo,
    showReferralModal,
    setShowReferralModal,
    handleReferralReward, // 👈 ADD THIS

  } = useRewardsPageLogic(); // ✅ Include both modal state props

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFF8F2" }}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF8F2" />

      <RewardsPageView
        userName={userName}
        userPoints={userPoints}
        promos={promos}
        actions={actions}
        currentPromo={currentPromo}
        showReferralModal={showReferralModal}
        setShowReferralModal={setShowReferralModal}
        handleReferralReward={handleReferralReward} // 👈 pass it down

      />
    </SafeAreaView>
  );
};

export default RewardsPageController;
