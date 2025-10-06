import React from "react";
import { SafeAreaView, StatusBar } from "react-native";
import UserPage from "../../components/UserPage"; // adjust path based on your folder structure

const User: React.FC = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFF8F2" }}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF8F2" />
      <UserPage />
    </SafeAreaView>
  );
};

export default User;
