import { View, Text, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useExpiredPoints } from "../../components/logics/userData";

const UI = {
  bg: "#FFF8F2",
  card: "#FFFFFF",
  border: "#EEE3D9",
  text: "#4B3F35",
  sub: "#7B6A59",
  iconBg: "#F6EDE5",
};

export default function ExpiredPointsPage() {
  const { data } = useExpiredPoints(); // [{ id, amount, date }]

  const total = (data ?? []).reduce((s, x) => s + (x.amount || 0), 0);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: UI.bg }}>
      <FlatList
        data={data ?? []}
        keyExtractor={(i) => i.id}
        contentContainerStyle={{ padding: 16, gap: 10 }}
        ListHeaderComponent={
          <View style={{ paddingBottom: 8 }}>
            <Text style={{ fontSize: 22, fontWeight: "800", color: UI.text }}>
              Expired Points
            </Text>
            <Text style={{ color: UI.sub, marginTop: 4 }}>
              Points that lapsed and are no longer usable
            </Text>

            {/* summary card */}
            <View
              style={{
                marginTop: 12,
                backgroundColor: UI.card,
                borderRadius: 14,
                borderWidth: 1,
                borderColor: UI.border,
                padding: 14,
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
                <Text>⚠️</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 16, fontWeight: "700", color: UI.text }}>
                  Total expired
                </Text>
                <Text style={{ marginTop: 2, color: UI.sub }}>
                  Sum of all expired points
                </Text>
              </View>
              <Text style={{ fontSize: 20, fontWeight: "800", color: "#B45309" }}>
                {total} pts
              </Text>
            </View>
          </View>
        }
        renderItem={({ item }) => (
          <View
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
              <Text>⏳</Text>
            </View>

            <View style={{ flex: 1, paddingRight: 10 }}>
              <Text style={{ fontSize: 16, fontWeight: "700", color: UI.text }}>
                {item.amount} pts expired
              </Text>
              <Text style={{ marginTop: 4, color: UI.sub }}>{item.date}</Text>
            </View>
          </View>
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
            <Text style={{ color: UI.sub }}>No expired points. 🎉</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}
