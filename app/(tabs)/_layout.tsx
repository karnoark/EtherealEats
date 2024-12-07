import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { COLORS } from '@/constants/theme';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: COLORS.green,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              name={focused ? 'grid' : 'grid-outline'}
              color={focused ? COLORS.secondary : COLORS.secondary1}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: 'Search',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              name={focused ? 'search' : 'search-outline'}
              color={focused ? COLORS.secondary : COLORS.secondary1}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: 'Cart',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              name={focused ? 'cart' : 'cart-outline'}
              color={focused ? COLORS.secondary : COLORS.secondary1}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              name={focused ? 'person' : 'person-outline'}
              color={focused ? COLORS.secondary : COLORS.secondary1}
            />
          ),
        }}
      />
    </Tabs>
  );
}
