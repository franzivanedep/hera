import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F4EF",
  },

  profileCard: {
    backgroundColor: "#fff",
    marginVertical: 10,
    marginHorizontal: 15,
    borderRadius: 16,
    padding: 18,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },

  avatarContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  avatarCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#EFE6DA",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 15,
  },

  profileText: {
    flexDirection: "column",
  },

  userName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#3A2E23",
  },

  subText: {
    color: "#A18B77",
    fontSize: 13,
    marginTop: 4,
  },

  sectionCard: {
    backgroundColor: "#fff",
    borderRadius: 14,
    marginHorizontal: 15,
    marginTop: 10,
    padding: 15,
    shadowColor: "#000",
    shadowOpacity: 0.03,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    elevation: 1,
  },

  sectionTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#3A2E23",
    marginBottom: 12,
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
    backgroundColor: "#fff",
    marginTop: 20,
    marginHorizontal: 15,
    borderRadius: 14,
    paddingVertical: 14,
    gap: 6,
  },

  logoutText: {
    fontSize: 15,
    fontWeight: "500",
    color: "#A64B2A",
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
