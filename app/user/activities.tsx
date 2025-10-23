import { View, Text, FlatList, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useActivities } from "../../components/logics/userData";

const UI = {
  bg: "#FFF8F2",
  card: "#FFFFFF",
  border: "#EEE3D9",
  text: "#4B3F35",
  sub: "#7B6A59",
  iconBg: "#F6EDE5",
  chev: "#B49A86",
};

export default function ActivitiesPage() {
  const { data } = useActivities(); // [{ id, action, when }]

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: UI.bg }}>
      <FlatList
        data={data ?? []}
        keyExtractor={(i) => i.id}
        contentContainerStyle={{ padding: 16, gap: 10 }}
        ListHeaderComponent={
          <View style={{ paddingBottom: 4 }}>
            <Text style={{ fontSize: 22, fontWeight: "800", color: UI.text }}>
              Other Activities
            </Text>
            <Text style={{ color: UI.sub, marginTop: 4 }}>
              Sign-ins, profile updates, and more
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <Pressable
            style={{
              backgroundColor: UI.card,
              borderRadius: 14,
              paddingVertical: 14,
              paddingHorizontal: 14,
              borderWidth: 1,
              borderColor: UI.border,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <View
              style={{
                width: 42,
                height: 42,
                borderRadius: 10,
                backgroundColor: UI.iconBg,
                alignItems: "center",
                justifyContent: "center",
                marginRight: 12,
              }}
            >
              <Text>⭐</Text>
            </View>

            <View style={{ flex: 1, paddingRight: 10 }}>
              <Text style={{ fontSize: 16, fontWeight: "700", color: UI.text }}>
                {item.action}
              </Text>
              <Text style={{ marginTop: 4, color: UI.sub }}>{item.when}</Text>
            </View>

            <Text style={{ color: UI.chev, fontSize: 18 }}>›</Text>
          </Pressable>
        )}
        ItemSeparatorComponent={() => <View style={{ height: 2 }} />}
        ListEmptyComponent={
          <View
            style={{
              marginTop: 24,
              backgroundColor: UI.card,
              borderRadius: 12,
              borderWidth: 1,
              borderColor: UI.border,
              padding: 16,
              alignItems: "center",
            }}
          >
            <Text style={{ color: UI.sub }}>No activities yet.</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}
