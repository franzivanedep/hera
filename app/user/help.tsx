import { useState } from "react";
import { View, Text, FlatList, Pressable, Linking, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const UI = {
  bg: "#FFF8F2",
  card: "#FFFFFF",
  border: "#EEE3D9",
  text: "#4B3F35",
  sub: "#7B6A59",
  iconBg: "#F6EDE5",
  btn: "#111827",
  btnText: "#FFFFFF",
  chev: "#B49A86",
};

type Faq = { id: string; q: string; a: string };

const FAQS: Faq[] = [
  { id: "1", q: "How do I redeem a voucher?", a: "Go to User → Redeem, enter the code, then tap Redeem." },
  { id: "2", q: "Where can I see my transactions?", a: "User → Transactions lists purchases, top-ups, and redemptions." },
  { id: "3", q: "Why are my points missing?", a: "Points may expire after inactivity. Check User → Expired for details." },
  { id: "4", q: "How do I contact support?", a: "Use the Contact card below to email or call us." },
];

export default function HelpPage() {
  const [open, setOpen] = useState<string | null>(null);
  const toggle = (id: string) => setOpen((p) => (p === id ? null : id));

  const email = "support@example.com";
  const tel = "+63-900-000-0000";

  const onEmail = () => Linking.openURL(`mailto:${email}?subject=Hera%20Support`);
  const onCall = () => Linking.openURL(`tel:${tel}`);
  const onReport = () => Alert.alert("Report an issue", "Coming soon");
  const onChat = () => Alert.alert("Live chat", "Coming soon");

  const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <View style={{ backgroundColor: UI.card, borderRadius: 14, borderWidth: 1, borderColor: UI.border, padding: 14 }}>
      <Text style={{ fontSize: 16, fontWeight: "800", color: UI.text }}>{title}</Text>
      <View style={{ height: 10 }} />
      {children}
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: UI.bg }}>
      <FlatList
        data={FAQS}
        keyExtractor={(i) => i.id}
        contentContainerStyle={{ padding: 16, gap: 12 }}
        ListHeaderComponent={
          <View style={{ paddingBottom: 4 }}>
            <Text style={{ fontSize: 22, fontWeight: "800", color: UI.text }}>Help & Support</Text>
            <Text style={{ color: UI.sub, marginTop: 4 }}>FAQs, guides, and ways to reach us</Text>
          </View>
        }
        renderItem={({ item }) => (
          <View style={{ backgroundColor: UI.card, borderRadius: 14, borderWidth: 1, borderColor: UI.border }}>
            <Pressable
              onPress={() => toggle(item.id)}
              style={{ paddingVertical: 14, paddingHorizontal: 14, flexDirection: "row", alignItems: "center" }}
            >
              <View style={{ width: 42, height: 42, borderRadius: 10, backgroundColor: UI.iconBg, alignItems: "center", justifyContent: "center", marginRight: 12 }}>
                <Text>❓</Text>
              </View>
              <Text style={{ flex: 1, fontSize: 16, fontWeight: "700", color: UI.text }}>{item.q}</Text>
              <Text style={{ color: UI.chev, fontSize: 18 }}>{open === item.id ? "˄" : "˅"}</Text>
            </Pressable>
            {open === item.id && (
              <View style={{ borderTopWidth: 1, borderTopColor: UI.border, padding: 14 }}>
                <Text style={{ color: UI.sub, lineHeight: 20 }}>{item.a}</Text>
              </View>
            )}
          </View>
        )}
        ListFooterComponent={
          <View style={{ gap: 12 }}>
            <Section title="Contact">
              <View style={{ flexDirection: "row", gap: 10 }}>
                <Pressable onPress={onEmail} style={{ flex: 1, height: 44, borderRadius: 10, alignItems: "center", justifyContent: "center", backgroundColor: UI.btn }}>
                  <Text style={{ color: UI.btnText, fontWeight: "800" }}>Email Support</Text>
                </Pressable>
                <Pressable onPress={onCall} style={{ flex: 1, height: 44, borderRadius: 10, borderWidth: 1, borderColor: UI.border, alignItems: "center", justifyContent: "center", backgroundColor: "#FFFFFF" }}>
                  <Text style={{ color: UI.text, fontWeight: "800" }}>Call</Text>
                </Pressable>
              </View>
              <Text style={{ color: UI.sub, marginTop: 10 }}>{email} • {tel}</Text>
            </Section>

            <Section title="Troubleshooting">
              <View style={{ gap: 8 }}>
                <Text style={{ color: UI.text, fontWeight: "700" }}>App looks stale</Text>
                <Text style={{ color: UI.sub }}>Pull down to refresh on most lists.</Text>
                <Text style={{ color: UI.text, fontWeight: "700", marginTop: 8 }}>Voucher won’t redeem</Text>
                <Text style={{ color: UI.sub }}>Check code spelling, remove spaces, and verify expiry.</Text>
                <Text style={{ color: UI.text, fontWeight: "700", marginTop: 8 }}>Missing points</Text>
                <Text style={{ color: UI.sub }}>Points may expire after inactivity. See User → Expired.</Text>
              </View>
            </Section>

            <Section title="More">
              <View style={{ flexDirection: "row", gap: 10 }}>
                <Pressable onPress={onReport} style={{ flex: 1, height: 44, borderRadius: 10, borderWidth: 1, borderColor: UI.border, alignItems: "center", justifyContent: "center", backgroundColor: "#FFFFFF" }}>
                  <Text style={{ color: UI.text, fontWeight: "800" }}>Report an Issue</Text>
                </Pressable>
                <Pressable onPress={onChat} style={{ flex: 1, height: 44, borderRadius: 10, alignItems: "center", justifyContent: "center", backgroundColor: "#F6EDE5" }}>
                  <Text style={{ color: UI.text, fontWeight: "800" }}>Live Chat (soon)</Text>
                </Pressable>
              </View>
              <View style={{ height: 10 }} />
              <View style={{ flexDirection: "row", gap: 10 }}>
                <Pressable style={{ flex: 1, height: 44, borderRadius: 10, borderWidth: 1, borderColor: UI.border, alignItems: "center", justifyContent: "center", backgroundColor: "#FFFFFF" }}>
                  <Text style={{ color: UI.text, fontWeight: "800" }}>Terms</Text>
                </Pressable>
                <Pressable style={{ flex: 1, height: 44, borderRadius: 10, borderWidth: 1, borderColor: UI.border, alignItems: "center", justifyContent: "center", backgroundColor: "#FFFFFF" }}>
                  <Text style={{ color: UI.text, fontWeight: "800" }}>Privacy</Text>
                </Pressable>
              </View>
            </Section>
          </View>
        }
      />
    </SafeAreaView>
  );
}
