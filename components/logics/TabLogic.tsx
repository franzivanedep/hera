// useTabLayoutLogic.ts
import { Ionicons } from '@expo/vector-icons';
import React from 'react';

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
          />
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
