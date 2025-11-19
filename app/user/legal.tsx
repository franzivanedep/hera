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
      <View style={{ flex: 1, padding: 16, gap: 12 }}>

        {/* Header */}
        <View>
          <Text style={{ fontSize: 22, fontWeight: "800", color: UI.text }}>Legal</Text>
          <Text style={{ color: UI.sub, marginTop: 4 }}>Terms of Service and Privacy Policy</Text>
        </View>

        {/* Tabs */}
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

        {/* Content */}
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
                  By using this app you agree to these Terms. If you do not agree, please do not use the service.
                </Section>
                <Section title="2. Eligibility">
                  You must be of legal age in the Philippines to use this service.
                </Section>
                <Section title="3. Accounts">
                  You are responsible for maintaining the confidentiality of your account credentials.
                </Section>
                <Section title="4. User Data">
                  We only collect your Gmail for verification and a unique user ID. All data is stored securely on Firebase servers.
                </Section>
                <Section title="5. Acceptable Use">
                  Do not misuse, disrupt, or probe the service. Violations may result in suspension of your account.
                </Section>
                <Section title="6. Liability">
                  The service is provided {"\"as is\""} without warranties. Liability is limited to the fullest extent permitted by Philippine law.
                </Section>
                <Section title="7. Changes">
                  We may update these Terms. Continued use after updates indicates your acceptance.
                </Section>
                <Section title="8. Contact">
                  For questions, please email <Text style={{ fontWeight: "600" }}>heranailloungeandspa@yahoo.com</Text>.
                </Section>
              </>
            ) : (
              <>
                <Section title="Privacy Notice">
                  Last updated December 01, 2025
                </Section>
                <Section title="About">
                  {"This Privacy Notice for HERA Nail Lounge & Spa (\"we,\" \"us,\" or \"our\") describes how and why we might access, collect, store, use, and/or share your personal information when you use our services (\"Services\")."}
                </Section>
                <Section title="Use of Our Product">
                  Our app is a loyalty rewards app for Nail Lounge & Spa. It allows customers to earn points for services, redeem rewards, and receive exclusive promos or updates.
                </Section>
                <Section title="Information We Collect">
                  We collect the personal information you provide, such as email addresses and passwords. We also automatically collect device and usage data (IP address, device type, operating system, app usage) for analytics, security, and app functionality.
                </Section>
                <Section title="How We Process Your Information">
                  We use your information to manage accounts, deliver services, communicate with you, improve our Services, and protect against fraud and other risks.
                </Section>
                <Section title="Sharing of Personal Information">
                  We may share data with vendors, contractors, or service providers performing work on our behalf, but they cannot use it for other purposes or share it further. We may also share information during business transfers or acquisitions.
                </Section>
                <Section title="Cookies and Tracking">
                  We may use cookies or similar technologies to enhance security, fix bugs, save preferences, and improve user experience. Google Analytics may be used for Service usage tracking.
                </Section>
                <Section title="Data Retention">
                  We retain your information only as long as necessary to fulfill the purposes outlined above. When no longer needed, information is securely deleted or anonymized.
                </Section>
                <Section title="Security">
                  We implement technical and organizational measures to protect your information, but no system can be 100% secure. Use of our Services is at your own risk.
                </Section>
                <Section title="Privacy Rights">
                  You may review, update, or delete your account data. You can withdraw your consent to our processing where applicable. Some retention may be required for legal or security reasons.
                </Section>
                <Section title="Do-Not-Track">
                  Most browsers and mobile OSs include Do-Not-Track features. Currently, we do not respond to DNT signals.
                </Section>
                <Section title="Updates to This Notice">
                  We may update this notice periodically. Significant changes will be reflected with a revised date at the top.
                </Section>
                <Section title="Contact">
                  By post: HERA Nail Lounge & Spa, 234 Gen. Luna St., Concepcion, Malabon, Philippines, 1470{"\n"}
                  By email: <Text style={{ fontWeight: "600" }}>heranailloungeandspa@yahoo.com</Text>
                </Section>
                <Section title="Review, Update, or Delete Data">
                  You may request access, corrections, or deletion of your personal information by submitting a data subject access request.
                </Section>
              </>
            )}
            <View style={{ height: 8 }} />
            <Text style={{ color: UI.sub, textAlign: "center" }}>Last updated: December 01, 2025</Text>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
}
