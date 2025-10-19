// app/(tabs)/user.tsx
import React from "react";
import { StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context"; 
import UserPage from "../../components/UserPage";

const User: React.FC = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFF8F2" }}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF8F2" />
      <UserPage />
    </SafeAreaView>
  );
};

export default User;
