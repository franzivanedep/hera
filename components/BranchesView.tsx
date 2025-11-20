import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ImageBackground,
  Modal,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Branch } from "../components/logics/branchesLogic";

interface Props {
  branches: Branch[];
  selectedBranch: Branch | null;
  openBranchModal: (branch: Branch) => void;
  closeBranchModal: () => void;
  openMap: (address: string) => void;
}

const BranchesView: React.FC<Props> = ({
  branches,
  selectedBranch,
  openBranchModal,
  closeBranchModal,
  openMap,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Our Branches</Text>

      <FlatList
        data={branches}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} activeOpacity={0.9}>
            <ImageBackground source={item.image} style={styles.image} imageStyle={{ borderRadius: 20 }}>
              <View style={styles.overlay} />
              <View style={styles.cardContent}>
                <Text style={styles.branchName}>{item.name}</Text>
                <View style={styles.locationRow}>
                  <Ionicons name="location-outline" size={18} color="#fff" />
                  <Text style={styles.address}>{item.address}</Text>
                </View>
                <TouchableOpacity style={styles.button} onPress={() => openBranchModal(item)}>
                  <Text style={styles.buttonText}>View Details</Text>
                </TouchableOpacity>
              </View>
            </ImageBackground>
          </TouchableOpacity>
        )}
      />

      <Modal visible={!!selectedBranch} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <ScrollView>
              <Text style={styles.modalTitle}>{selectedBranch?.name}</Text>
              <Text style={styles.modalAddress}>{selectedBranch?.address}</Text>

              <Text style={styles.sectionTitle}>Services</Text>
              {selectedBranch?.services?.map((s, i) => (
                <Text key={i} style={styles.modalText}>- {s}</Text>
              ))}

              <Text style={styles.sectionTitle}>Opening Hours</Text>
              {selectedBranch?.openingHours?.map((h, i) => (
                <Text key={i} style={styles.modalText}>{h}</Text>
              ))}

              <Text style={styles.sectionTitle}>Contact</Text>
              <Text style={styles.modalText}>Phone: {selectedBranch?.contact?.phone}</Text>
              <Text style={styles.modalText}>Email: {selectedBranch?.contact?.email}</Text>

              <TouchableOpacity style={styles.mapButton} onPress={() => selectedBranch && openMap(selectedBranch.address)}>
                <Text style={styles.mapButtonText}>Open in Maps</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.closeButton} onPress={closeBranchModal}>
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default BranchesView;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8F1E4", paddingTop: 60, paddingHorizontal: 20 },
  header: { fontSize: 26, fontWeight: "700", color: "#5A4634", marginBottom: 25 },
  card: { borderRadius: 20, overflow: "hidden", marginBottom: 25, shadowColor: "#000", shadowOpacity: 0.15, shadowRadius: 8, elevation: 5 },
  image: { width: "100%", height: 220, justifyContent: "flex-end" },
  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: "rgba(0,0,0,0.3)", borderRadius: 20 },
  cardContent: { padding: 20 },
  branchName: { fontSize: 20, fontWeight: "700", color: "#fff", marginBottom: 6 },
  locationRow: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
  address: { color: "#fff", fontSize: 14, marginLeft: 5 },
  button: { alignSelf: "flex-start", backgroundColor: "#E8D8C3", paddingHorizontal: 14, paddingVertical: 8, borderRadius: 10 },
  buttonText: { color: "#5A4634", fontWeight: "600", fontSize: 14 },
  modalContainer: { flex: 1, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "center", paddingHorizontal: 20 },
  modalContent: { backgroundColor: "#fff", borderRadius: 20, padding: 20, maxHeight: "80%" },
  modalTitle: { fontSize: 22, fontWeight: "700", marginBottom: 8 },
  modalAddress: { fontSize: 14, color: "#555", marginBottom: 15 },
  sectionTitle: { fontSize: 18, fontWeight: "600", marginTop: 10, marginBottom: 5 },
  modalText: { fontSize: 14, marginBottom: 3 },
  mapButton: { backgroundColor: "#5A4634", padding: 12, borderRadius: 10, marginTop: 15, alignItems: "center" },
  mapButtonText: { color: "#fff", fontWeight: "600" },
  closeButton: { marginTop: 10, padding: 12, borderRadius: 10, borderWidth: 1, borderColor: "#5A4634", alignItems: "center" },
  closeButtonText: { color: "#5A4634", fontWeight: "600" },
});
