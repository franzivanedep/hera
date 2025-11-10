import React from "react";
// ✅ Import the default export without curly braces
import useVoucherLogic from "../components/logics/useVoucherLogic";
import VoucherView from "../components/VoucherView";

export default function VoucherScreen() {
  const logic = useVoucherLogic();
  return <VoucherView {...logic} />;
}
