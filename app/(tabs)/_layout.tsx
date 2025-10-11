// TabLayout.tsx
import React from 'react';
import TabLayoutView from '../../components/TabView';
import { useTabLayoutLogic } from '../../components/logics/TabLogic';

export default function TabLayout() {
  const { tabsConfig } = useTabLayoutLogic();
  return <TabLayoutView tabsConfig={tabsConfig} />;
}
