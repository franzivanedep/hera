import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ExpiredPointsPage() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFF8F2", padding: 16 }}>
      <Text style={{ color: "#4B3F35", fontSize: 18 }}>Expired Points</Text>
      <Text style={{ color: "#7B6A59", marginTop: 8 }}>No expired points.</Text>
    </SafeAreaView>
  );
}
