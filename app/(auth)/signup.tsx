// controllers/SignUpController.tsx
import React from "react";
import { useRouter } from "expo-router";
import { useSignUpLogic } from "../../components/logics/useSignUpLogic";
import SignUpView from "../../components/SignUpView";

export default function SignUpController() {
  const router = useRouter();
  const BASE_URL = process.env.EXPO_PUBLIC_API_URL ?? "";
  const logic = useSignUpLogic(BASE_URL);

  return <SignUpView {...logic} router={router} />;
}
