// views/SignUpView.tsx
import React from "react";
import {
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Router } from "expo-router";
import { SignUpLogic } from "../components/logics/useSignUpLogic";

interface SignUpViewProps extends SignUpLogic {
  router: Router;
}

export default function SignUpView({
  email,
  setEmail,
  pw,
  setPw,
  code,
  setCode,
  sent,
  busy,
  err,
  cooldown,
  sendCount,
  MAX_SENDS,
  sendCode,
  verifyAndSignUp,
  router,
}: SignUpViewProps) {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        padding: 24,
        backgroundColor: "#F8F1E4",
      }}
    >
      <Text
        style={{
          fontSize: 28,
          fontWeight: "700",
          textAlign: "center",
          color: "#3C2E23",
          marginBottom: 20,
        }}
      >
        {sent ? "Verify your email" : "Create your HERA account"}
      </Text>

      {!sent ? (
        <>
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            style={{
              backgroundColor: "#F3EDE3",
              padding: 15,
              borderRadius: 12,
              marginBottom: 12,
            }}
          />
          <TextInput
            placeholder="Password"
            secureTextEntry
            value={pw}
            onChangeText={setPw}
            style={{
              backgroundColor: "#F3EDE3",
              padding: 15,
              borderRadius: 12,
            }}
          />
          <TouchableOpacity
            onPress={sendCode}
            disabled={busy || cooldown > 0}
            style={{
              backgroundColor: busy || cooldown > 0 ? "#A19B93" : "#5A4634",
              padding: 15,
              borderRadius: 12,
              alignItems: "center",
              marginTop: 10,
            }}
          >
            {busy ? (
              <ActivityIndicator color="#FAF9F7" />
            ) : (
              <Text style={{ color: "#FAF9F7", fontWeight: "700" }}>
                {cooldown > 0
                  ? `Resend in ${cooldown}s`
                  : "Send Verification Code"}
              </Text>
            )}
          </TouchableOpacity>

          <Text
            style={{
              textAlign: "center",
              marginTop: 8,
              color: "#6A5C50",
              fontSize: 13,
            }}
          >
            {`Attempts left: ${MAX_SENDS - sendCount}`}
          </Text>

          <Text
            style={{
              textAlign: "center",
              fontSize: 12,
              color: "#6A5C50",
              marginTop: 10,
            }}
          >
            By signing up, you agree to our Terms & Privacy Policy. We only
            collect your Gmail for account verification and do not store any
            other personal information.
          </Text>
        </>
      ) : (
        <>
          <TextInput
            placeholder="Enter code"
            keyboardType="numeric"
            value={code}
            onChangeText={setCode}
            style={{
              backgroundColor: "#F3EDE3",
              padding: 15,
              borderRadius: 12,
              marginBottom: 12,
            }}
          />
          <TouchableOpacity
            onPress={() => verifyAndSignUp(router)}
            disabled={busy}
            style={{
              backgroundColor: "#5A4634",
              padding: 15,
              borderRadius: 12,
              alignItems: "center",
            }}
          >
            {busy ? (
              <ActivityIndicator color="#FAF9F7" />
            ) : (
              <Text style={{ color: "#FAF9F7", fontWeight: "700" }}>
                Verify & Sign Up
              </Text>
            )}
          </TouchableOpacity>
        </>
      )}

      {err && (
        <Text
          style={{ color: "#b3261e", textAlign: "center", marginTop: 10 }}
        >
          {err}
        </Text>
      )}
    </SafeAreaView>
  );
}
