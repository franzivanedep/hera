import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F1E4", // beige
  },

  scrollContent: {
    paddingBottom: 60, // ✅ ensures last card is scrollable fully
  },

  // ===== HEADER =====
  headerCard: {
    backgroundColor: "#FFF9F2",
    borderRadius: 16,
    marginHorizontal: 18,
    marginTop: 50, // lowered
    overflow: "hidden",
  },
  headerImage: {
    width: "100%",
    height: 160,
    borderRadius: 16,
  },

  // ===== PAGE TITLE =====
  pageTitle: {
    fontSize: 26,
    fontWeight: "700",
    color: "#5A4634",
    marginTop: 18,
    marginLeft: 22,
    marginBottom: 8,
  },

  // ===== REWARD CARD =====
  card: {
    backgroundColor: "#FFF9F2",
    borderRadius: 16,
    marginHorizontal: 18,
    marginTop: 16,
    overflow: "hidden",
  },
  cardImage: {
    width: "100%",
    height: 130,
  },
  cardContent: {
    padding: 16,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: "600",
    color: "#3C2E23",
  },
  pointsRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  pointsText: {
    fontSize: 14,
    marginLeft: 6,
    color: "#8B6F47",
  },
  footerSpace: {
    height: 100, // ✅ ensures safe scroll end spacing
  },
});
