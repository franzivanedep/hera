import React from 'react';
import { Tabs } from 'expo-router';
import { Platform, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: '#5a4634', // dark brown (active)
        tabBarInactiveTintColor: '#9e8a73', // muted beige
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
      {/* 🏠 Home */}
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? 'home' : 'home-outline'}
              size={24}
              color={color}
            />
          ),
        }}
      />

      {/* 🏢 Branch */}
      <Tabs.Screen
        name="branch"
        options={{
          title: 'Branch',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? 'business' : 'business-outline'}
              size={24}
              color={color}
            />
          ),
        }}
      />

      {/* 🎁 Rewards */}
      <Tabs.Screen
        name="rewards"
        options={{
          title: 'Rewards',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? 'gift' : 'gift-outline'}
              size={24}
              color={color}
            />
          ),
        }}
      />

      {/* 👤 User */}
      <Tabs.Screen
        name="user"
        options={{
          title: 'User',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? 'person' : 'person-outline'}
              size={24}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: 'rgba(250, 245, 235, 0.95)', // soft translucent beige
    borderTopWidth: 0,
    height: 70,
    marginHorizontal: 20,
    marginBottom: 18,
    borderRadius: 20,
    position: 'absolute',
    left: 0,
    right: 0,
    alignSelf: 'center',
    paddingBottom: 8,
    paddingTop: 8,

    // 💫 Floating effect
    shadowColor: '#c8b79b',
    shadowOpacity: 0.25,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },

    // 🧊 iOS glass effect fallback (for supported devices)
    backdropFilter: 'blur(10px)',
    elevation: 10,
  },

  iosShadow: {
    shadowColor: '#b9a88a',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },

  androidShadow: {
    elevation: 8,
  },
});

