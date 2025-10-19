import { View, Text, Switch } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";

export default function SettingsPage() {
  const [notifications, setNotifications] = useState(true);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFF8F2", padding: 16 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingVertical: 12,
        }}
      >
        <Text style={{ color: "#4B3F35", fontSize: 16 }}>Push Notifications</Text>
        <Switch value={notifications} onValueChange={setNotifications} />
      </View>
    </SafeAreaView>
  );
}
