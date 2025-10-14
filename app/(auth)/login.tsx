import React from "react";
import { useRouter } from "expo-router";
import useLoginLogic from "../../components/logics/useLoginLogic";
import LoginView from "../../components/LoginView";

const LoginScreen: React.FC = () => {
  const router = useRouter();
  const logic = useLoginLogic();

  return <LoginView {...logic} onSignup={() => router.push("/(auth)/signup")} />;
};

export default LoginScreen;
