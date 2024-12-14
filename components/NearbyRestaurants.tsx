import { router } from 'expo-router';
import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

import StoreComponent from '@/components/StoreComponent';
import uidata from '@/constants/uidata';
import { useRestaurantContext } from '@/context/RestaurantContext';

const NearbyRestaurants = () => {
  const { restaurantObj, setRestaurantObj } = useRestaurantContext();
  return (
    <View style={{ marginLeft: 12 }}>
      <FlatList
        horizontal
        data={uidata.restaurants}
        showsHorizontalScrollIndicator={false}
        style={{ marginTop: 5, rowGap: 10 }}
        scrollEnabled
        renderItem={({ item }) => (
          <StoreComponent
            item={item}
            onPress={() => {
              setRestaurantObj(item);
              router.push({
                pathname: '/restaurant',
                params: { item: JSON.stringify(item) },
              });
            }}
          />
        )}
      />
    </View>
  );
};

export default NearbyRestaurants;

const styles = StyleSheet.create({});
