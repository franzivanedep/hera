import { useState } from "react";
import { View, Text, TextInput, Pressable, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Clipboard from "expo-clipboard"; // optional; remove if not using
import { redeemVoucher } from "../../components/logics/userData";

const UI = {
  bg: "#FFF8F2",
  card: "#FFFFFF",
  border: "#EEE3D9",
  text: "#4B3F35",
  sub: "#7B6A59",
  accent: "#8B5E3C",
  btn: "#111827",
  btnText: "#FFFFFF",
  successBg: "#ECFDF5",
  successText: "#065F46",
  errorBg: "#FEF2F2",
  errorText: "#991B1B",
};

export default function RedeemPage() {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [notice, setNotice] = useState<{ kind: "ok" | "err"; msg: string } | null>(null);

  const onPaste = async () => {
    try {
      const txt = await Clipboard.getStringAsync();
      if (txt) setCode(txt.trim());
    } catch {}
  };

  const onRedeem = async () => {
    setNotice(null);
    const trimmed = code.trim();
    if (!trimmed) {
      setNotice({ kind: "err", msg: "Enter a voucher code." });
      return;
    }
    setLoading(true);
    try {
      const res = await redeemVoucher(trimmed); // uses your mock
      if (res.ok) {
        setNotice({ kind: "ok", msg: res.message || "Voucher redeemed!" });
        setCode("");
      } else {
        setNotice({ kind: "err", msg: res.message || "Unable to redeem voucher." });
      }
    } catch (e) {
      setNotice({ kind: "err", msg: "Something went wrong. Try again." });
    } finally {
      setLoading(false);
    }
  };

  const disabled = loading || code.trim().length === 0;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: UI.bg }}>
      <View style={{ padding: 16, gap: 16 }}>
        <View>
          <Text style={{ fontSize: 22, fontWeight: "800", color: UI.text }}>Redeem a Voucher</Text>
          <Text style={{ color: UI.sub, marginTop: 6 }}>
            Enter your code below to convert it into points or rewards.
          </Text>
        </View>

        {notice && (
          <View
            style={{
              backgroundColor: notice.kind === "ok" ? UI.successBg : UI.errorBg,
              borderRadius: 12,
              padding: 12,
              borderWidth: 1,
              borderColor: UI.border,
            }}
          >
            <Text
              style={{
                color: notice.kind === "ok" ? UI.successText : UI.errorText,
                fontWeight: "700",
              }}
            >
              {notice.kind === "ok" ? "Success" : "Oops"}
            </Text>
            <Text
              style={{
                marginTop: 4,
                color: notice.kind === "ok" ? UI.successText : UI.errorText,
              }}
            >
              {notice.msg}
            </Text>
          </View>
        )}

        {/* input card */}
        <View
          style={{
            backgroundColor: UI.card,
            borderRadius: 14,
            borderWidth: 1,
            borderColor: UI.border,
            padding: 14,
            gap: 10,
          }}
        >
          <Text style={{ color: UI.text, fontWeight: "700" }}>Voucher code</Text>
          <TextInput
            value={code}
            onChangeText={(t) => setCode(t.replace(/\s/g, ""))}
            placeholder="e.g. GIFT2025"
            placeholderTextColor="#9CA3AF"
            autoCapitalize="characters"
            autoCorrect={false}
            style={{
              height: 48,
              borderWidth: 1,
              borderColor: UI.border,
              borderRadius: 10,
              paddingHorizontal: 12,
              fontSize: 16,
              color: UI.text,
              backgroundColor: "#FFFCF9",
            }}
          />
          <View style={{ flexDirection: "row", gap: 10 }}>
            <Pressable
              onPress={onPaste}
              style={{
                flex: 1,
                height: 44,
                borderRadius: 10,
                borderWidth: 1,
                borderColor: UI.border,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#F6EDE5",
              }}
            >
              <Text style={{ color: UI.accent, fontWeight: "700" }}>Paste</Text>
            </Pressable>

            <Pressable
              disabled={disabled}
              onPress={onRedeem}
              style={{
                flex: 2,
                height: 44,
                borderRadius: 10,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: disabled ? "#B49A86" : UI.btn,
              }}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={{ color: UI.btnText, fontWeight: "800" }}>Redeem</Text>
              )}
            </Pressable>
          </View>
        </View>

        {/* tips */}
        <View
          style={{
            backgroundColor: UI.card,
            borderRadius: 12,
            borderWidth: 1,
            borderColor: UI.border,
            padding: 12,
          }}
        >
          <Text style={{ color: UI.text, fontWeight: "700" }}>Tips</Text>
          <Text style={{ color: UI.sub, marginTop: 6 }}>
            Codes are case-insensitive and have no spaces. Make sure the code hasn’t expired.
          </Text>
        </View>

        {/* stubbed “scanner” CTA for later */}
        <Pressable
          // onPress={() => router.push("/scan")} // add later
          style={{
            marginTop: 4,
            height: 44,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: UI.border,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#FFFFFF",
          }}
        >
          <Text style={{ color: UI.text, fontWeight: "700" }}>Scan QR (coming soon)</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

