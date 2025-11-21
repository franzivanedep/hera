import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useApiError } from "../context/ApiErrorProvider";

const ApiErrorBanner: React.FC = () => {
  const { error } = useApiError();

  if (!error) return null;

  return (
    <View style={styles.banner}>
      <Text style={styles.text}>{error}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  banner: {
    position: "absolute",
    top: 0,
    width: "100%",
    backgroundColor: "#e74c3c", // red for error
    paddingVertical: 10,
    alignItems: "center",
    zIndex: 999,
  },
  text: {
    color: "white",
    fontWeight: "bold",
  },
});

export default ApiErrorBanner;
