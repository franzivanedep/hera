import { View, Text, FlatList, Pressable, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTransactions } from "../../components/logics/useTransactions";

const UI = {
  bg: "#FFF8F2",
  card: "#FFFFFF",
  border: "#EEE3D9",
  text: "#4B3F35",
  sub: "#7B6A59",
  iconBg: "#F6EDE5",
  chev: "#B49A86",
  accent: "#E0BDAE",
};

export default function TransactionsPage() {
  const { data, loading, error } = useTransactions();

  const renderItem = ({ item }: any) => (
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
        <Text>🧾</Text>
      </View>

      <View style={{ flex: 1, paddingRight: 10 }}>
        <Text style={{ fontSize: 16, fontWeight: "700", color: UI.text }}>
          {item.title}
        </Text>
        {!!item.subtitle && (
          <Text style={{ marginTop: 4, color: UI.sub }}>{item.subtitle}</Text>
        )}
      </View>

      <Text style={{ color: UI.chev, fontSize: 18 }}>›</Text>
    </Pressable>
  );

  const renderEmpty = () => (
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
      <Text style={{ color: UI.sub }}>No transactions found.</Text>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: UI.bg }}>
      {loading ? (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: UI.bg,
          }}
        >
          <ActivityIndicator size="large" color={UI.accent} />
          <Text style={{ marginTop: 12, color: UI.sub }}>Loading transactions...</Text>
        </View>
      ) : error ? (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: UI.bg,
            padding: 20,
          }}
        >
          <Text style={{ color: "red", fontSize: 16, textAlign: "center" }}>
            ⚠️ {error}
          </Text>
        </View>
      ) : (
        <FlatList
          data={data ?? []}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: 16, gap: 10 }}
          ListHeaderComponent={
            <View style={{ paddingBottom: 4 }}>
              <Text style={{ fontSize: 22, fontWeight: "800", color: UI.text }}>
                Transactions
              </Text>
              <Text style={{ color: UI.sub, marginTop: 4 }}>
                Purchases, redemptions, and activities
              </Text>
            </View>
          }
          renderItem={renderItem}
          ItemSeparatorComponent={() => <View style={{ height: 2 }} />}
          ListEmptyComponent={renderEmpty}
        />
      )}
    </SafeAreaView>
  );
}
