import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView} from "react-native-safe-area-context";

import { styles } from "../components/styles/LoginStyles";

interface LoginViewProps {
  email: string;
  setEmail: (value: string) => void;
  password: string;
  setPassword: (value: string) => void;
  pwVisible: boolean;
  setPwVisible: (value: boolean) => void;
  err: string | null;
  canSubmit: boolean;
  busy: boolean;
  handleLogin: () => void;
  handleForgotPassword: () => void;
  promptAsync: () => void;
  request: any;
  onSignup: () => void;
}

const LoginView: React.FC<LoginViewProps> = ({
  email,
  setEmail,
  password,
  setPassword,
  pwVisible,
  setPwVisible,
  err,
  canSubmit,
  busy,
  handleLogin,
  handleForgotPassword,
  promptAsync,
  request,
  onSignup,
}) => {
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require("../assets/images/models.png")}
        style={styles.background}
        imageStyle={{ opacity: 0.22 }}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          style={{ flex: 1, justifyContent: "center" }}
        >
          <View style={styles.overlay}>
            <Text style={styles.brand}>HERA Nail Lounge & Spa</Text>
            <Text style={styles.welcome}>Welcome Back, Gorgeous</Text>

            <TextInput
              placeholder="Email"
              placeholderTextColor="#7D6B5A"
              style={styles.input}
              autoCapitalize="none"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
              returnKeyType="next"
            />

            <View style={{ position: "relative" }}>
              <TextInput
                placeholder="Password"
                placeholderTextColor="#7D6B5A"
                secureTextEntry={!pwVisible}
                style={[styles.input, { paddingRight: 70 }]}
                value={password}
                onChangeText={setPassword}
                onSubmitEditing={handleLogin}
                returnKeyType="done"
              />
              <TouchableOpacity
                onPress={() => setPwVisible(!pwVisible)}
                style={styles.eye}
              >
                <Text style={{ color: "#5A4634", fontWeight: "600" }}>
                  {pwVisible ? "Hide" : "Show"}
                </Text>
              </TouchableOpacity>
            </View>

            {err && <Text style={styles.errorText}>{err}</Text>}

            <TouchableOpacity
              style={[styles.loginButton, { opacity: canSubmit ? 1 : 0.7 }]}
              onPress={handleLogin}
              disabled={!canSubmit}
            >
              {busy ? (
                <ActivityIndicator color="#FAF9F7" />
              ) : (
                <Text style={styles.loginText}>Log In</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity onPress={handleForgotPassword}>
              <Text style={styles.forgot}>Forgot password?</Text>
            </TouchableOpacity>

            <Text style={styles.orText}>or</Text>

          <TouchableOpacity
  style={styles.googleButton}
  onPress={async () => {
    console.log("Button pressed, calling promptAsync...");
    const result = await promptAsync();
    console.log("promptAsync result:", result);
  }}
  disabled={!request || busy}
>
  <Text style={styles.googleText}>Continue with Google</Text>
</TouchableOpacity>


            <Text style={styles.signupRow}>
              Don’t have an account?{" "}
              <Text onPress={onSignup} style={styles.link}>
                Sign up
              </Text>
            </Text>

            <Text style={styles.footerText}>
              By continuing, you agree to our <Text style={styles.link}>Terms</Text> &{" "}
              <Text style={styles.link}>Privacy Policy</Text>.
            </Text>
          </View>
        </KeyboardAvoidingView>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default LoginView;
