// TabLayoutView.tsx
import React from 'react';
import { Tabs } from 'expo-router';
import { Platform } from 'react-native';
import styles from './styles/TabStyles';

export default function TabLayoutView({ tabsConfig }: any) {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: '#5a4634',
        tabBarInactiveTintColor: '#9e8a73',
        tabBarStyle: [
          styles.tabBar,
          Platform.OS === 'ios' ? styles.iosShadow : styles.androidShadow,
        ],
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
          marginBottom: 3,
        },
      }}
    >
      {tabsConfig.map((tab: any) => (
        <Tabs.Screen
          key={tab.name}
          name={tab.name}
          options={{
            title: tab.title,
            tabBarIcon: ({ color, focused }) => tab.icon(color, focused),
          }}
        />
      ))}
    </Tabs>
  );
}
