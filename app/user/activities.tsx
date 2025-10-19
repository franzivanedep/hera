import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ActivitiesPage() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFF8F2", padding: 16 }}>
      <Text style={{ color: "#4B3F35", fontSize: 18 }}>Other Activities</Text>
      <Text style={{ color: "#7B6A59", marginTop: 8 }}>No activity recorded yet.</Text>
    </SafeAreaView>
  );
}
