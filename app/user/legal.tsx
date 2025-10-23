import { useState } from "react";
import { View, Text, Pressable, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const UI = {
  bg: "#FFF8F2",
  card: "#FFFFFF",
  border: "#EEE3D9",
  text: "#4B3F35",
  sub: "#7B6A59",
  tab: "#F6EDE5",
  tabActive: "#111827",
  tabInactive: "#E5E7EB",
  tabTextActive: "#FFFFFF",
  tabTextInactive: "#111827",
};

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <View style={{ marginBottom: 16 }}>
    <Text style={{ fontSize: 16, fontWeight: "800", color: UI.text }}>{title}</Text>
    <View style={{ height: 8 }} />
    <Text style={{ color: UI.sub, lineHeight: 22 }}>{children}</Text>
  </View>
);

export default function LegalPage() {
  const [tab, setTab] = useState<"terms" | "privacy">("terms");

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: UI.bg }}>
      <View style={{ padding: 16, gap: 12 }}>
        <View>
          <Text style={{ fontSize: 22, fontWeight: "800", color: UI.text }}>Legal</Text>
          <Text style={{ color: UI.sub, marginTop: 4 }}>Terms of Service and Privacy Policy</Text>
        </View>

        <View style={{ flexDirection: "row", gap: 8 }}>
          <Pressable
            onPress={() => setTab("terms")}
            style={{
              flex: 1,
              height: 44,
              borderRadius: 12,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: tab === "terms" ? UI.tabActive : UI.tabInactive,
              borderWidth: 1,
              borderColor: UI.border,
            }}
          >
            <Text style={{ color: tab === "terms" ? UI.tabTextActive : UI.tabTextInactive, fontWeight: "800" }}>
              Terms
            </Text>
          </Pressable>
          <Pressable
            onPress={() => setTab("privacy")}
            style={{
              flex: 1,
              height: 44,
              borderRadius: 12,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: tab === "privacy" ? UI.tabActive : UI.tabInactive,
              borderWidth: 1,
              borderColor: UI.border,
            }}
          >
            <Text style={{ color: tab === "privacy" ? UI.tabTextActive : UI.tabTextInactive, fontWeight: "800" }}>
              Privacy
            </Text>
          </Pressable>
        </View>

        <View
          style={{
            flex: 1,
            backgroundColor: UI.card,
            borderRadius: 14,
            borderWidth: 1,
            borderColor: UI.border,
            overflow: "hidden",
          }}
        >
          <ScrollView contentContainerStyle={{ padding: 16 }}>
            {tab === "terms" ? (
              <>
                <Section title="1. Acceptance of Terms">
                  By using this app you agree to these Terms. If you do not agree, do not use the service.
                </Section>
                <Section title="2. Eligibility">
                  You must be of legal age to use the service in your jurisdiction.
                </Section>
                <Section title="3. Accounts">
                  You are responsible for maintaining the confidentiality of your credentials and for all activities under your account.
                </Section>
                <Section title="4. Rewards and Vouchers">
                  Rewards, points, and vouchers have conditions and may expire. The app may modify or discontinue programs at any time.
                </Section>
                <Section title="5. Acceptable Use">
                  Do not misuse the service, probe, or disrupt systems. We may suspend access for violations.
                </Section>
                <Section title="6. Liability">
                  The service is provided “as is” without warranties. To the fullest extent permitted by law, liability is limited.
                </Section>
                <Section title="7. Changes">
                  We may update these Terms. Continued use after changes means you accept the updated Terms.
                </Section>
                <Section title="8. Contact">
                  For questions, see Help & Support or email support@example.com.
                </Section>
              </>
            ) : (
              <>
                <Section title="1. Information We Collect">
                  We collect account details you provide and app usage data necessary to operate features like transactions and redemptions.
                </Section>
                <Section title="2. How We Use Data">
                  To provide the service, improve features, prevent fraud, and communicate important updates.
                </Section>
                <Section title="3. Sharing">
                  We do not sell personal data. We may share with service providers under contract or when required by law.
                </Section>
                <Section title="4. Security">
                  We use reasonable safeguards to protect your data but no method is 100% secure.
                </Section>
                <Section title="5. Your Choices">
                  You can update info in Settings, control notifications, and request deletion subject to legal obligations.
                </Section>
                <Section title="6. Data Retention">
                  We retain data only as long as needed for the purposes stated or as required by law.
                </Section>
                <Section title="7. Children">
                  The service is not directed to children where prohibited by law.
                </Section>
                <Section title="8. Changes">
                  We may update this Policy. Material changes will be reflected here.
                </Section>
                <Section title="9. Contact">
                  For privacy requests, email support@example.com.
                </Section>
              </>
            )}
            <View style={{ height: 8 }} />
            <Text style={{ color: UI.sub, textAlign: "center" }}>Last updated: Oct 2025</Text>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
}
