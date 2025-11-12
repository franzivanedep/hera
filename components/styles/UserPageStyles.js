import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F4EF",
  },

  avatarCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: "#E8DCC3",
    alignItems: "center",
    justifyContent: "center",
  },

  userName: {
    fontSize: 22,
    fontWeight: "700",
    color: "#3A2E23",
  },

  subText: {
    color: "#6E6258",
    fontSize: 14,
    marginTop: 4,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#3A2E23",
    marginBottom: 12,
    marginLeft: 5,
  },

  iconGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  iconItem: {
    width: "22%",
    alignItems: "center",
    marginVertical: 10,
  },

  iconLabel: {
    fontSize: 12,
    textAlign: "center",
    color: "#3A2E23",
    marginTop: 6,
  },

  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E8DCC3",
    borderRadius: 14,
    paddingVertical: 16,
    marginHorizontal: 20,
    marginTop: 20,
  },

  logoutText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#A64B2A",
    marginLeft: 8,
  },

  footer: {
    alignItems: "center",
    marginVertical: 25,
  },

  footerText: {
    fontSize: 12,
    color: "#B3A497",
  },
});
