/* eslint-disable react/no-unstable-nested-components */
/*The warning exists to prevent a common anti-pattern where nested component definitions can cause unnecessary re-renders and state loss. However, in the case of tab bar icons, we have some mitigating factors:
  1.The icons are simple, stateless components
  2.The navigation system manages their lifecycle efficiently
  3.The re-renders are limited to tab switching, which is an infrequent user action 
  4.Performance impact is negligible in this context, so making it technically correct introduces complexity that doesn't provide enough real-world benefit to justify itself
*/
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
