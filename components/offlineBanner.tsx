import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { NetworkContext } from "../context/NetworkProvider";

const OfflineBanner: React.FC = () => {
  const { isOnline } = useContext(NetworkContext);
  const insets = useSafeAreaInsets();

  if (isOnline) return null;

  return (
    <View style={[styles.banner, { paddingTop: insets.top }]}>
      <Text style={styles.text}>No Internet Connection</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  banner: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "red",
    paddingVertical: 8,
    alignItems: "center",
    zIndex: 9999,
    elevation: 9999, // Android support
  },
  text: {
    color: "white",
    fontWeight: "bold",
  },
});

export default OfflineBanner;
