import React, { useState } from "react";
import { View, Text, Pressable, Alert, Modal, TextInput, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { auth, db } from "@/lib/firebase";
import { updatePassword, reauthenticateWithCredential, EmailAuthProvider, deleteUser } from "firebase/auth";
import { doc, deleteDoc } from "firebase/firestore";

const UI = {
  bg: "#FFF8F2",
  card: "#FFFFFF",
  border: "#EEE3D9",
  text: "#4B3F35",
  sub: "#7B6A59",
  btn: "#111827",
  btnText: "#FFFFFF",
  danger: "#DC2626",
};

const Row = ({ left, right, onPress }: { left: React.ReactNode; right?: React.ReactNode; onPress?: () => void }) => (
  <Pressable
    onPress={onPress}
    style={({ pressed }) => [{ paddingVertical: 16, paddingHorizontal: 16, flexDirection: "row", alignItems: "center", justifyContent: "space-between", opacity: pressed ? 0.7 : 1 }]}
  >
    <View style={{ flex: 1, paddingRight: 12 }}>{left}</View>
    {right}
  </Pressable>
);

const Card = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <View style={{ backgroundColor: UI.card, borderRadius: 16, borderWidth: 1, borderColor: UI.border, paddingVertical: 10, paddingHorizontal: 12, marginBottom: 20, shadowColor: "#000", shadowOpacity: 0.05, shadowRadius: 8, elevation: 2 }}>
    <Text style={{ fontSize: 20, fontWeight: "800", color: UI.text, marginBottom: 12 }}>{title}</Text>
    <View style={{ borderTopWidth: 1, borderTopColor: UI.border }} />
    {children}
  </View>
);

export default function SettingsPage() {
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletePassword, setDeletePassword] = useState("");

  /** --- CHANGE PASSWORD --- */
  const handleChangePassword = async () => {
    if (!auth.currentUser) return;
    try {
      const credential = EmailAuthProvider.credential(auth.currentUser.email!, currentPassword);
      await reauthenticateWithCredential(auth.currentUser, credential);
      await updatePassword(auth.currentUser, newPassword);
      Alert.alert("Success", "Password updated successfully.");
      setShowPasswordModal(false);
      setCurrentPassword("");
      setNewPassword("");
    } catch (err: any) {
      Alert.alert("Error", err.message || "Failed to update password.");
    }
  };

  /** --- DELETE ACCOUNT --- */
  const handleDeleteAccount = async () => {
    if (!auth.currentUser) return;
    try {
      const credential = EmailAuthProvider.credential(auth.currentUser.email!, deletePassword);
      await reauthenticateWithCredential(auth.currentUser, credential);

      await deleteDoc(doc(db, "users", auth.currentUser.uid));
      await deleteUser(auth.currentUser);

      Alert.alert("Account Deleted", "Your account has been successfully deleted.");
      setShowDeleteModal(false);
      setDeletePassword("");
    } catch (err: any) {
      Alert.alert("Error", err.message || "Failed to delete account.");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: UI.bg, padding: 20 }}>
      <Text style={{ fontSize: 26, fontWeight: "900", color: UI.text, marginBottom: 20 }}>Settings</Text>

      <Card title="Security">
        <Row
          left={<Text style={{ fontWeight: "700", color: UI.text }}>Change Password</Text>}
          onPress={() => setShowPasswordModal(true)}
          right={<Text style={{ color: UI.sub, fontWeight: "800" }}>›</Text>}
        />
        <View style={{ height: 1, backgroundColor: UI.border }} />
        <Row
          left={<Text style={{ fontWeight: "700", color: UI.danger }}>Delete Account</Text>}
          onPress={() => setShowDeleteModal(true)}
          right={<Text style={{ color: UI.danger, fontWeight: "800" }}>›</Text>}
        />
      </Card>

      {/* CHANGE PASSWORD MODAL */}
      <Modal visible={showPasswordModal} transparent animationType="fade">
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Change Password</Text>
            <TextInput placeholder="Current Password" secureTextEntry value={currentPassword} onChangeText={setCurrentPassword} style={styles.input} />
            <TextInput placeholder="New Password" secureTextEntry value={newPassword} onChangeText={setNewPassword} style={styles.input} />
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 16 }}>
              <Pressable onPress={() => setShowPasswordModal(false)} style={[styles.modalBtn, { backgroundColor: "#F3F3F3" }]}>
                <Text style={{ color: "#333", fontWeight: "700" }}>Cancel</Text>
              </Pressable>
              <Pressable onPress={handleChangePassword} style={[styles.modalBtn, { backgroundColor: UI.btn }]}>
                <Text style={{ color: UI.btnText, fontWeight: "700" }}>Update</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      {/* DELETE ACCOUNT MODAL */}
      <Modal visible={showDeleteModal} transparent animationType="fade">
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Delete Account</Text>
            <Text style={{ marginBottom: 8 }}>Enter your password to confirm:</Text>
            <TextInput placeholder="Password" secureTextEntry value={deletePassword} onChangeText={setDeletePassword} style={styles.input} />
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 16 }}>
              <Pressable onPress={() => setShowDeleteModal(false)} style={[styles.modalBtn, { backgroundColor: "#F3F3F3" }]}>
                <Text style={{ color: "#333", fontWeight: "700" }}>Cancel</Text>
              </Pressable>
              <Pressable onPress={handleDeleteAccount} style={[styles.modalBtn, { backgroundColor: UI.danger }]}>
                <Text style={{ color: "#fff", fontWeight: "700" }}>Delete</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  modalBackground: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#00000099" },
  modalContent: { width: "90%", padding: 24, borderRadius: 16, backgroundColor: "#fff" },
  modalTitle: { fontSize: 20, fontWeight: "800", marginBottom: 16 },
  input: { borderWidth: 1, borderColor: "#ccc", borderRadius: 12, padding: 14, marginVertical: 8 },
  modalBtn: { flex: 1, paddingVertical: 12, marginHorizontal: 4, borderRadius: 12, alignItems: "center" },
});
