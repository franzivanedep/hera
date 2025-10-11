import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { useRouter } from "expo-router";

export default function LoginScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require("../assets/images/models.png")}
        style={styles.background}
        imageStyle={{ opacity: 0.22 }}
      >
        <View style={styles.overlay}>
          <Text style={styles.brand}>HERA Nail Lounge & Spa</Text>
          <Text style={styles.welcome}>Welcome Back, Gorgeous</Text>

          <TextInput
            placeholder="Email"
            placeholderTextColor="#7D6B5A"
            style={styles.input}
          />
          <TextInput
            placeholder="Password"
            placeholderTextColor="#7D6B5A"
            secureTextEntry
            style={styles.input}
          />

          <TouchableOpacity style={styles.loginButton} onPress={() => router.push("/")}>
            <Text style={styles.loginText}>Log In</Text>
          </TouchableOpacity>

          <Text style={styles.orText}>or</Text>

          <TouchableOpacity style={styles.googleButton} onPress={() => router.push("/")}>
            <Text style={styles.googleText}>Continue with Google</Text>
          </TouchableOpacity>

          <Text style={styles.footerText}>
            By continuing, you agree to our <Text style={styles.link}>Terms</Text> &{" "}
            <Text style={styles.link}>Privacy Policy</Text>.
          </Text>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F1E4", // full beige background
  },
  background: {
    flex: 1,
    justifyContent: "center",
  },
  overlay: {
    paddingHorizontal: 30,
    justifyContent: "center",
  },
  brand: {
    fontSize: 30,
    fontWeight: "700",
    color: "#3C2E23", // deep brown
    textAlign: "center",
    marginBottom: 8,
    letterSpacing: 1,
  },
  welcome: {
    fontSize: 16,
    color: "#5A4634",
    textAlign: "center",
    marginBottom: 40,
  },
  input: {
    backgroundColor: "#F3EDE3",
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    color: "#3C2E23",
    fontSize: 16,
  },
  loginButton: {
    backgroundColor: "#5A4634",
    paddingVertical: 15,
    borderRadius: 12,
    marginTop: 10,
  },
  loginText: {
    color: "#FAF9F7",
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },
  orText: {
    textAlign: "center",
    color: "#7D6B5A",
    marginVertical: 15,
  },
  googleButton: {
    backgroundColor: "#E2D6C4",
    paddingVertical: 15,
    borderRadius: 12,
  },
  googleText: {
    color: "#3C2E23",
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
  },
  footerText: {
    textAlign: "center",
    color: "#7D6B5A",
    marginTop: 25,
    fontSize: 12,
  },
  link: {
    color: "#5A4634",
    fontWeight: "600",
  },
});
