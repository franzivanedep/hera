import { View, Text, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
// app/user/transactions.tsx
import { useTransactions } from "../../components/logics/userData";

export default function TransactionsPage() {
  const { data } = useTransactions();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFF8F2" }}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ padding: 16, borderBottomWidth: 1, borderColor: "#EEE3D9" }}>
            <Text style={{ fontSize: 16, color: "#4B3F35" }}>{item.title}</Text>
            <Text style={{ color: "#7B6A59" }}>{item.subtitle}</Text>
          </View>
        )}
        ListEmptyComponent={
          <Text style={{ padding: 16, color: "#7B6A59" }}>No transactions found.</Text>
        }
      />
    </SafeAreaView>
  );
}
