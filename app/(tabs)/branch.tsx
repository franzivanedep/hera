import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ImageBackground } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface Branch {
  id: string;
  name: string;
  address: string;
  image: any;
}

const branches: Branch[] = [
  {
    id: "1",
    name: "HERA Nail Lounge - Makati",
    address: "123 Ayala Ave, Makati City",
    image: require("../../assets/images/nail1.jpeg"),
  },
  {
    id: "2",
    name: "HERA Nail Lounge - BGC",
    address: "5th Ave, Bonifacio Global City, Taguig",
    image: require("../../assets/images/nail1.jpeg"),
  },
  {
    id: "3",
    name: "HERA Nail Lounge - Quezon City",
    address: "SM North EDSA, Quezon City",
    image: require("../../assets/images/nail1.jpeg"),
  },
];

const BranchesScreen = () => {
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
                <TouchableOpacity style={styles.button}>
                  <Text style={styles.buttonText}>View Details</Text>
                </TouchableOpacity>
              </View>
            </ImageBackground>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default BranchesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F1E4", // soft beige
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 26,
    fontWeight: "700",
    color: "#5A4634",
    marginBottom: 25,
    textAlign: "left",
  },
  card: {
    borderRadius: 20,
    overflow: "hidden",
    marginBottom: 25,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  image: {
    width: "100%",
    height: 220,
    justifyContent: "flex-end",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.3)", // dark overlay for readability
    borderRadius: 20,
  },
  cardContent: {
    padding: 20,
  },
  branchName: {
    fontSize: 20,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 6,
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  address: {
    color: "#fff",
    fontSize: 14,
    marginLeft: 5,
  },
  button: {
    alignSelf: "flex-start",
    backgroundColor: "#E8D8C3",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 10,
  },
  buttonText: {
    color: "#5A4634",
    fontWeight: "600",
    fontSize: 14,
  },
});
