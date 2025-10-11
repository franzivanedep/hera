import { StyleSheet, Platform } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F1E4",
    paddingTop: Platform.OS === "ios" ? 60 : 40,
    alignItems: "center",
  },
  header: {
    width: "92%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  iconBtn: {
    padding: 8,
    borderRadius: 8,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#3C2E23",
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
  },

  receipt: {
    width: "92%",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 18,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  merchantRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 10,
  },
  merchantName: {
    fontSize: 16,
    fontWeight: "800",
    color: "#3C2E23",
  },
  smallMuted: {
    color: "#7B6A55",
    fontSize: 12,
    marginTop: 4,
  },
  meta: {
    alignItems: "flex-end",
  },
  dashedDivider: {
    borderTopWidth: 1,
    borderColor: "#E8DCC5",
    borderStyle: "dashed",
    marginVertical: 12,
  },
  qrBlock: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  qrWrap: {
    flex: 0.45,
    alignItems: "center",
    justifyContent: "center",
  },
  codeBlock: {
    flex: 0.52,
    alignItems: "flex-end",
  },
  codeLabel: {
    fontSize: 10,
    color: "#7B6A55",
    letterSpacing: 1,
  },
  voucherCode: {
    fontSize: 16,
    fontWeight: "700",
    color: "#3C2E23",
    marginTop: 6,
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
  },
  codeActions: {
    flexDirection: "row",
    marginTop: 12,
    alignItems: "center",
  },
  actionBtn: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: "#F3EAD9",
    marginLeft: 6,
  },
  actionSecondary: {
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#E8DCC5",
  },
  actionText: {
    marginLeft: 6,
    color: "#5A4634",
    fontWeight: "600",
    fontSize: 13,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 6,
  },
  label: {
    color: "#7B6A55",
    fontSize: 13,
  },
  value: {
    color: "#3C2E23",
    fontWeight: "700",
    fontSize: 13,
  },
  message: {
    color: "#5A4634",
    fontSize: 13,
    marginTop: 10,
    lineHeight: 18,
    textAlign: "center",
  },
  tearLineWrap: {
    marginTop: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  tearLeft: {
    width: "92%",
    borderTopWidth: 1,
    borderColor: "#E8DCC5",
    borderStyle: "dashed",
  },
  tearRight: {
    height: 0,
  },
  footer: {
    marginTop: 12,
    alignItems: "center",
  },
  footerMuted: {
    color: "#A89174",
    fontSize: 11,
    textAlign: "center",
  },
  website: {
    marginTop: 6,
    color: "#A89174",
    fontWeight: "700",
    fontSize: 12,
  },
  bottomBar: {
    width: "100%",
    padding: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
    position: "absolute",
    bottom: 18,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
  },
  bottomBtn: {
    backgroundColor: "#5A4634",
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  bottomBtnText: {
    color: "#FFF",
    fontWeight: "700",
  },
  bottomBtnAlt: {
    backgroundColor: "#FFF",
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#E8DCC5",
  },
  bottomBtnAltText: {
    color: "#5A4634",
    fontWeight: "700",
  },
});
