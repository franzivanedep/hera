// TabLayout.tsx
import React from "react";
import TabLayoutView from "../../components/TabView";
import { useTabLayoutLogic } from "../../components/logics/TabLogic";
import ProtectedRoute from "../../components/ProtectedRoute"; // adjust path

export default function TabLayout() {
  const { tabsConfig } = useTabLayoutLogic();

  return (
    <ProtectedRoute>
      <TabLayoutView tabsConfig={tabsConfig} />
    </ProtectedRoute>
  );
}
