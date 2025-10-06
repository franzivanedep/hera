import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF8F2",
    paddingHorizontal: 18,
    paddingTop: 30,
  },

  headerTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#4A2E14",
    marginBottom: 20,
    letterSpacing: 0.4,
  },

  // ---- CARD ----
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    marginBottom: 18,
    overflow: "hidden",
    shadowColor: "#9B6B43",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 5,
  },

  cardImage: {
    width: "100%",
    height: 180,
  },

  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 18,
    backgroundColor: "#FFF8F2",
    borderTopWidth: 1,
    borderTopColor: "#EFE2D2",
  },

  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#4A2E14",
    letterSpacing: 0.3,
  },

  pointsTag: {
    backgroundColor: "#9B6B43",
    borderRadius: 14,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 5,
    paddingHorizontal: 12,
  },
  pointsText: {
    color: "#FFF",
    fontWeight: "600",
    fontSize: 13,
    letterSpacing: 0.5,
  },

  footerSpace: {
    height: 40,
  },
});

export default styles;
