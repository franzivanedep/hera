import { View, Text, Linking, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HelpPage() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFF8F2", padding: 16 }}>
      <Text style={{ color: "#4B3F35", fontSize: 18 }}>Need Help?</Text>
      <TouchableOpacity onPress={() => Linking.openURL("mailto:support@example.com")}>
        <Text style={{ color: "#7B6A59", marginTop: 8, textDecorationLine: "underline" }}>
          Contact Support
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
