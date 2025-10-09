import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from "react-native";

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
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card}>
            <Image source={item.image} style={styles.image} />
            <View style={styles.cardContent}>
              <Text style={styles.branchName}>{item.name}</Text>
              <Text style={styles.address}>{item.address}</Text>
            </View>
          </TouchableOpacity>
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default BranchesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "700",
    color: "#5a4634",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#f9f9f9",
    borderRadius: 20,
    marginBottom: 20,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },
  image: {
    width: "100%",
    height: 160,
  },
  cardContent: {
    padding: 15,
  },
  branchName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#5a4634",
  },
  address: {
    fontSize: 14,
    color: "#7b7b7b",
    marginTop: 4,
  },
});
