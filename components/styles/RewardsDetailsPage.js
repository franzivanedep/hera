import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAF9F7",
  },

  headerImage: {
    width: "100%",
    height: 260,
  },

  content: {
    padding: 20,
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#3C2E23",
  },

  points: {
    fontSize: 14,
    color: "#8C7A65",
    marginVertical: 6,
  },

  description: {
    fontSize: 15,
    lineHeight: 22,
    color: "#4A4A4A",
    marginTop: 10,
  },

  redeemButton: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: "#5A4634",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
  },

  redeemText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
  },

  // ===== MODAL =====
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },

  modalContent: {
    backgroundColor: "#F9F5EE",
    padding: 30,
    borderRadius: 20,
    alignItems: "center",
    width: "80%",
  },

  modalText: {
    marginTop: 12,
    color: "#5A4634",
    fontWeight: "500",
  },

  // ===== Voucher Modal =====
  voucherContent: {
    backgroundColor: "#F9F5EE",
    padding: 40,
    borderRadius: 25,
    alignItems: "center",
    width: "85%",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  iconContainer: {
    backgroundColor: "#CBBBA0",
    width: 90,
    height: 90,
    borderRadius: 45,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  voucherTitle: {
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
    color: "#3C2E23",
    marginBottom: 10,
  },
  voucherSubtitle: {
    fontSize: 15,
    textAlign: "center",
    color: "#5A4634",
    marginBottom: 30,
    lineHeight: 22,
    opacity: 0.8,
  },
  voucherButton: {
    backgroundColor: "#CBBBA0",
    borderRadius: 30,
    paddingVertical: 12,
    paddingHorizontal: 30,
    width: "85%",
    alignItems: "center",
  },
  voucherButtonText: {
    color: "#3C2E23",
    fontWeight: "700",
    fontSize: 15,
    letterSpacing: 0.5,
  },
  header: {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  backgroundColor: "#F8F1E4",
  paddingTop: 45,
  paddingBottom: 12,
  paddingHorizontal: 20,
  borderBottomWidth: 1,
  borderColor: "#E8DCC5",
  elevation: 2,
},
backButton: {
  padding: 6,
  borderRadius: 10,
  backgroundColor: "#F3EAD9",
},
headerTitle: {
  fontSize: 16,
  fontWeight: "700",
  color: "#3C2E23",
},
userPoints: {
  fontSize: 16,
  fontWeight: "600",
  color: "#8C7A65",
  marginTop: 6,
},
});
