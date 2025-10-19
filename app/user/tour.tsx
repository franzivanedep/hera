import { View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TourPage() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFF8F2", padding: 16 }}>
      <Text style={{ color: "#4B3F35", fontSize: 18 }}>App Tour</Text>
      <Text style={{ color: "#7B6A59", marginTop: 8 }}>
        Take a quick tour to explore the app features.
      </Text>
      <TouchableOpacity
        style={{
          backgroundColor: "#4B3F35",
          padding: 14,
          borderRadius: 14,
          alignItems: "center",
          marginTop: 16,
        }}
      >
        <Text style={{ color: "#FFF8F2" }}>Start Tour</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
