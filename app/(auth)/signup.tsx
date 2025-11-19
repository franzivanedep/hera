// controllers/SignUpController.tsx
import React from "react";
import { useRouter } from "expo-router";
import { useSignUpLogic } from "../../components/logics/useSignUpLogic";
import SignUpView from "../../components/SignUpView";

export default function SignUpController() {
  const router = useRouter();
  const logic = useSignUpLogic(); // ✅ no arguments needed

  return <SignUpView {...logic} router={router} />;
}
