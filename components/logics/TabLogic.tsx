// useTabLayoutLogic.ts
import { Ionicons } from '@expo/vector-icons';
import { View } from 'react-native';
import React from 'react';
import styles from '../styles/TabStyles';  

export const useTabLayoutLogic = () => {
  return {
    tabsConfig: [
      {
        name: 'index',
        title: 'Home',
        icon: (color: string, focused: boolean) => (
          <Ionicons name={focused ? 'home' : 'home-outline'} size={24} color={color} />
        ),
      },
      {
        name: 'branch',
        title: 'Branch',
        icon: (color: string, focused: boolean) => (
 <Ionicons
      name={focused ? 'storefront' : 'storefront-outline'}
      size={24}
      color={color}
    />        ),
      },
      {
        name: 'qr',
        title: 'Qr',
        icon: () => (
          <View style={styles.qrButton}>
            <Ionicons name="qr-code-outline" size={30} color="#fff" />
          </View>
        ),
      },
      {
        name: 'rewards',
        title: 'Rewards',
        icon: (color: string, focused: boolean) => (
          <Ionicons name={focused ? 'gift' : 'gift-outline'} size={24} color={color} />
        ),
      },
      {
        name: 'user',
        title: 'User',
        icon: (color: string, focused: boolean) => (
          <Ionicons name={focused ? 'person' : 'person-outline'} size={24} color={color} />
        ),
      },
    ],
  };
};
