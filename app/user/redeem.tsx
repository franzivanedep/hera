import { useState } from "react";
import { View, TextInput, TouchableOpacity, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RedeemPage() {
  const [code, setCode] = useState("");

  const handleRedeem = () => {
    if (!code.trim()) return alert("Enter a valid voucher code.");
    alert(`Voucher ${code} redeemed!`);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFF8F2", padding: 16 }}>
      <Text style={{ color: "#4B3F35", fontSize: 18, fontWeight: "500", marginBottom: 12 }}>
        Redeem a Voucher
      </Text>
      <TextInput
        placeholder="Enter voucher code"
        placeholderTextColor="#A88B73"
        value={code}
        onChangeText={setCode}
        style={{
          borderWidth: 1,
          borderColor: "#EEE3D9",
          borderRadius: 12,
          backgroundColor: "#fff",
          padding: 12,
          marginBottom: 12,
        }}
      />
      <TouchableOpacity
        onPress={handleRedeem}
        style={{
          backgroundColor: "#4B3F35",
          borderRadius: 12,
          padding: 14,
          alignItems: "center",
        }}
      >
        <Text style={{ color: "#FFF8F2", fontWeight: "600" }}>Redeem</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
