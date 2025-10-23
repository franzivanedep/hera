import { useState } from "react";
import { View, Text, Switch, Pressable, Alert } from "react-native";
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
};

const Row = ({ left, right }: { left: React.ReactNode; right?: React.ReactNode }) => (
  <View style={{ paddingVertical: 14, paddingHorizontal: 14, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
    <View style={{ flex: 1, paddingRight: 12 }}>{left}</View>
    {right}
  </View>
);

const Card = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <View style={{ backgroundColor: UI.card, borderRadius: 14, borderWidth: 1, borderColor: UI.border, padding: 6 }}>
    <Text style={{ fontSize: 16, fontWeight: "800", color: UI.text, paddingHorizontal: 12, paddingTop: 10 }}>{title}</Text>
    <View style={{ height: 6 }} />
    {children}
  </View>
);

export default function SettingsPage() {
  const [push, setPush] = useState(true);
  const [email, setEmail] = useState(true);
  const [dark, setDark] = useState(false);
  const [analytics, setAnalytics] = useState(true);

  const onChangePassword = () => Alert.alert("Change Password", "Coming soon");
  const onEditProfile = () => Alert.alert("Edit Profile", "Coming soon");
  const onManageDevices = () => Alert.alert("Manage Devices", "Coming soon");
  const onClearCache = () => Alert.alert("Clear Cache", "Coming soon");
  const onSignOut = () => Alert.alert("Sign out", "You’ll be signed out of this device.", [{ text: "Cancel", style: "cancel" }, { text: "Sign out", style: "destructive" }]);
  const onLegal = () => Alert.alert("Legal", "Open Terms & Privacy in /user/legal");
  const onVersion = () => Alert.alert("Version", "Hera v0.1.0 (UI)");

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: UI.bg }}>
      <View style={{ padding: 16, gap: 12 }}>
        <View>
          <Text style={{ fontSize: 22, fontWeight: "800", color: UI.text }}>Settings</Text>
          <Text style={{ color: UI.sub, marginTop: 4 }}>Manage your account and preferences</Text>
        </View>

        <Card title="Account">
          <Row
            left={
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View style={{ width: 42, height: 42, borderRadius: 10, backgroundColor: UI.iconBg, alignItems: "center", justifyContent: "center", marginRight: 12 }}>
                  <Text>👤</Text>
                </View>
                <View>
                  <Text style={{ fontSize: 16, fontWeight: "700", color: UI.text }}>Your Profile</Text>
                  <Text style={{ color: UI.sub }}>Name, photo, details</Text>
                </View>
              </View>
            }
            right={
              <Pressable onPress={onEditProfile} style={{ paddingHorizontal: 12, paddingVertical: 8, borderRadius: 10, borderWidth: 1, borderColor: UI.border, backgroundColor: "#FFFFFF" }}>
                <Text style={{ color: UI.text, fontWeight: "800" }}>Edit</Text>
              </Pressable>
            }
          />
          <View style={{ height: 1, backgroundColor: UI.border }} />
          <Row
            left={
              <View>
                <Text style={{ fontSize: 16, fontWeight: "700", color: UI.text }}>Change Password</Text>
                <Text style={{ color: UI.sub, marginTop: 2 }}>Update your password</Text>
              </View>
            }
            right={
              <Pressable onPress={onChangePassword}>
                <Text style={{ color: UI.sub, fontWeight: "800" }}>›</Text>
              </Pressable>
            }
          />
          <View style={{ height: 1, backgroundColor: UI.border }} />
          <Row
            left={
              <View>
                <Text style={{ fontSize: 16, fontWeight: "700", color: UI.text }}>Manage Devices</Text>
                <Text style={{ color: UI.sub, marginTop: 2 }}>Signed-in sessions</Text>
              </View>
            }
            right={
              <Pressable onPress={onManageDevices}>
                <Text style={{ color: UI.sub, fontWeight: "800" }}>›</Text>
              </Pressable>
            }
          />
        </Card>

        <Card title="Notifications">
          <Row
            left={<Text style={{ fontSize: 16, fontWeight: "700", color: UI.text }}>Push Notifications</Text>}
            right={<Switch value={push} onValueChange={setPush} />}
          />
          <View style={{ height: 1, backgroundColor: UI.border }} />
          <Row
            left={<Text style={{ fontSize: 16, fontWeight: "700", color: UI.text }}>Email Updates</Text>}
            right={<Switch value={email} onValueChange={setEmail} />}
          />
        </Card>

        <Card title="Preferences">
          <Row
            left={<Text style={{ fontSize: 16, fontWeight: "700", color: UI.text }}>Dark Mode</Text>}
            right={<Switch value={dark} onValueChange={setDark} />}
          />
          <View style={{ height: 1, backgroundColor: UI.border }} />
          <Row
            left={<Text style={{ fontSize: 16, fontWeight: "700", color: UI.text }}>Share Anonymous Analytics</Text>}
            right={<Switch value={analytics} onValueChange={setAnalytics} />}
          />
          <View style={{ height: 1, backgroundColor: UI.border }} />
          <Row
            left={
              <View>
                <Text style={{ fontSize: 16, fontWeight: "700", color: UI.text }}>Clear Cache</Text>
                <Text style={{ color: UI.sub, marginTop: 2 }}>Free up space on this device</Text>
              </View>
            }
            right={
              <Pressable onPress={onClearCache}>
                <Text style={{ color: UI.sub, fontWeight: "800" }}>›</Text>
              </Pressable>
            }
          />
        </Card>

        <Card title="About">
          <Row
            left={
              <View>
                <Text style={{ fontSize: 16, fontWeight: "700", color: UI.text }}>Legal</Text>
                <Text style={{ color: UI.sub, marginTop: 2 }}>Terms & Privacy</Text>
              </View>
            }
            right={
              <Pressable onPress={onLegal}>
                <Text style={{ color: UI.sub, fontWeight: "800" }}>›</Text>
              </Pressable>
            }
          />
          <View style={{ height: 1, backgroundColor: UI.border }} />
          <Row
            left={
              <View>
                <Text style={{ fontSize: 16, fontWeight: "700", color: UI.text }}>Version</Text>
                <Text style={{ color: UI.sub, marginTop: 2 }}>Hera</Text>
              </View>
            }
            right={
              <Pressable onPress={onVersion}>
                <Text style={{ color: UI.sub, fontWeight: "800" }}>›</Text>
              </Pressable>
            }
          />
        </Card>

        <Pressable
          onPress={onSignOut}
          style={{ height: 48, borderRadius: 12, alignItems: "center", justifyContent: "center", backgroundColor: UI.btn }}
        >
          <Text style={{ color: UI.btnText, fontWeight: "800" }}>Sign out</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
