import React, { useState } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  View,
  Modal,
  ScrollView,
  Pressable,
} from "react-native";
import { Router } from "expo-router";
import { SignUpLogic } from "../components/logics/useSignUpLogic";
import { SafeAreaView } from "react-native-safe-area-context";

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
  agreed,
  setAgreed,
  router,
}: SignUpViewProps) {
  const [showPolicy, setShowPolicy] = useState(false);

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
            autoCapitalize="none"
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

          {/* AGREEMENT */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "flex-start",
              marginTop: 14,
            }}
          >
            <Pressable
              onPress={() => setAgreed(!agreed)}
              style={{
                width: 22,
                height: 22,
                borderRadius: 6,
                borderWidth: 2,
                borderColor: "#5A4634",
                alignItems: "center",
                justifyContent: "center",
                marginRight: 10,
                marginTop: 3,
                backgroundColor: agreed ? "#5A4634" : "transparent",
              }}
            >
              {agreed && (
                <Text style={{ color: "#FAF9F7", fontSize: 14 }}>✓</Text>
              )}
            </Pressable>

            <Text style={{ flex: 1, fontSize: 13, color: "#6A5C50" }}>
              I have read and agree to the{" "}
              <Text
                style={{ fontWeight: "600", color: "#5A4634" }}
                onPress={() => setShowPolicy(true)}
              >
                Privacy Policy and Terms of Service
              </Text>
              . If you do not agree, you may not use this app.
            </Text>
          </View>

          <TouchableOpacity
            onPress={sendCode}
            disabled={busy || cooldown > 0 || !agreed}
            style={{
              backgroundColor:
                busy || cooldown > 0 || !agreed ? "#A19B93" : "#5A4634",
              padding: 15,
              borderRadius: 12,
              alignItems: "center",
              marginTop: 16,
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
        <Text style={{ color: "#b3261e", textAlign: "center", marginTop: 10 }}>
          {err}
        </Text>
      )}

      {/* PRIVACY POLICY MODAL */}
      <Modal visible={showPolicy} animationType="slide">
        <SafeAreaView style={{ flex: 1, padding: 20 }}>
          <Text
            style={{
              fontSize: 22,
              fontWeight: "700",
              textAlign: "center",
              marginBottom: 10,
            }}
          >
            Privacy Policy
          </Text>

          <ScrollView>
            <Text style={{ lineHeight: 20 }}>
              {
                "This Privacy Notice for HERA Nail Lounge & Spa (\"we,\" \"us,\" or \"our\") explains how and why we collect, use, and protect your personal information.\n\n"
              }
              We collect email addresses and passwords for account creation and
              authentication. Device and usage data may be collected for
              analytics, security, and app functionality.
              {"\n\n"}
              Your data is not sold. Information is retained only as long as
              necessary and protected using reasonable safeguards.
              {"\n\n"}
              Contact: heranailloungeandspa@yahoo.com
            </Text>
          </ScrollView>

          <TouchableOpacity
            onPress={() => {
              setAgreed(true);
              setShowPolicy(false);
            }}
            style={{
              backgroundColor: "#5A4634",
              padding: 15,
              borderRadius: 12,
              alignItems: "center",
              marginTop: 12,
            }}
          >
            <Text style={{ color: "#FAF9F7", fontWeight: "700" }}>
              Agree
            </Text>
          </TouchableOpacity>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}
