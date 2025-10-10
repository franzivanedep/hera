import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9",
  },

  // ===== HEADER =====
  headerContainer: {
    width: "100%",
    height: 160,
    borderBottomWidth: 1,
    borderBottomColor: "#EDEDED",
    position: "relative",
  },
  headerImage: {
    width: "100%",
    height: "100%",
  },
  headerTitle: {
    position: "absolute",
    bottom: 10,
    left: 16,
    fontSize: 24,
    fontWeight: "700",
    color: "#fff",
    textShadowColor: "rgba(0,0,0,0.2)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },

  // ===== REWARD CARD =====
  card: {
    backgroundColor: "#fff",
    borderRadius: 14,
    marginHorizontal: 16,
    marginTop: 16,
    overflow: "hidden",
    elevation: 2,
  },
  cardImage: {
    width: "100%",
    height: 130,
  },
  cardContent: {
    padding: 14,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#3C2E23",
  },
  pointsRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
  },
  pointsText: {
    fontSize: 13,
    marginLeft: 4,
    color: "#5A4634",
  },
  footerSpace: {
    height: 40,
  },
});
