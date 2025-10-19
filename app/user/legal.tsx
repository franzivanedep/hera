import { ScrollView, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LegalPage() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFF8F2" }}>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <Text style={{ color: "#4B3F35", fontSize: 18, marginBottom: 8 }}>Legal</Text>
        <Text style={{ color: "#7B6A59", lineHeight: 22 }}>
          By using this app, you agree to our Terms and Privacy Policy.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}
